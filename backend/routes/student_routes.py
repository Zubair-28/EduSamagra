from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.jwt_helper import role_required
# Import all required models
from models import db, Student, Record, Scheme, Event, User, PortfolioProject, StudentSkill, StudentLink
from utils.ai_model import predict_student_risk

# Define the blueprint ONCE
student_bp = Blueprint('student_bp', __name__)

# --- Dashboard Route ---

@student_bp.route('/dashboard', methods=['GET'])
@role_required('student')
def get_student_dashboard():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()

    if not student:
        return jsonify(msg="Student profile not found"), 404
        
    # Fetch academic records including attendance
    records = Record.query.filter_by(student_id=student.id).order_by(Record.semester).all()
    gpa_trend = [
        {"semester": r.semester, "gpa": float(r.gpa), "attendance": float(r.attendance)} 
        for r in records
    ]
    
    # Get active schemes
    schemes = Scheme.query.filter_by(status='active').all()
    scheme_list = [{"id": s.id, "name": s.name, "description": s.description} for s in schemes]
    
    # Get institution events
    user = student.user
    events = []
    if user and user.institution_id: # Check if user and institution_id exist
        events = Event.query.filter_by(institution_id=user.institution_id).order_by(Event.event_date.desc()).limit(5).all()
    
    event_list = [{"id": e.id, "title": e.title, "date": e.event_date.isoformat()} for e in events]
    
    # Get AI Insight
    ai_insight = predict_student_risk(float(student.attendance_percentage), float(student.overall_gpa))

    dashboard_data = {
        "profile": {
            "name": student.full_name,
            "course": student.course,
            "institution": student.user.institution.name if user and user.institution else "N/A",
            "semester": student.current_semester
        },
        "kpis": {
            "gpa": float(student.overall_gpa),
            "attendance": float(student.attendance_percentage),
            "credits_earned": (student.current_semester - 1) * 20 # Mocked
        },
        "charts": {
            "gpa_trend": gpa_trend # This now contains both gpa and attendance
        },
        "ai_insight": ai_insight,
        "schemes": scheme_list,
        "events": event_list
    }
    
    return jsonify(dashboard_data), 200

# --- Portfolio Routes ---

@student_bp.route('/portfolio', methods=['GET'])
@role_required('student')
def get_portfolio():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    if not student:
        return jsonify(msg="Student profile not found"), 404

    # Get Projects
    projects = PortfolioProject.query.filter_by(student_id=student.id).order_by(PortfolioProject.created_at.desc()).all()
    project_list = [
        {"id": p.id, "title": p.title, "description": p.description, "project_link": p.project_link, "tags": p.tags.split(',') if p.tags else []}
        for p in projects
    ]
    
    # Get Skills
    skills = StudentSkill.query.filter_by(student_id=student.id).all()
    skill_list = [{"id": s.id, "skill_name": s.skill_name, "category": s.category} for s in skills]
    
    # Get Links
    links = StudentLink.query.filter_by(student_id=student.id).all()
    link_list = [{"id": l.id, "title": l.title, "url": l.url} for l in links]
    
    # Return all portfolio data
    return jsonify(
        projects=project_list,
        skills=skill_list,
        links=link_list
    ), 200


@student_bp.route('/portfolio/project', methods=['POST'])
@role_required('student')
def add_project():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    if not student:
        return jsonify(msg="Student profile not found"), 404
        
    data = request.get_json()
    
    if not data or 'title' not in data or not data.get('title').strip():
        return jsonify(msg="Title is required"), 400

    new_project = PortfolioProject(
        student_id=student.id,
        title=data.get('title'),
        description=data.get('description'),
        project_link=data.get('project_link'),
        tags=data.get('tags') # e.g., "React,Flask,AI"
    )
    
    try:
        db.session.add(new_project)
        db.session.commit()
        
        return jsonify({
            "id": new_project.id,
            "title": new_project.title,
            "description": new_project.description,
            "project_link": new_project.project_link,
            "tags": new_project.tags.split(',') if new_project.tags else []
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(msg=f"Error adding project: {str(e)}"), 500

@student_bp.route('/portfolio/project/<int:project_id>', methods=['DELETE'])
@role_required('student')
def delete_project(project_id):
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    if not student:
        return jsonify(msg="Student profile not found"), 404

    project = PortfolioProject.query.get(project_id)
    if not project:
        return jsonify(msg="Project not found"), 404
    
    if project.student_id != student.id:
        return jsonify(msg="Unauthorized to delete this project"), 403

    try:
        db.session.delete(project)
        db.session.commit()
        return jsonify(msg="Project deleted successfully"), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(msg=f"Error deleting project: {str(e)}"), 500

# --- NEW SKILL ROUTES ---

@student_bp.route('/portfolio/skill', methods=['POST'])
@role_required('student')
def add_skill():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    if not student:
        return jsonify(msg="Student not found"), 404
        
    data = request.get_json()
    if not data or 'skill_name' not in data or not data.get('skill_name').strip():
        return jsonify(msg="Skill name is required"), 400
    
    new_skill = StudentSkill(
        student_id=student.id,
        skill_name=data.get('skill_name'),
        category=data.get('category')
    )
    db.session.add(new_skill)
    db.session.commit()
    
    return jsonify({
        "id": new_skill.id,
        "skill_name": new_skill.skill_name,
        "category": new_skill.category
    }), 201

@student_bp.route('/portfolio/skill/<int:skill_id>', methods=['DELETE'])
@role_required('student')
def delete_skill(skill_id):
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    if not student:
        return jsonify(msg="Student not found"), 404

    skill = StudentSkill.query.get(skill_id)
    if not skill:
        return jsonify(msg="Skill not found"), 404
    
    if skill.student_id != student.id:
        return jsonify(msg="Unauthorized"), 403
        
    db.session.delete(skill)
    db.session.commit()
    return jsonify(msg="Skill deleted"), 200

# --- NEW LINK ROUTES ---

@student_bp.route('/portfolio/link', methods=['POST'])
@role_required('student')
def add_link():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    if not student:
        return jsonify(msg="Student not found"), 404
        
    data = request.get_json()
    if not data or 'title' not in data or not data.get('title').strip() or 'url' not in data or not data.get('url').strip():
        return jsonify(msg="Title and URL are required"), 400
    
    new_link = StudentLink(
        student_id=student.id,
        title=data.get('title'),
        url=data.get('url')
    )
    db.session.add(new_link)
    db.session.commit()
    
    return jsonify({
        "id": new_link.id,
        "title": new_link.title,
        "url": new_link.url
    }), 201

@student_bp.route('/portfolio/link/<int:link_id>', methods=['DELETE'])
@role_required('student')
def delete_link(link_id):
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    if not student:
        return jsonify(msg="Student not found"), 404

    link = StudentLink.query.get(link_id)
    if not link:
        return jsonify(msg="Link not found"), 404
    
    if link.student_id != student.id:
        return jsonify(msg="Unauthorized"), 403
        
    db.session.delete(link)
    db.session.commit()
    return jsonify(msg="Link deleted"), 200