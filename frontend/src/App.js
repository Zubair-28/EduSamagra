// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import MyPortfolio from './pages/MyPortfolio'; // <-- Import the new portfolio page
// Page Imports
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardStudent from './pages/DashboardStudent';
import DashboardTeacher from './pages/DashboardTeacher';
import DashboardInstitution from './pages/DashboardInstitution';
import DashboardAdmin from './pages/DashboardAdmin';
import InstitutionDetailAdmin from './pages/InstitutionDetailAdmin';
import ManageInstitutionsAdmin from './pages/ManageInstitutionsAdmin';
import PlaceholderPage from './pages/PlaceholderPage';
import AcademicPerformance from './pages/AcademicPerformance'; // <-- 1. IMPORT NEW PAGE

// Layout Imports
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ... Public Routes ... */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* --- Student Routes --- */}
                <Route path="/dashboard/student" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><DashboardStudent /></MainLayout></ProtectedRoute>} />

                {/* --- 2. REPLACE PLACEHOLDER --- */}
                <Route
                    path="/dashboard/student/academics"
                    element={
                        <ProtectedRoute role="student">
                            <MainLayout expectedRole="student">
                                <AcademicPerformance />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/student/portfolio"
                    element={
                        <ProtectedRoute role="student">
                            <MainLayout expectedRole="student">
                                <MyPortfolio />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
                {/* --- END REPLACE --- */}

                <Route path="/dashboard/student/portfolio" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><PlaceholderPage title="My Portfolio" role="student" /></MainLayout></ProtectedRoute>} />
                <Route path="/dashboard/student/courses" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><PlaceholderPage title="My Courses" role="student" /></MainLayout></ProtectedRoute>} />
                <Route path="/dashboard/student/timetable" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><PlaceholderPage title="My Time Table" role="student" /></MainLayout></ProtectedRoute>} />
                <Route path="/dashboard/student/schemes" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><PlaceholderPage title="All Government Schemes" role="student" /></MainLayout></ProtectedRoute>} />
                <Route path="/dashboard/student/settings" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><PlaceholderPage title="Student Settings" role="student" /></MainLayout></ProtectedRoute>} />
                <Route path="/dashboard/student/announcements" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><PlaceholderPage title="All Announcements" role="student" /></MainLayout></ProtectedRoute>} />

                {/* ... Teacher, Institution, Admin Routes ... */}
                <Route path="/dashboard/teacher" element={<ProtectedRoute role="teacher"><MainLayout expectedRole="teacher"><DashboardTeacher /></MainLayout></ProtectedRoute>} />
                <Route path="/dashboard/institution" element={<ProtectedRoute role="institution"><MainLayout expectedRole="institution"><DashboardInstitution /></MainLayout></ProtectedRoute>} />
                <Route path="/dashboard/admin" element={<ProtectedRoute role="admin"><MainLayout expectedRole="admin"><DashboardAdmin /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/institution/:institutionId" element={<ProtectedRoute role="admin"><MainLayout expectedRole="admin"><InstitutionDetailAdmin /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/manage-institutions" element={<ProtectedRoute role="admin"><MainLayout expectedRole="admin"><ManageInstitutionsAdmin /></MainLayout></ProtectedRoute>} />
                <Route path="/notifications/history" element={<ProtectedRoute role="student"><MainLayout expectedRole="student"><PlaceholderPage title="Notification History" role="student" /></MainLayout></ProtectedRoute>} />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;