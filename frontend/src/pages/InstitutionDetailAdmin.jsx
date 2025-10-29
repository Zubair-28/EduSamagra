import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Removed DashboardLayout and Sidebar imports
import { adminAPI } from '../api/adminAPI'; // You'll need to create this function
import DataTable from '../components/common/DataTable';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../api/axiosInstance'; // Use axiosInstance

// --- Remove Sidebar Link Definitions ---
// const adminLinks = [ ... ];
// const bottomLinks = [ ... ];

const InstitutionDetailAdmin = () => {
    const { institutionId } = useParams();
    const [institutionData, setInstitutionData] = useState(null);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Removed sidebarProfile definition

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                // Call the correct backend endpoint
                const response = await axiosInstance.get(`/admin/institutions/${institutionId}/details`);

                setInstitutionData(response.data.institution);
                setStudents(response.data.students);
                setTeachers(response.data.teachers);
            } catch (err) {
                console.error("Failed to fetch institution details", err);
                setError(`Failed to load data for Institution ID: ${institutionId}.`);
            }
            setLoading(false);
        };

        fetchData();
    }, [institutionId]);

    if (loading) {
        return <div className="p-6 text-center text-xl text-text-secondary">Loading Institution Details...</div>;
    }

    if (error || !institutionData) {
        return (
            <div className="p-6">
                <Link to="/admin/manage-institutions" className="inline-flex items-center text-sm text-primary-600 hover:underline mb-4">
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    Back to Institutions List
                </Link>
                <div className="text-center text-xl text-red-500 mt-4">{error || 'Institution data not found.'}</div>
            </div>
        );
    }

    return (
        // --- REMOVED DashboardLayout Wrapper ---
        <div className="p-6 space-y-6">
            <Link to="/admin/manage-institutions" className="inline-flex items-center text-sm text-primary-600 hover:underline mb-4">
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back to Institutions List
            </Link>

            {/* Institution Header */}
            <div className="bg-light-card p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-text-main">{institutionData.name}</h2>
                <p className="text-text-secondary">{institutionData.type} - {institutionData.state}</p>
            </div>

            {/* Students Table */}
            <div className="bg-light-card p-4 rounded-lg shadow-md">
                <DataTable
                    title={`Students (${students.length})`}
                    columns={['ID', 'Name', 'Email', 'Course', 'GPA', 'Attendance']}
                    data={students.map(s => ({
                        id: s.id,
                        name: s.name,
                        email: s.email,
                        course: s.course,
                        gpa: s.gpa || 'N/A',
                        attendance: s.attendance ? `${s.attendance}%` : 'N/A'
                    }))}
                />
            </div>

            {/* Teachers Table */}
            <div className="bg-light-card p-4 rounded-lg shadow-md">
                <DataTable
                    title={`Teachers (${teachers.length})`}
                    columns={['ID', 'Name', 'Email', 'Subject', 'Feedback']}
                    data={teachers.map(t => ({
                        id: t.id,
                        name: t.name,
                        email: t.email,
                        subject: t.subject,
                        avg_feedback: t.avg_feedback || 'N/A'
                    }))}
                />
            </div>
        </div>
        // --- END Removed DashboardLayout Wrapper ---
    );
};

export default InstitutionDetailAdmin;