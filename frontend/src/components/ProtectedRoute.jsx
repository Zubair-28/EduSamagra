// Role-protected route wrapper
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Note: use 'jwt-decode' library

const checkAuth = (role) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);

        // Check token expiration
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.clear();
            return false;
        }

        // Check role
        return decodedToken.role === role;
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
        return false;
    }
};

const ProtectedRoute = ({ children, role }) => {
    const isAuthenticated = checkAuth(role);

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to so we can send them along after they login
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;