# AthenaHacks
# AthenaHacks Chatbot Setup Guide

## Prerequisites

Make sure you have the following installed:
- Python 3.8+
- Node.js and npm
- Your GEMINI_API_KEY set as an environment variable

## Setup Instructions

### 1. Set Environment Variables

Create a `.env` file in the root directory (`c:\Users\leeja\AthenaHacks\`) with:
```
GEMINI_API_KEY=your_api_key_here
```

Or set it as a system environment variable.

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- google-genai
- python-dotenv
- google-generativeai
- flask
- flask-cors

### 3. Install Node Dependencies

```bash
cd chatbox
npm install
```

## Running the Application

You need to run **both** the backend server and the frontend development server.

### Terminal 1: Start the Backend Server

```bash
cd chatbot
python chatbot_backend.py
```

The backend will start on `http://localhost:5000`

You should see:
```
Starting Susan Chatbot Backend...
Server running on http://localhost:5000
```

### Terminal 2: Start the Frontend Development Server

```bash
cd chatbox
npm run dev
```

The frontend will typically start on `http://localhost:5173`

## Testing the Connection

1. Open your browser to the frontend URL
2. Click the chat icon in the bottom-right corner
3. Type a message and hit Send
4. The chatbot should respond using the Gemini API

## API Endpoints

The backend provides these endpoints:

- **POST /api/chat**: Send a message to the chatbot
  - Request: `{ "message": "user message", "session_id": "optional" }`
  - Response: `{ "response": "assistant response", "session_id": "session_id" }`

- **POST /api/clear**: Clear chat history
  - Request: `{ "session_id": "optional" }`
  - Response: `{ "message": "Chat history cleared", "session_id": "session_id" }`

- **GET /api/health**: Health check
  - Response: `{ "status": "ok" }`

## Troubleshooting

### "Backend not responding" error
- Make sure the Flask server is running on port 5000
- Check that your GEMINI_API_KEY is set correctly
- Check browser console for CORS errors

### Messages not sending
- Verify the backend server is running
- Check that both servers have no errors in their terminal output
- Make sure your API key is valid

### Port conflicts
- If port 5000 or 5173 is already in use, you can change them:
  - Backend: Edit `chatbot_backend.py` and change `port=5000`
  - Frontend: Edit `chatbox/vite.config.js` and configure the port
