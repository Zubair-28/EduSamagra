from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import jsonify
from models import User  # <-- THIS IS THE LINE THAT IS MISSING

def role_required(role_name):
    """
    Custom decorator to check if user has the required role.
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                # This verifies the token is present and valid
                verify_jwt_in_request()
                
                # We will manually get the user ID and look them up.
                identity = get_jwt_identity()
                user = User.query.get(identity) 
                
                if user and user.role == role_name:
                    return fn(*args, **kwargs)
                elif not user:
                    # This case will happen if the lookup fails
                    return jsonify(msg="Invalid token: User not found"), 422
                else:
                    return jsonify(msg=f"Access forbidden: {role_name}s only"), 403
            
            except Exception as e:
                # We can remove the debug print now
                # print(f"EXCEPTION in role_required: {str(e)}")
                return jsonify(msg=f"Error in decorator: {str(e)}"), 500
        return wrapper
    return decorator