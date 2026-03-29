import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv() #load environemnt variables 

try:
    api_key = os.environ["GEMINI_API_KEY"]
except KeyError:
    print("Error: GEMINI_API_KEY environment variable not set.")
    exit()

client = genai.Client(api_key=api_key)

# 2. Specify the model
model_name = "gemini-2.5-flash"
system_instruction = "You are a helpful assistant to a college student. Every response you provide must be 2 to 3 sentences long. Be concise."

#store history of the conversion
chat_history = []
print("Hello! I am Susan and I can help with budget questions. Ask me anything! When you are finished, type 'quit' to stop.")

while True:
    user_input = input("User: ")
    if user_input.lower() in ["quit", "exit"]:
        break

    # Add user message to history
    chat_history.append(types.Content(role="user", parts=[types.Part(text=user_input)]))
    
    # The model will apply the system instruction to each turn
    response = client.models.generate_content(
        model=model_name,
        contents=chat_history,
        config=types.GenerateContentConfig(system_instruction=system_instruction)
    )
    
    # Add assistant response to history
    chat_history.append(types.Content(role="model", parts=[types.Part(text=response.text)]))
    print(f"Susan: {response.text}")