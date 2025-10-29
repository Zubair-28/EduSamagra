from flask import Blueprint, jsonify, request
from utils.jwt_helper import role_required
# --- ADD IMPORTS for models used in the new route ---
from models import db, User, Institution, Student, Teacher 
# --- END ADD IMPORTS ---
from sqlalchemy.sql import func
from sqlalchemy import cast, String # Keep this if used elsewhere, not needed for new route specifically

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/overview', methods=['GET'])
@role_required('admin')
def get_admin_overview():
    total_institutions = db.session.query(func.count(Institution.id)).scalar()
    total_users = db.session.query(func.count(User.id)).scalar() # Requires User model
    total_students = db.session.query(func.count(Student.id)).scalar() # Requires Student model
    total_teachers = db.session.query(func.count(Teacher.id)).scalar() # Requires Teacher model
    
    # Mock nationwide chart data
    enrolment_trend = [
        {"year": 2021, "students": 15000}, {"year": 2022, "students": 17500},
        {"year": 2023, "students": 19000}, {"year": 2024, "students": 22000},
    ]
    
    # State-wise data
    state_data = db.session.query(
        Institution.state, 
        func.count(Institution.id).label('count')
    ).group_by(Institution.state).all() # Requires Institution model
    
    state_heatmap = [{"state": s.state, "institutions": s.count} for s in state_data]

    overview_data = {
        "kpis": {
            "total_institutions": total_institutions,
            "total_users": total_users,
            "total_students": total_students,
            "total_teachers": total_teachers
        },
        "charts": {
            "enrolment_trend": enrolment_trend,
            "state_heatmap": state_heatmap
        }
    }
    return jsonify(overview_data), 200

# --- REMOVED /api/admin/users route as per previous discussion ---
# @admin_bp.route('/users', methods=['GET']) ...

@admin_bp.route('/institutions', methods=['GET', 'POST'])
@role_required('admin')
def manage_institutions():
    if request.method == 'POST':
        data = request.get_json()
        # Basic validation
        if not all(k in data for k in ('name', 'type', 'state', 'district')):
             return jsonify(msg="Missing required fields"), 400
        new_inst = Institution(
            name=data.get('name'), type=data.get('type'),
            state=data.get('state'), district=data.get('district')
        )
        db.session.add(new_inst)
        db.session.commit()
        # Return the created institution data
        return jsonify({
            'msg': "Institution created",
            'institution': { 'id': new_inst.id, 'name': new_inst.name, 'type': new_inst.type, 'state': new_inst.state }
        }), 201

    # GET request
    institutions = Institution.query.order_by(Institution.name).all() # Added ordering
    inst_list = [{
        "id": i.id, "name": i.name, "type": i.type,
        "state": i.state, "district": i.district
    } for i in institutions]
    return jsonify(inst_list), 200

@admin_bp.route('/institutions/<int:id>', methods=['PUT', 'DELETE'])
@role_required('admin')
def manage_institution(id):
    inst = Institution.query.get_or_404(id)
    
    if request.method == 'PUT':
        data = request.get_json()
        # Update fields if provided in request data
        inst.name = data.get('name', inst.name)
        inst.type = data.get('type', inst.type)
        inst.state = data.get('state', inst.state)
        inst.district = data.get('district', inst.district)
        db.session.commit()
        return jsonify(msg="Institution updated"), 200
        
    if request.method == 'DELETE':
        # Consider implications before deleting (e.g., users tied to it)
        # For demo, setting user's institution_id to NULL
        User.query.filter_by(institution_id=id).update({"institution_id": None})
        db.session.delete(inst)
        db.session.commit()
        return jsonify(msg="Institution deleted"), 200

# --- NEW ROUTE: Get Specific Institution Details ---
@admin_bp.route('/institutions/<int:id>/details', methods=['GET'])
@role_required('admin')
def get_institution_details(id):
    institution = Institution.query.get_or_404(id)

    # Fetch related students - Ensure relationships are loaded efficiently
    # Using options(joinedload(Student.user)) might be needed for email if lazy loading is off
    students = Student.query.join(User).filter(User.institution_id == id).all()

    # Fetch related teachers
    teachers = Teacher.query.join(User).filter(User.institution_id == id).all()

    # Prepare data for JSON response
    student_list = []
    for s in students:
        # Check if user relationship exists before accessing email
        user_email = s.user.email if s.user else 'N/A'
        student_list.append({
            'id': s.id, 'user_id': s.user_id, 'name': s.full_name,
            'email': user_email, 'course': s.course,
            'gpa': float(s.overall_gpa) if s.overall_gpa is not None else None, # Handle potential None
            'attendance': float(s.attendance_percentage) if s.attendance_percentage is not None else None # Handle potential None
        })

    teacher_list = []
    for t in teachers:
        user_email = t.user.email if t.user else 'N/A'
        teacher_list.append({
            'id': t.id, 'user_id': t.user_id, 'name': t.full_name,
            'email': user_email, 'subject': t.subject,
            'avg_feedback': float(t.avg_feedback) if t.avg_feedback is not None else None # Handle potential None
        })

    return jsonify({
        'institution': {
            'id': institution.id,
            'name': institution.name,
            'type': institution.type,
            'state': institution.state,
            'district': institution.district
            # Add other details like created_at if needed
        },
        'students': student_list,
        'teachers': teacher_list
    }), 200
# --- END NEW ROUTE ---