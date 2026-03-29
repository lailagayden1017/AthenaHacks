import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from flask import Flask, request, jsonify
from flask_cors import CORS


load_dotenv()  # load environment variables

try:
    api_key = os.environ["GEMINI_API_KEY"]
except KeyError:
    print("Error: GEMINI_API_KEY environment variable not set.")
    exit()

client = genai.Client(api_key=api_key)

# Specify the model
model_name = "gemini-2.5-flash"
system_instruction = "You are a helpful finacial assistant to a college student. Every response you provide must be 2 to 3 sentences long. Be concise."

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store chat history per session
chat_sessions = {}

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Endpoint to handle chat messages.
    Expects JSON: {"message": "user message", "session_id": "optional_session_id"}
    Returns JSON: {"response": "assistant response", "session_id": "session_id"}
    """
    data = request.json
    user_message = data.get('message')
    session_id = data.get('session_id', 'default')
   
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
   
    # Initialize session if not exists
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []
   
    chat_history = chat_sessions[session_id]
   
    try:
        # Add user message to history
        chat_history.append(types.Content(role="user", parts=[types.Part(text=user_message)]))
       
        # Generate response from Gemini
        response = client.models.generate_content(
            model=model_name,
            contents=chat_history,
            config=types.GenerateContentConfig(system_instruction=system_instruction)
        )
       
        assistant_response = response.text
       
        # Add assistant response to history
        chat_history.append(types.Content(role="model", parts=[types.Part(text=assistant_response)]))
       
        return jsonify({
            'response': assistant_response,
            'session_id': session_id
        })
   
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/clear', methods=['POST'])
def clear_chat():
    """
    Endpoint to clear chat history for a session.
    Expects JSON: {"session_id": "optional_session_id"}
    """
    data = request.json
    session_id = data.get('session_id', 'default')
   
    if session_id in chat_sessions:
        chat_sessions[session_id] = []
   
    return jsonify({'message': 'Chat history cleared', 'session_id': session_id})


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    print("Starting Susan Chatbot Backend...")
    print("Server running on http://localhost:5001")
    app.run(debug=True, port=5001)

