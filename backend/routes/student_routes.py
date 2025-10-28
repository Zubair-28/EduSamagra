from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity
from utils.jwt_helper import role_required
from models import Student, Record, Scheme, Event
from utils.ai_model import predict_student_risk

student_bp = Blueprint('student_bp', __name__)

@student_bp.route('/dashboard', methods=['GET'])
@role_required('student')
def get_student_dashboard():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()

    if not student:
        return jsonify(msg="Student profile not found"), 404
        
    # Get academic records
    records = Record.query.filter_by(student_id=student.id).order_by(Record.semester).all()
    gpa_trend = [{"semester": r.semester, "gpa": float(r.gpa)} for r in records]
    
    # Get active schemes
    schemes = Scheme.query.filter_by(status='active').all()
    scheme_list = [{"id": s.id, "name": s.name, "description": s.description} for s in schemes]
    
    # Get institution events
    user = student.user
    events = Event.query.filter_by(institution_id=user.institution_id).order_by(Event.event_date.desc()).limit(5).all()
    event_list = [{"id": e.id, "title": e.title, "date": e.event_date.isoformat()} for e in events]
    
    # Get AI Insight
    ai_insight = predict_student_risk(float(student.attendance_percentage), float(student.overall_gpa))

    dashboard_data = {
        "profile": {
            "name": student.full_name,
            "course": student.course,
            "institution": student.user.institution.name if student.user.institution else "N/A",
            "semester": student.current_semester
        },
        "kpis": {
            "gpa": float(student.overall_gpa),
            "attendance": float(student.attendance_percentage),
            "credits_earned": (student.current_semester - 1) * 20 # Mocked
        },
        "charts": {
            "gpa_trend": gpa_trend
        },
        "ai_insight": ai_insight,
        "schemes": scheme_list,
        "events": event_list
    }
    
    return jsonify(dashboard_data), 200