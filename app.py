# app.py
import os
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from fireworks.client import Fireworks
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app) # This allows your React app to make requests to this server

# Initialize Fireworks client
# It will automatically look for the FIREWORKS_API_KEY in your environment
try:
    fireworks = Fireworks(api_key=os.getenv("FIREWORKS_API_KEY"))
except Exception as e:
    print(f"Error initializing Fireworks client: {e}")
    fireworks = None

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handles the chat request from the frontend, streams response from Fireworks AI.
    """
    if not fireworks:
        return jsonify({"error": "Fireworks client not initialized. Check API key."}), 500

    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "Message content is missing"}), 400

    def generate_stream():
        """Generator function to stream the API response."""
        try:
            # FIX: Changed create_stream() to create(stream=True)
            stream = fireworks.chat.completions.create(
                model="accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_message},
                ],
                max_tokens=300,
                temperature=0.7,
                stream=True
            )

            for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    yield delta
        except Exception as e:
            # In a production app, you'd log this error
            print(f"An error occurred during streaming: {e}")
            yield "⚠️ Error: Could not connect to the AI service."

    # Return a streaming response
    return Response(generate_stream(), mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True, port=5000)