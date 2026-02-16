
import os
import json
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Config
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    prompt = (
        "You are a sustainability assistant. "
        "Reply with valid JSON only: {\"summary\": [], \"elaboration\": \"\"}. "
        f"User: {req.message}"
    )
    
    try:
        response = model.generate_content(prompt)
        text = response.text.replace("```json", "").replace("```", "").strip()
        
        try:
            data = json.loads(text)
            return data
        except:
            return {
                "summary": ["Response"],
                "elaboration": text
            }
            
    except Exception as e:
        return {
            "summary": ["Error"],
            "elaboration": str(e)
        }