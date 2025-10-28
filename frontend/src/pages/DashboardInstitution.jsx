// Institution Dashboard
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { dashboardAPI } from '../api/dashboardAPI';
import KPIBox from '../components/common/KPIBox';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import { HomeIcon, UserGroupIcon, AcademicCapIcon, BuildingOfficeIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axiosInstance from '../api/axiosInstance'; // For upload

const institutionLinks = [
    { name: 'Dashboard', path: '/dashboard/institution', icon: <HomeIcon /> },
    { name: 'Faculty', path: '#', icon: <AcademicCapIcon /> },
    { name: 'Students', path: '#', icon: <UserGroupIcon /> },
    { name: 'Upload Data', path: '#', icon: <ArrowUpOnSquareIcon /> },
];

const DashboardInstitution = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardAPI.getDashboardData('institution');
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch institution data", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        setUploadStatus('Uploading...');

        try {
            const response = await axiosInstance.post('/institution/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus(response.data.msg);
        } catch (error) {
            setUploadStatus(error.response?.data?.msg || 'Upload failed.');
        }
    };

    if (loading) {
        return (
            <DashboardLayout role="institution" links={institutionLinks}>
                <div className="text-center text-xl">Loading Institution Dashboard...</div>
            </DashboardLayout>
        );
    }

    if (!data) {
        return (
            <DashboardLayout role="institution" links={institutionLinks}>
                <div className="text-center text-xl text-red-500">Failed to load data.</div>
            </DashboardLayout>
        );
    }

    const { profile, kpis, faculty, ai_insight, charts } = data;

    return (
        <DashboardLayout role="institution" links={institutionLinks}>
            <h2 className="text-3xl font-semibold mb-6 dark:text-white">
                {profile.name} Dashboard 🏫
            </h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <KPIBox title="Total Students" value={kpis.total_students} icon={<UserGroupIcon />} theme="institution" />
                <KPIBox title="Total Faculty" value={kpis.total_teachers} icon={<AcademicCapIcon />} theme="institution" />
                <KPIBox title="Institute Avg. GPA" value={kpis.avg_gpa} icon={<SparklesIcon />} theme="institution" />
                <KPIBox title="NIRF Rank (Mock)" value={`#${kpis.nirf_rank}`} icon={<BuildingOfficeIcon />} theme="institution" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Charts & Upload) */}
                <div className="lg:col-span-2 space-y-6">
                    <ChartCard title="Department Performance (Avg. GPA)">
                        <BarChart data={charts.department_performance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avg_gpa" fill="#f97316" />
                        </BarChart>
                    </ChartCard>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Upload AISHE/NIRF Data (CSV)</h3>
                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-institution dark:file:bg-slate-700 dark:file:text-orange-300 hover:file:bg-orange-100"
                            />
                            <button
                                onClick={handleUpload}
                                className="px-4 py-2 bg-institution text-white rounded-lg hover:bg-orange-700"
                            >
                                Upload
                            </button>
                        </div>
                        {uploadStatus && <p className="text-sm mt-4">{uploadStatus}</p>}
                    </div>
                </div>

                {/* Right Column (AI & Faculty) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-4 rounded-lg shadow bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center">
                            <SparklesIcon className="h-6 w-6 mr-3 text-blue-500" />
                            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">AI Ranking Forecast</h4>
                        </div>
                        <p className="mt-2 text-blue-700 dark:text-blue-300">
                            {ai_insight.prediction_text}
                        </p>
                    </div>
                    <DataTable
                        title="Faculty Overview"
                        columns={['Name', 'Subject', 'Feedback']}
                        data={faculty.map(f => ({ name: f.name, subject: f.subject, feedback: f.avg_feedback.toFixed(1) }))}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardInstitution;