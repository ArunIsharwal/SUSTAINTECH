import os
from dotenv import load_dotenv
load_dotenv()


api_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")

try:
    from huggingface_hub import InferenceClient
except Exception:
    InferenceClient = None


client = None
if InferenceClient is not None and api_token:
    try:
        print("Initializing HuggingFace Inference Client...")
        client = InferenceClient(api_key=api_token)
    except Exception as e:
        print(f"Failed to initialize InferenceClient: {e}")
        client = None
else:
    if not api_token:
        print("Error: HUGGINGFACEHUB_API_TOKEN not found in .env file.")
    if InferenceClient is None:
        print("Error: huggingface_hub not installed.")

print("System: Chatbot initialized. Type 'exit' to quit.")



system_message = {
    "role": "system",
    "content": """You are a helpful AI assistant. when answering questions:

1. BE CONCISE AND STRUCTURED:
   - Use bullet points for lists and steps.
   - Keep answers clear and easy to read.

2. PROVIDE PRACTICAL ADVICE:
   - Focus on actionable steps and best practices.
   - Explain 'how' and 'why' clearly.

3. TONE:
   - Professional, helpful, and encouraging.

Example format:
- Point 1
- Point 2
"""
}

chat_history = [system_message]

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    try:
        if client is not None:
           
            chat_history.append({"role": "user", "content": user_input})
            
           
            response = client.chat_completion(
                model="meta-llama/Meta-Llama-3-8B-Instruct",
                messages=chat_history,
                max_tokens=256,
                temperature=0.7,
            )
            
           
            bot_text = response.choices[0].message.content.strip()
            
           
            chat_history.append({"role": "assistant", "content": bot_text})
            
            print("Bot:", bot_text)
        else:
            print("Error: Client not available.")
            break

    except Exception as e:
        import traceback
        print("\nError invoking model:")
        traceback.print_exc()
        print("\nMake sure your HuggingFace token is valid and in the .env file.")
        break