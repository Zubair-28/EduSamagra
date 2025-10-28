from flask import Blueprint, jsonify, request
from utils.jwt_helper import role_required
from models import db, User, Institution, Student, Teacher
from sqlalchemy.sql import func
from sqlalchemy import cast, String

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/overview', methods=['GET'])
@role_required('admin')
def get_admin_overview():
    total_institutions = db.session.query(func.count(Institution.id)).scalar()
    total_users = db.session.query(func.count(User.id)).scalar()
    total_students = db.session.query(func.count(Student.id)).scalar()
    
    # Mock nationwide chart data
    enrolment_trend = [
        {"year": 2021, "students": 15000},
        {"year": 2022, "students": 17500},
        {"year": 2023, "students": 19000},
        {"year": 2024, "students": 22000},
    ]
    
    # State-wise data
    state_data = db.session.query(
        Institution.state, 
        func.count(Institution.id).label('count')
    ).group_by(Institution.state).all()
    
    state_heatmap = [{"state": s.state, "institutions": s.count} for s in state_data]

    overview_data = {
        "kpis": {
            "total_institutions": total_institutions,
            "total_users": total_users,
            "total_students": total_students,
            "total_teachers": db.session.query(func.count(Teacher.id)).scalar()
        },
        "charts": {
            "enrolment_trend": enrolment_trend,
            "state_heatmap": state_heatmap
        }
    }
    return jsonify(overview_data), 200

@admin_bp.route('/users', methods=['GET'])
@role_required('admin')
def get_all_users():
    users = User.query.options(db.joinedload(User.institution)).all()
    user_list = [{
        "id": u.id,
        "email": u.email,
        "role": u.role,
        "institution": u.institution.name if u.institution else "N/A",
        "institution_id": u.institution_id
    } for u in users]
    return jsonify(user_list), 200

@admin_bp.route('/institutions', methods=['GET', 'POST'])
@role_required('admin')
def manage_institutions():
    if request.method == 'POST':
        data = request.get_json()
        new_inst = Institution(
            name=data.get('name'),
            type=data.get('type'),
            state=data.get('state'),
            district=data.get('district')
        )
        db.session.add(new_inst)
        db.session.commit()
        return jsonify(msg="Institution created"), 201

    # GET request
    institutions = Institution.query.all()
    inst_list = [{
        "id": i.id,
        "name": i.name,
        "type": i.type,
        "state": i.state,
        "district": i.district
    } for i in institutions]
    return jsonify(inst_list), 200

@admin_bp.route('/institutions/<int:id>', methods=['PUT', 'DELETE'])
@role_required('admin')
def manage_institution(id):
    inst = Institution.query.get_or_404(id)
    
    if request.method == 'PUT':
        data = request.get_json()
        inst.name = data.get('name', inst.name)
        inst.type = data.get('type', inst.type)
        inst.state = data.get('state', inst.state)
        inst.district = data.get('district', inst.district)
        db.session.commit()
        return jsonify(msg="Institution updated"), 200
        
    if request.method == 'DELETE':
        # Must handle foreign key constraints.
        # For demo, we'll just delete. In production, you'd re-assign or block.
        User.query.filter_by(institution_id=id).update({"institution_id": None})
        db.session.delete(inst)
        db.session.commit()
        return jsonify(msg="Institution deleted"), 200