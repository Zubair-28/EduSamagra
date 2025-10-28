from flask import Blueprint, request, jsonify
from models import db, User, Student, Teacher
from flask_jwt_extended import create_access_token
import datetime

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/signup', methods=['POST'])
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    full_name = data.get('fullName')
    
    # --- THIS LOGIC IS NEW ---
    institution_id = None
    if role == 'admin':
        institution_id = None # Admins are not tied to an institution
    else:
        # Students, Teachers, and Institution-Admins are tied to Institution 1 (for demo)
        institution_id = 1 
    # --- END OF NEW LOGIC ---

    if User.query.filter_by(email=email).first():
        return jsonify(msg="Email already exists"), 400

    new_user = User(email=email, role=role, institution_id=institution_id)
    new_user.set_password(password)
    
    try:
        db.session.add(new_user)
        db.session.flush() # Get the new_user.id before committing

        # Create a profile entry based on role
        if role == 'student':
            new_student = Student(user_id=new_user.id, full_name=full_name, course="B.Tech", current_semester=1)
            db.session.add(new_student)
        elif role == 'teacher':
            new_teacher = Teacher(user_id=new_user.id, full_name=full_name, subject="Not Assigned")
            db.session.add(new_teacher)
        # Note: We don't need to create a profile for 'admin' or 'institution'
        # The 'User' entry with the correct role is all they need to log in.
        
        db.session.commit()
        return jsonify(msg="User created successfully"), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(msg=f"Error: {str(e)}"), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # --- THIS IS THE FIX ---
        # The identity must be a string, not an integer
        access_token = create_access_token(
            identity=str(user.id), 
            expires_delta=datetime.timedelta(days=1)
        )
        # --- END OF FIX ---
        
        return jsonify(access_token=access_token, role=user.role), 200
    else:
        return jsonify(msg="Bad email or password"), 401