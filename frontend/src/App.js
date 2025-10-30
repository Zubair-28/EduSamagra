// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardStudent from './pages/DashboardStudent';
import DashboardTeacher from './pages/DashboardTeacher';
import DashboardInstitution from './pages/DashboardInstitution';
import DashboardAdmin from './pages/DashboardAdmin';
import InstitutionDetailAdmin from './pages/InstitutionDetailAdmin';
import ManageInstitutionsAdmin from './pages/ManageInstitutionsAdmin';
import PlaceholderPage from './pages/PlaceholderPage';
import AcademicPerformance from './pages/AcademicPerformance';
import MyPortfolio from './pages/MyPortfolio';
import MyCourses from './pages/MyCourses';
import TimeTablePage from './pages/TimeTablePage';
import SchemesPage from './pages/SchemesPage';

import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* STUDENT */}
                <Route
                    path="/dashboard/student"
                    element={
                        <ProtectedRoute role="student">
                            <MainLayout expectedRole="student">
                                <DashboardStudent />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
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
                <Route
                    path="/dashboard/student/courses"
                    element={
                        <ProtectedRoute role="student">
                            <MainLayout expectedRole="student">
                                <MyCourses />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/student/timetable"
                    element={
                        <ProtectedRoute role="student">
                            <MainLayout expectedRole="student">
                                <TimeTablePage />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/student/schemes"
                    element={
                        <ProtectedRoute role="student">
                            <MainLayout expectedRole="student">
                                <SchemesPage />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* TEACHER */}
                <Route
                    path="/dashboard/teacher"
                    element={
                        <ProtectedRoute role="teacher">
                            <MainLayout expectedRole="teacher">
                                <DashboardTeacher />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* INSTITUTION */}
                <Route
                    path="/dashboard/institution"
                    element={
                        <ProtectedRoute role="institution">
                            <MainLayout expectedRole="institution">
                                <DashboardInstitution />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN */}
                <Route
                    path="/dashboard/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <MainLayout expectedRole="admin">
                                <DashboardAdmin />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/institution/:institutionId"
                    element={
                        <ProtectedRoute role="admin">
                            <MainLayout expectedRole="admin">
                                <InstitutionDetailAdmin />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/manage-institutions"
                    element={
                        <ProtectedRoute role="admin">
                            <MainLayout expectedRole="admin">
                                <ManageInstitutionsAdmin />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
