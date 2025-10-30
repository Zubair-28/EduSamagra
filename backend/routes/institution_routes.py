from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.jwt_helper import role_required
from models import db, User, Student, Teacher, Institution
from sqlalchemy.sql import func
import pandas as pd
import io

institution_bp = Blueprint('institution_bp', __name__)

@institution_bp.route('/overview', methods=['GET'])
@role_required('institution')
def get_institution_overview():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    # --- Check for associated institution ---
    if not user or not user.institution_id:
        return jsonify(msg="User or institution ID not found"), 404
        
    institution = Institution.query.get(user.institution_id)

    if not institution:
        return jsonify(msg="Institution data not found"), 404

    # KPIs (using mock values and simple aggregation)
    total_students = db.session.query(func.count(Student.id)).join(User).filter(User.institution_id == institution.id).scalar()
    total_teachers = db.session.query(func.count(Teacher.id)).join(User).filter(User.institution_id == institution.id).scalar()
    avg_gpa = db.session.query(func.avg(Student.overall_gpa)).join(User).filter(User.institution_id == institution.id).scalar()
    
    # Mock Faculty List for the dashboard card
    teachers = Teacher.query.join(User).filter(User.institution_id == institution.id).all()
    faculty_list = [{
        "id": t.id,
        "name": t.full_name,
        "subject": t.subject,
        "avg_feedback": float(t.avg_feedback)
    } for t in teachers]
    
    # Mock Chart Data
    department_performance = [
        {"name": "CSE", "avg_gpa": 8.5},
        {"name": "Mech", "avg_gpa": 7.8},
        {"name": "Civil", "avg_gpa": 7.2},
        {"name": "EEE", "avg_gpa": 8.1},
    ]

    dashboard_data = {
        "profile": {
            "name": institution.name,
            "type": institution.type,
            "state": institution.state
        },
        "kpis": {
            "total_students": total_students,
            "total_teachers": total_teachers,
            "avg_gpa": round(float(avg_gpa or 0), 2),
            "nirf_rank": 42 # Mocked
        },
        "faculty": faculty_list,
        "charts": {
            "department_performance": department_performance
        }
    }
    return jsonify(dashboard_data), 200

# --- MOCK CSV UPLOAD ROUTE (needed for Institution Dashboard UI) ---

@institution_bp.route('/upload', methods=['POST'])
@role_required('institution')
def upload_data():
    if 'file' not in request.files:
        return jsonify(msg="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(msg="No selected file"), 400

    if file and file.filename.endswith('.csv'):
        # Mock processing: just return success
        return jsonify(msg=f"Successfully uploaded and processed mock data."), 200
            
    return jsonify(msg="Invalid file type. Please upload a CSV."), 400