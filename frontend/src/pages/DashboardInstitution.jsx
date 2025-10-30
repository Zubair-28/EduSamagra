// frontend/src/pages/DashboardInstitution.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import KPIBox from '../components/common/KPIBox';
import ChartCard from '../components/common/ChartCard';
import { UserGroupIcon, AcademicCapIcon, BuildingOfficeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardInstitution = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                // Call the backend endpoint that exists: /institution/overview
                // axiosInstance should have baseURL like '/api' configured
                const response = await axiosInstance.get('/institution/overview');
                setData(response.data);
            } catch (err) {
                console.error('Failed to fetch institution data', err);
                // Provide a helpful error message but keep it generic for UI
                setError('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-xl text-text-secondary">Loading Institution Dashboard...</div>;
    }

    if (error || !data) {
        return <div className="p-6 text-center text-xl text-red-500">{error || 'Failed to load data.'}</div>;
    }

    // Safe destructuring with defaults
    const { profile = {}, kpis = {}, faculty = [], charts = {} } = data;
    const avgGpa = (kpis?.avg_gpa != null && typeof kpis.avg_gpa === 'number') ? kpis.avg_gpa.toFixed(2) : 'N/A';
    const departmentPerformance = Array.isArray(charts?.department_performance) ? charts.department_performance : [];

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-main mb-4">
                {profile?.name || 'Institution'} Dashboard
            </h2>

            {/* KPI Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 animate-fade-in-up">
                <KPIBox title="Total Students" value={kpis?.total_students ?? 0} icon={<UserGroupIcon />} delay={0} />
                <KPIBox title="Total Faculty" value={kpis?.total_teachers ?? 0} icon={<AcademicCapIcon />} delay={100} />
                <KPIBox title="Average GPA" value={avgGpa} icon={<SparklesIcon />} delay={200} />
                <KPIBox title="NIRF Rank (Mock)" value={kpis?.nirf_rank ? `#${kpis.nirf_rank}` : 'N/A'} icon={<BuildingOfficeIcon />} delay={300} />
            </div>

            {/* Charts & Faculty List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartCard title="Department Performance (Mock)">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={departmentPerformance} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip />
                                <Bar dataKey="avg_gpa" fill="#06b6d4" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Faculty List Card */}
                <div className="bg-light-card p-4 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-lg font-semibold text-text-main mb-4">Faculty Overview</h3>
                    <div className="overflow-y-auto max-h-80 pr-2">
                        {faculty.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {faculty.map((f, idx) => (
                                    <li key={f.id ?? idx} className="py-2">
                                        <p className="text-sm font-medium text-text-main">{f.name ?? 'Unknown'}</p>
                                        <p className="text-xs text-text-secondary">{f.subject ?? '—'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-text-secondary">No faculty data available.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload & Events placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-light-card p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-text-main mb-4">Upload AISHE/NIRF Data</h3>
                    <div className="text-center text-text-secondary p-10 border-dashed border-2 border-gray-300 rounded-lg">
                        Upload component placeholder.
                        <button className="mt-4 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700">Upload CSV</button>
                    </div>
                </div>
                <div className="bg-light-card p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-text-main mb-4">Manage Events</h3>
                    <div className="text-center text-text-secondary p-10 border-dashed border-2 border-gray-300 rounded-lg">
                        Events list placeholder.
                        <button className="mt-4 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700">Create New Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardInstitution;
