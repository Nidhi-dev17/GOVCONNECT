from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message')
        if not user_input:
            return jsonify({'error': 'No message provided'}), 400

        prompt = f"Human: {user_input}\nAI:"
        response = model.generate_content(prompt)
        return jsonify({'response': response.text})
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An internal error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Ch
# Updated JavaScript for client-side
# const chatForm = document.getElementById('chat-form');
# const chatMessages = document.getElementById('chat-messages');

# chatForm.addEventListener('submit', async (e) => {
#     e.preventDefault();
#     const messageInput = document.getElementById('message-input');
#     const message = messageInput.value.trim();
    
#     if (message) {
#         // Display user message
#         appendMessage('You', message);
        
#         // Clear input
#         messageInput.value = '';
        
#         try {
#             // Send message to server
#             const response = await fetch('http://localhost:5000/chat', {
#                 method: 'POST',
#                 headers: {
#                     'Content-Type': 'application/json',
#                 },
#                 body: JSON.stringify({ message }),
#             });
            
#             const data = await response.json();
            
#             // Display AI response
#             appendMessage('AI', data.response);
#         } catch (error) {
#             console.error('Error:', error);
#             appendMessage('System', 'An error occurred. Please try again.');
#         }
#     }
# });

# function appendMessage(sender, message) {
#     const messageElement = document.createElement('div');
#     messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
#     chatMessages.appendChild(messageElement);
#     chatMessages.scrollTop = chatMessages.scrollHeight;
# }