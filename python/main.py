from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from langchain_groq import ChatGroq
import uvicorn
from langchain.memory import ConversationBufferMemory
api_key="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"
mainllm = ChatGroq(
    api_key=api_key,
    model="gemma2-9b-it",
)
memmory=ConversationBufferMemory(memory_key="history")
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
def SampleFun():
    res=mainllm.invoke("hi").content
    return {"result":res}







if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
