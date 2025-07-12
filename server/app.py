import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import jwt
import datetime
from functools import wraps
from flask_mail import Mail, Message

load_dotenv()

app = Flask(__name__)
CORS(app)

# Flask-Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'true').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', app.config['MAIL_USERNAME'])

mail = Mail(app)

ADMIN_USERNAME = os.getenv('ADMIN_USERNAME')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')
JWT_SECRET = os.getenv('JWT_SECRET', 'your_jwt_secret')

messages = []  # In-memory storage for contact messages

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_user = data['username']
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(*args, **kwargs)
    return decorated

@app.route('/')
def home():
    return "Flask backend is running!"

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    if not name or not email or not message:
        return jsonify({'success': False, 'error': 'Missing fields'}), 400
    messages.append({
        'name': name,
        'email': email,
        'message': message,
        'date': datetime.datetime.now().isoformat()
    })
    # Send email to site owner
    try:
        owner_email = os.getenv('OWNER_EMAIL', 'ast.movies9688gmail.com')
        msg = Message(
            subject=f"New Contact Form Submission from {name}",
            recipients=[owner_email],
            body=f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
        )
        mail.send(msg)
    except Exception as e:
        return jsonify({'success': False, 'error': 'Failed to send email', 'details': str(e)}), 500
    return jsonify({'success': True})

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        token = jwt.encode({
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, JWT_SECRET, algorithm="HS256")
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/admin/messages', methods=['GET'])
@token_required
def get_messages():
    return jsonify(messages)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 