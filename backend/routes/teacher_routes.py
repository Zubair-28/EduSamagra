from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity
from utils.jwt_helper import role_required
# --- THIS LINE IS THE FIX ---
from models import db, User, Teacher, Student, TeacherQualification, Timetable
# --- END OF FIX ---
from utils.ai_model import predict_teacher_performance
from sqlalchemy.sql import func

teacher_bp = Blueprint('teacher_bp', __name__)

@teacher_bp.route('/dashboard', methods=['GET'])
@role_required('teacher')
def get_teacher_dashboard():
    user_id = get_jwt_identity()
    teacher = Teacher.query.filter_by(user_id=user_id).first()

    if not teacher:
        return jsonify(msg="Teacher profile not found"), 404

    # Get institution ID from the teacher's user record
    inst_id = teacher.user.institution_id
    
    # KPIs (Mocked for students in the same institution)
    # These queries require 'User' to be imported
    students_in_inst = Student.query.join(User).filter(User.institution_id == inst_id).all()
    total_students = len(students_in_inst)
    avg_gpa = db.session.query(func.avg(Student.overall_gpa)).filter(User.institution_id == inst_id).join(User).scalar()
    avg_attendance = db.session.query(func.avg(Student.attendance_percentage)).filter(User.institution_id == inst_id).join(User).scalar()
    
    # Student List (Mocked: all students in institution)
    student_list = [{
        "id": s.id,
        "name": s.full_name,
        "course": s.course,
        "gpa": float(s.overall_gpa),
        "attendance": float(s.attendance_percentage)
    } for s in students_in_inst]
    
    # Qualifications
    qualifications = TeacherQualification.query.filter_by(teacher_id=teacher.id).all()
    qualification_list = [{
        "degree": q.degree,
        "university": q.university,
        "year": q.year_completed
    } for q in qualifications]
    
    # Timetable
    timetable_entries = Timetable.query.filter_by(teacher_id=teacher.id).all()
    timetable_list = [{
        "class": t.class_name,
        "subject": t.subject,
        "day": t.day_of_week,
        "time": f"{t.start_time.strftime('%H:%M')} - {t.end_time.strftime('%H:%M')}"
    } for t in timetable_entries]

    # AI Insight
    ai_insight = predict_teacher_performance(float(avg_gpa or 0), float(teacher.avg_feedback))
    
    dashboard_data = {
        "profile": {
            "name": teacher.full_name,
            "subject": teacher.subject
        },
        "kpis": {
            "total_students": total_students,
            "avg_gpa": round(float(avg_gpa or 0), 2),
            "avg_attendance": round(float(avg_attendance or 0), 2)
        },
        "students": student_list,
        "qualifications": qualification_list,
        "timetable": timetable_list,
        "ai_insight": ai_insight
    }
    
    return jsonify(dashboard_data), 200