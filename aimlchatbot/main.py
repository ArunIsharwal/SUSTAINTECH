
import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from typing import List, Optional

load_dotenv()

HF_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")
if not HF_TOKEN:
    raise RuntimeError("HUGGINGFACEHUB_API_TOKEN not found")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = InferenceClient(api_key=HF_TOKEN)

# Schema for the response expected by the frontend
SYSTEM_MESSAGE = {
    "role": "system",
    "content": (
        "You are a helpful AI assistant focused on building scalable systems and sustainability. "
        "Provide clear, concise answers using bullet points where appropriate. "
        "Do NOT strictly cite WHO or CDC or other specific guidelines unless relevant, but prioritize general best practices. "
        "You MUST respond with valid JSON ONLY, strictly following this schema: "
        "{"
        "  'summary': ['point 1', 'point 2'], "
        "  'elaboration': 'Detailed explanation string', "
        "  'sustainability': {"
        "    'longTermImpact': 'Impact description', "
        "    'bestPractices': ['practice 1', 'practice 2'], "
        "    'scalability': 'Scalability description', "
        "    'maintenance': 'Maintenance description'"
        "  }, "
        "  'implementation': {"
        "    'steps': ['step 1', 'step 2'], "
        "    'tools': ['tool 1', 'tool 2']"
        "  }, "
        "  'examples': ['example 1', 'example 2'], "
        "  'limitations': ['limitation 1'], "
        "  'confidenceScore': 0.95, "
        "  'followUpQuestions': ['question 1', 'question 2']"
        "}"
        "Ensure the JSON is valid and parseable."
    ),
}

class ChatRequest(BaseModel):
    message: str

class Sustainability(BaseModel):
    longTermImpact: str
    bestPractices: List[str]
    scalability: str
    maintenance: str

class Implementation(BaseModel):
    steps: List[str]
    tools: List[str]

class ChatResponse(BaseModel):
    summary: List[str]
    elaboration: str
    sustainability: Sustainability
    implementation: Implementation
    examples: List[str]
    limitations: List[str]
    confidenceScore: float
    followUpQuestions: List[str]

@app.post("/api/chat", response_model=ChatResponse)
async def chat_api(req: ChatRequest):
    try:
        response = client.chat_completion(
            model="meta-llama/Meta-Llama-3-8B-Instruct",
            messages=[
                SYSTEM_MESSAGE,
                {"role": "user", "content": req.message},
            ],
            max_tokens=1000,
            temperature=0.7,
            stream=False, # We need the full response to parse JSON
        )
        
        content = response.choices[0].message.content
        
        # Attempt to parse JSON from the response
        try:
            # Find the first '{' and last '}' to extract JSON in case of extra text
            start = content.find('{')
            end = content.rfind('}') + 1
            if start != -1 and end != -1:
                json_str = content[start:end]
                data = json.loads(json_str)
                return data
            else:
                 raise ValueError("No JSON found in response")
        except json.JSONDecodeError:
             # Fallback if valid JSON isn't returned, though we instructed it to.
             # Construct a fallback response
             return {
                "summary": ["Response parsed incorrectly.", "Refer to elaboration."],
                "elaboration": content,
                "sustainability": {
                    "longTermImpact": "N/A",
                    "bestPractices": [],
                    "scalability": "N/A",
                    "maintenance": "N/A"
                },
                "implementation": {
                    "steps": [],
                    "tools": []
                },
                "examples": [],
                "limitations": ["Could not parse structured response"],
                "confidenceScore": 0.0,
                "followUpQuestions": ["Can you rephrase that?"]
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health():
    return {"status": "DxAssist Chatbot Backend Running"}
