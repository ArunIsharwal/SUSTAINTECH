
import os
import json
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv


load_dotenv()


GEMINI_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_KEY:
    print("CRITICAL ERROR: GEMINI_API_KEY not found in .env file.")
else:
    genai.configure(api_key=GEMINI_KEY)


model = genai.GenerativeModel('gemini-2.5-flash')

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SYSTEM_PROMPT = (
    "You are a sustainability AI assistant for smart campuses. "
    "Provide eco-friendly suggestions and resource optimization ideas. "
    "IMPORTANT: Your response must be a strictly valid JSON object. "
    "Format: {\"summary\": [\"point 1\", \"point 2\", \"point 3\"], \"elaboration\": \"detailed text\"}. "
    "Do not include any text outside of the JSON brackets."
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        if not GEMINI_KEY:
            return {"summary": ["Error"], "elaboration": "API Key missing in server configuration."}

        
        full_prompt = f"{SYSTEM_PROMPT}\n\nUser Question: {req.message}"
        response = model.generate_content(full_prompt)
        text_response = response.text

       
        try:
            
            clean_text = text_response.replace("```json", "").replace("```", "").strip()
            data = json.loads(clean_text)
            
            summary = data.get("summary", ["Tip available"])
            elaboration = data.get("elaboration", text_response)
            
            if not isinstance(summary, list):
                summary = [str(summary)]

        except json.JSONDecodeError:
            
            summary = ["Sustainability insight generated"]
            elaboration = text_response

        return {
            "summary": summary,
            "elaboration": elaboration
        }

    except Exception as e:
        print(f"Server Exception: {e}")
        return {
            "summary": ["Connection Issues"],
            "elaboration": "The AI service is currently busy or unavailable. Please try again in a moment."
        }

@app.get("/")
def health():
    return {"status": "OptiCampus AI (Gemini) Running"}