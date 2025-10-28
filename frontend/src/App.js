// Main React Router setup
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardStudent from './pages/DashboardStudent';
import DashboardTeacher from './pages/DashboardTeacher';
import DashboardInstitution from './pages/DashboardInstitution';
import DashboardAdmin from './pages/DashboardAdmin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard/student"
                    element={
                        <ProtectedRoute role="student">
                            <DashboardStudent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/teacher"
                    element={
                        <ProtectedRoute role="teacher">
                            <DashboardTeacher />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/institution"
                    element={
                        <ProtectedRoute role="institution">
                            <DashboardInstitution />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <DashboardAdmin />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;