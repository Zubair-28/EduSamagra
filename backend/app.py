import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from database import db
from models import bcrypt
from routes.auth_routes import auth_bp
from routes.student_routes import student_bp
from routes.teacher_routes import teacher_bp
from routes.institution_routes import institution_bp
from routes.admin_routes import admin_bp

load_dotenv()

app = Flask(__name__)

# --- Configurations ---
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- Initializations ---
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# --- JWT Claims Loaders ---
from models import User

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    # --- DEBUG PRINT ---
    print("--- 1. USER LOOKUP LOADER ---")
    identity = jwt_data.get("sub")
    print(f"Identity (sub) from token: {identity}")
    if identity is None:
        print("ERROR: Token has no 'sub' (identity) claim!")
        return None
        
    user = User.query.get(identity)
    print(f"User.query.get(identity) result: {user}")
    print("--- END USER LOOKUP ---")
    return user
    # --- END DEBUG ---


@jwt.additional_claims_loader
def add_claims_to_access_token(identity):
    # --- DEBUG PRINT ---
    print("--- 2. ADDITIONAL CLAIMS LOADER ---")
    print(f"Identity received: {identity}")
    user = User.query.get(identity)
    print(f"User.query.get(identity) result: {user}")
    
    if user:
        print(f"Adding role '{user.role}' to token")
        print("--- END CLAIMS ---")
        return {"role": user.role}
        
    print("ERROR: Could not find user to add claims.")
    print("--- END CLAIMS ---")
    return {}
    # --- END DEBUG ---


# --- Register Blueprints ---
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(student_bp, url_prefix='/api/student')
app.register_blueprint(teacher_bp, url_prefix='/api/teacher')
app.register_blueprint(institution_bp, url_prefix='/api/institution')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

# --- Base Route ---
@app.route('/')
def home():
    return jsonify({"message": "Welcome to EduSamagra API"})

if __name__ == '__main__':
    with app.app_context():
        # Optional: create all tables if they don't exist
        # db.create_all() 
        pass
    # --- DEBUG MODE ENABLED ---
    app.run(debug=True)