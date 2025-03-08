from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile
from starlette.responses import HTMLResponse
from PIL import Image
import uvicorn
import io
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify specific origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods like POST, GET, etc.
    allow_headers=["*"],  # Allows all headers
)

#rag---------------------------------------------------------------------------------------------------
from fastapi import FastAPI, Depends,Body
from pydantic import BaseModel
from langchain.agents import AgentType
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain_experimental.tools.python.tool import PythonREPLTool
from langchain.agents import initialize_agent, Tool,AgentType
from llama_index.llms.openrouter import OpenRouter
from llama_index.agent.openai import OpenAIAgent
from llama_index.core.llms import ChatMessage
from llama_index.experimental.query_engine import PandasQueryEngine
from langchain_groq import ChatGroq
import json
import requests
from bs4 import BeautifulSoup
import ast
import pandas as pd
from yt_dlp import YoutubeDL
from langchain_community.document_loaders import YoutubeLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.retrievers import EnsembleRetriever, BM25Retriever
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import DocumentCompressorPipeline, LLMChainFilter
from langchain_community.document_transformers import EmbeddingsRedundantFilter
from langchain.retrievers.document_compressors import FlashrankRerank
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import re

from typing import Optional
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from datetime import datetime
from langchain.document_loaders import TextLoader
from langchain_cohere import CohereRerank

llm = ChatGroq(
    api_key="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",
    model_name="gemma2-9b-it",
    temperature=0,
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def load_and_process_data():
    try:
        #texts=text
        loader = TextLoader("./data.txt")
        texts=loader.load()
        chunking = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=30)
        chunks = chunking.split_documents(texts)
        db = FAISS.from_documents(chunks, GoogleGenerativeAIEmbeddings(google_api_key="AIzaSyCYft-LY8iU8aLtqvfYyOn4YRmsoa4Hl48", model="models/embedding-001"))
        return db, chunks
    except UnicodeDecodeError as e:
        print(f"Error decoding file nothing: {e}")
        raise
    except Exception as e:
        print(f"Error loading data: {e}")
        raise
def Rag_Calling(final_retriver):
    _redudentfilter = EmbeddingsRedundantFilter(embeddings=GoogleGenerativeAIEmbeddings(google_api_key="AIzaSyCYft-LY8iU8aLtqvfYyOn4YRmsoa4Hl48", model="models/embedding-001"))
    rerank = CohereRerank(cohere_api_key="EA5kdJri7hsSOW2i801sXGQSZgW1iP5GwPsB3MF1",model="rerank-english-v3.0")
    pipeline = DocumentCompressorPipeline(transformers=[_redudentfilter, rerank])
    final_chain = ContextualCompressionRetriever(base_compressor=pipeline, base_retriever=final_retriver)
    return final_chain
class Bank_History(BaseModel):
    query:str
@app.post("/rag_finance")
def Bank_history(query:Bank_History): 
    print(query.query)
    db,chunks=load_and_process_data()
    retriver1 = db.as_retriever(search_kwargs={"k": 4})
    retriver2 = BM25Retriever.from_documents(chunks, k=4)
    final_retriver = EnsembleRetriever(retrievers=[retriver1, retriver2], weights=[0.5, 0.5])
    template = "You should answer the question based on the context. Context: {context} and Question: {question}"
    prompt = PromptTemplate.from_template(template)
    retriver = Rag_Calling(final_retriver)
    chain = (
            {
                "context": retriver,
                "question": RunnablePassthrough()
            }
            | prompt
            | llm
            | StrOutputParser()
        )
        
    final_chain=chain
    result=final_chain.invoke(query.query)
    return {"result": result}

@app.post("/normalass")
def Ass(query:Bank_History):
    prompt="You are a financial assistent  Answer the user question based on the financal advisor"
    res=llm.invoke(prompt+query.query)
    return {"result":res.content}


#simple query transactions
def fetch_google_finance_news():
    url = "https://news.google.com/rss/search?q=stock+market+finance"
    feed = feedparser.parse(url)
    return [{"title": entry.title, "link": entry.link} for entry in feed.entries]
import feedparser
from langchain.tools import Tool
@app.get("/finance")
def Financal():
    finance_news_tool = Tool(
        name="GoogleFinanceNewsFetcher",
        func=lambda _: fetch_google_finance_news(),
        description="Fetches live stock market news from Google Finance."
    )

    news = finance_news_tool.run("")
    datas=""
    for article in news[:20]:
        datas+=article['title']
        datas+=","
    prompt=f"You should Summurize and  the all news  News:{datas}"
    result=llm.invoke(prompt)
    return {"result":result.content}



from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.tools import Tool
from langchain.agents import AgentType, initialize_agent
from langchain.memory import ConversationBufferMemory
import yfinance as yf
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()


# Function to get stock information
def get_stock_info(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        return f"Company: {info['longName']}\nCurrent Price: ${info['currentPrice']:.2f}\nMarket Cap: ${info['marketCap']:,}"
    except Exception as e:
        return f"Unable to fetch information for {symbol}. Error: {str(e)}"

# Function to calculate potential profit/loss
def calculate_profit_loss(buy_price: float, current_price: float, shares: int):
    pl = (current_price - buy_price) * shares
    return f"Potential {'Profit' if pl >= 0 else 'Loss'}: ${abs(pl):.2f}"

# Define Tools
stock_info_tool = Tool(
    name="Stock Information Tool",
    func=get_stock_info,
    description="Fetch stock information given a stock symbol.",
    return_direct=True
)

calculation_tool = Tool(
    name="Stock Calculation Tool",
    func=calculate_profit_loss,
    description="Calculate profit or loss given buy price, current price, and number of shares.",
    return_direct=True
)

# Define Agents
memory = ConversationBufferMemory(memory_key="chat_history")

agent = initialize_agent(
    tools=[stock_info_tool, calculation_tool],
    llm=llm,  # Fixed: Use the correct LLM
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,  # Fixed: Better agent type for Gemini
    verbose=True,
    memory=memory,
)

# Run the assistant
def run_stock_assistant(data):
    print("Welcome to the Multi-Agent Stock Market Assistant!")
    response = agent.run(data)
    print("Assistant:", response)
    return response

class Agent_FaQ(BaseModel):
    query:str

@app.post("/Agent")
def AgentCall(query:Agent_FaQ):
    result = run_stock_assistant(query.query)
    return {"result":result}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
