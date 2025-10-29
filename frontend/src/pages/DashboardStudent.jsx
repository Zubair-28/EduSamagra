import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import StudentSideBar from '../components/layout/StudentSideBar'; // Use Student sidebar
import { dashboardAPI } from '../api/dashboardAPI';
import ChartCard from '../components/common/ChartCard';
import KPIBox from '../components/common/KPIBox';
import {
    HomeIcon, ChartBarIcon, UserIcon, BookOpenIcon, ClockIcon, SparklesIcon, CogIcon, // Sidebar Icons
    AcademicCapIcon, CheckCircleIcon, MegaphoneIcon // Icons for KPIs & Placeholders
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Sidebar Links for Student ---
const studentLinks = [
    { name: 'Overview', path: '/dashboard/student', icon: <HomeIcon /> },
    { name: 'Academic Performance', path: '/dashboard/student/academics', icon: <ChartBarIcon /> },
    { name: 'My Portfolio', path: '/dashboard/student/portfolio', icon: <UserIcon /> },
    { name: 'Courses', path: '/dashboard/student/courses', icon: <BookOpenIcon /> },
    { name: 'Time Table', path: '/dashboard/student/timetable', icon: <ClockIcon /> },
    { name: 'Schemes', path: '/dashboard/student/schemes', icon: <SparklesIcon /> },
];
const bottomLinks = [
    { name: 'Setting', path: '/dashboard/student/settings', icon: <CogIcon /> },
];
// --- END Links ---

const DashboardStudent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await dashboardAPI.getDashboardData('student');
                setData(response.data);
            } catch (err) {
                console.error("Failed to fetch student data", err);
                setError('Failed to load dashboard data.');
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Prepare profile data for sidebar
    const prepareSidebarProfile = (profileData, institutionName) => ({
        name: profileData?.name || "Student Name",
        avatar: null, // Replace later
        details: profileData?.course || "Course Details",
        institution: institutionName || "Institution Name"
    });

    // Loading State
    if (loading) {
        const loadingProfile = prepareSidebarProfile();
        // Return only the content, not the layout
        return <div className="p-6 text-center text-xl text-text-secondary">Loading...</div>;
    }

    // Error State
    if (error || !data) {
        const errorProfile = prepareSidebarProfile();
        // Return only the content, not the layout
        return <div className="p-6 text-center text-xl text-red-500">{error || 'Failed to load data.'}</div>;
    }

    // --- Data Preparation ---
    const { profile, kpis, charts, schemes = [], events = [] } = data;
    // sidebarProfile is now handled by MainLayout in App.js

    const performanceData = charts?.gpa_trend?.slice(-4) || [
        { semester: 1, gpa: 8.2 }, { semester: 2, gpa: 8.8 },
        { semester: 3, gpa: 8.5 }, { semester: 4, gpa: 8.9 },
    ];

    const announcements = [
        { id: 1, title: "Mid-term exams schedule released", date: "Oct 28, 2025" },
        { id: 2, title: "Guest lecture on AI Ethics", date: "Nov 05, 2025" },
        { id: 3, title: "SIH Hackathon Internal Round Results", date: "Oct 25, 2025" },
    ];


    return (
        // RENDER ONLY THE PAGE CONTENT
        <div className="p-6 space-y-6">

            {/* --- Overview Section --- */}
            <section id="overview">
                <h2 className="text-2xl font-semibold text-text-main mb-4">Overview</h2>

                {/* KPI Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in-up">
                    <KPIBox title="Overall GPA" value={kpis?.gpa?.toFixed(2) ?? 'N/A'} icon={<AcademicCapIcon />} delay={0} />
                    <KPIBox title="Attendance" value={`${kpis?.attendance?.toFixed(1) ?? 'N/A'}%`} icon={<CheckCircleIcon />} delay={100} />
                    <KPIBox title="Credits Earned" value={kpis?.credits_earned ?? 'N/A'} icon={<BookOpenIcon />} delay={200} />
                </div>

                {/* Performance Graph & Announcements */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ChartCard title="Recent Academic Performance">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                                    <XAxis dataKey="semester" label={{ value: 'Semester', position: 'insideBottom', offset: -5, fill: '#6b7280' }} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line type="monotone" dataKey="gpa" name="GPA" stroke="#06b6d4" strokeWidth={2} activeDot={{ r: 6 }} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartCard>
                        <div className="text-right mt-2">
                            <Link to="/dashboard/student/academics" className="text-xs font-medium text-primary-600 hover:text-primary-800 hover:underline">
                                View Full Academic Performance &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Announcements Card */}
                    <div className="bg-light-card p-4 rounded-lg shadow-md animate-fade-in-up flex flex-col" style={{ animationDelay: '100ms' }}>
                        <h3 className="text-lg font-semibold text-text-main mb-3 flex items-center">
                            <MegaphoneIcon className="w-5 h-5 mr-2 text-primary-600" /> Announcements
                        </h3>
                        <div className="flex-1 space-y-3 overflow-y-auto max-h-80 pr-2">
                            {announcements.length > 0 ? (
                                announcements.map(ann => (
                                    <div key={ann.id} className="text-sm border-b border-gray-100 pb-2 last:border-b-0">
                                        <p className="font-medium text-text-main truncate">{ann.title}</p>
                                        <p className="text-xs text-text-secondary">{ann.date}</p>
                                    </div>
                                ))
                            ) : (<p className="text-sm text-text-secondary">No recent announcements.</p>)}
                        </div>
                        <div className="text-right mt-3 pt-2 border-t border-gray-100">
                            <Link to="/dashboard/student/announcements" className="text-xs font-medium text-primary-600 hover:text-primary-800 hover:underline">
                                View All &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schemes Section */}
            <section id="schemes-overview" className="mt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-xl font-semibold text-text-main mb-3">Relevant Schemes</h2>
                <div className="bg-light-card p-4 rounded-lg shadow-md">
                    {schemes.length > 0 ? (
                        <ul className="space-y-2 list-disc list-inside text-sm">
                            {schemes.slice(0, 3).map(scheme => (
                                <li key={scheme.id} className="text-text-secondary">
                                    <span className="font-medium text-text-main">{scheme.name}:</span> {scheme.description?.substring(0, 80) ?? 'No description'}...
                                </li>
                            ))}
                        </ul>
                    ) : (<p className="text-sm text-text-secondary">No relevant schemes found.</p>)}
                    <div className="text-right mt-3">
                        <Link to="/dashboard/student/schemes" className="text-xs font-medium text-primary-600 hover:text-primary-800 hover:underline">
                            View All Schemes &rarr;
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardStudent;