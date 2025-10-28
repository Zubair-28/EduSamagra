from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from utils.jwt_helper import role_required
from models import db, User, Student, Teacher, Institution
from utils.ai_model import predict_institution_rank
from sqlalchemy.sql import func
import pandas as pd
import io

institution_bp = Blueprint('institution_bp', __name__)

@institution_bp.route('/dashboard', methods=['GET'])
@role_required('institution')
def get_institution_dashboard():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    institution = Institution.query.get(user.institution_id)

    if not institution:
        return jsonify(msg="Institution not found"), 404

    # KPIs
    total_students = db.session.query(func.count(Student.id)).join(User).filter(User.institution_id == institution.id).scalar()
    total_teachers = db.session.query(func.count(Teacher.id)).join(User).filter(User.institution_id == institution.id).scalar()
    avg_gpa = db.session.query(func.avg(Student.overall_gpa)).join(User).filter(User.institution_id == institution.id).scalar()
    
    # Faculty List
    teachers = Teacher.query.join(User).filter(User.institution_id == institution.id).all()
    faculty_list = [{
        "id": t.id,
        "name": t.full_name,
        "subject": t.subject,
        "avg_feedback": float(t.avg_feedback)
    } for t in teachers]
    
    # AI Insight
    ai_insight = predict_institution_rank(total_students, float(avg_gpa or 0))
    
    # Mock Chart Data
    department_performance = [
        {"name": "CSE", "avg_gpa": 8.5},
        {"name": "Mech", "avg_gpa": 7.8},
        {"name": "Civil", "avg_gpa": 7.2},
        {"name": "EEE", "avg_gpa": 8.1},
    ]

    dashboard_data = {
        "profile": {
            "name": institution.name
        },
        "kpis": {
            "total_students": total_students,
            "total_teachers": total_teachers,
            "avg_gpa": round(float(avg_gpa or 0), 2),
            "nirf_rank": 42 # Mocked
        },
        "faculty": faculty_list,
        "ai_insight": ai_insight,
        "charts": {
            "department_performance": department_performance
        }
    }
    return jsonify(dashboard_data), 200


@institution_bp.route('/upload', methods=['POST'])
@role_required('institution')
def upload_data():
    if 'file' not in request.files:
        return jsonify(msg="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(msg="No selected file"), 400

    if file and file.filename.endswith('.csv'):
        try:
            # Mock processing: just read the CSV to confirm it's valid
            stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
            df = pd.read_csv(stream)
            # In a real app, you'd parse df and update the database
            
            return jsonify(msg=f"Successfully uploaded and processed {len(df)} rows."), 200
        except Exception as e:
            return jsonify(msg=f"File processing error: {str(e)}"), 500
            
    return jsonify(msg="Invalid file type. Please upload a CSV."), 400