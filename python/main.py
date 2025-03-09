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

#--------------------------------------------Agent----------------------------------------------------------



from langchain.agents import initialize_agent, AgentType
from langchain.agents import Tool
from langchain.tools import tool
import yfinance as yf
import requests

@tool
def get_stock_price(symbol: str):
    """Fetch the current stock price of a given symbol."""
    stock = yf.Ticker(symbol)
    price = stock.history(period="1d")["Close"].iloc[-1]
    return f"The current price of {symbol} is ${price:.2f}"

@tool
def analyze_stock_sentiment(symbol: str):
    """Analyze recent financial news sentiment for a given stock."""
    url = f"https://newsapi.org/v2/everything?q={symbol}&apiKey=e8cbffe58ad24c70bfbf4c80de4da0aa"
    response = requests.get(url).json()
    articles = response.get("articles", [])
    sentiments = [article["title"] for article in articles[:5]]
    return f"Latest headlines for {symbol}: {sentiments}"

# Technical indicator tool (example: simple moving average)
@tool
def get_technical_analysis(symbol: str):
    """Provides basic technical indicators like SMA and RSI."""
    stock = yf.Ticker(symbol)
    data = stock.history(period="1mo")["Close"]
    sma = data.rolling(window=10).mean().iloc[-1]
    return f"10-day SMA for {symbol} is ${sma:.2f}"

# Recommendation tool
@tool
def get_stock_recommendation(symbol: str):
    """Provides stock recommendation based on basic analysis."""
    price = float(get_stock_price(symbol).split("$")[-1])
    sma = float(get_technical_analysis(symbol).split("$")[-1])

    if price > sma:
        return f"{symbol} is currently above the 10-day SMA. Consider holding or buying."
    else:
        return f"{symbol} is below the 10-day SMA. It might be a sell signal."


tools = [
    Tool(
        name="StockPriceTool",
        func=get_stock_price,
        description="Fetch the current stock price of a given symbol."
    ),
    Tool(
        name="SentimentAnalysisTool",
        func=analyze_stock_sentiment,
        description="Analyze recent financial news sentiment for a given stock."
    ),
    Tool(
        name="TechnicalAnalysisTool",
        func=get_technical_analysis,
        description="Provides technical indicators such as moving averages."
    ),
    Tool(
        name="RecommendationTool",
        func=get_stock_recommendation,
        description="Provides stock buy/sell recommendations based on analysis."
    )
]

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    return_intermediate_steps=True
)

class Agent_Class(BaseModel):
    query:str

@app.post("/Agent")
def Call_Agent(query:Agent_Class):
    arr=[]
    response = agent.invoke(query)
    output=response['output']
    intermediate=response['intermediate_steps']
    for agents in intermediate:
        arr.append(agents[0].tool)
        arr.append(agents[0].tool_input)
        arr.append(agents[0].log)
        arr.append("-----------------------------------------------------")
    
    return {"output":output,"steps":arr}
    
    
    
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from pydantic import BaseModel, Field

# Define a credit score prediction function
def predict_credit_score(income: float, debt: float, loan_amount: float, credit_history: float) -> str:
    prompt = PromptTemplate.from_template(
        """
        You are an AI financial expert predicting credit scores based on user data.
        Consider the factors: 
        - Income: {income}
        - Debt: {debt}
        - Loan Amount: {loan_amount}
        - Credit History (years): {credit_history}
        
        Predict the credit score (between 300-850) and provide reasoning.
        """
    )
    
    formatted_prompt = prompt.format(
        income=income, 
        debt=debt, 
        loan_amount=loan_amount, 
        credit_history=credit_history
    )
    
    return llm.predict(formatted_prompt)


class Details(BaseModel):
    income:int
    debt:int
    loan_amount:int
    credit_history:int


@app.post("/credit-score")
def CreditScore(details:Details):
    # Example Test
    response = predict_credit_score(details.income,details.debt,details.loan_amount,details.credit_history)
    # Define the structured output model
    class CreditScore(BaseModel):
        score: str = Field(..., description="Predicted credit score.")
    # Use structured output
    structured_llm = llm.with_structured_output(CreditScore)

    prompt = f"Extract only the predicted credit score from this response: {response}"
    res = structured_llm.invoke(prompt)

    return {"result":res.score}

from pydantic import BaseModel
import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler

with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# Define request model
class LoanRequest(BaseModel):
    Gender: str
    Married: str
    Dependents: str
    Education: str
    Self_Employed: str
    ApplicantIncome: float
    LoanAmount: float
    Credit_History: int
    Property_Area: str

# Prediction function
def Loan_pred(data: LoanRequest):
    columns = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 
               'ApplicantIncome', 'LoanAmount', 'Credit_History', 'Property_Area']
    new_data = [data.Gender, data.Married, data.Dependents, data.Education, 
                data.Self_Employed, data.ApplicantIncome, data.LoanAmount, 
                data.Credit_History, data.Property_Area]
    
    new_df = pd.DataFrame([new_data], columns=columns)
    new_df['Gender'] = new_df['Gender'].apply(lambda x: 1 if x == 'Male' else 0)
    new_df['Married'] = new_df['Married'].apply(lambda x: 1 if x == 'Married' else 0)
    new_df['Education'] = new_df['Education'].apply(lambda x: 1 if x == 'Graduate' else 0)
    new_df['Self_Employed'] = new_df['Self_Employed'].apply(lambda x: 1 if x == 'Yes' else 0)
    new_df['Dependents'] = new_df['Dependents'].astype(int)
    new_df['Property_Area'] = new_df['Property_Area'].map({'Urban': 0, 'Rural': 1, 'Semiurban': 2})

    sc = StandardScaler()
    new_df = sc.fit_transform(new_df)

    prediction = model.predict(new_df)
    if int(prediction[0]) == 1:
        return {"prediction":"Loan Grand"}
    return {"prediction": "Loan Not Grand"}

# API endpoint
@app.post("/predict")
async def predict_loan(data: LoanRequest):
    try:
        result = Loan_pred(data)
        return result
    except Exception as e:
        return {"error": str(e)}


import numpy as np
class TransactionData(BaseModel):
    Amount: float
    Time: int
    Avg_Transactions_Per_Day: float
    Num_Failed_Transactions: int
    Is_Foreign_Transaction: int
    Is_High_Risk_Country: int

import joblib
@app.post("/fraud-detection")
async def predict(data: TransactionData):
    # Load the pre-trained model using joblib
    try:
        model = joblib.load("fraud_detection_model.pkl")
    except Exception as e:
        return {"error": f"Model loading failed: {str(e)}"}
    
    # Ensure the model has a 'predict' method
    if not hasattr(model, 'predict'):
        return {"error": "Loaded object is not a valid model with a 'predict' method."}
    
    # Prepare the input data
    input_data = np.array([[data.Amount, data.Time, data.Avg_Transactions_Per_Day, 
                            data.Num_Failed_Transactions, data.Is_Foreign_Transaction, 
                            data.Is_High_Risk_Country]])

    # Make the prediction
    prediction = model.predict(input_data)
    value = "Fraud Transaction" if prediction == 1 else "Not Fraud"
    print(value)

    # Return the prediction

    return {
        "prediction": value == "Not Fraud"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7000)
