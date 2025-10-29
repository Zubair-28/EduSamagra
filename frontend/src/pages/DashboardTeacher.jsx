import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import TeachersSideBar from '../components/layout/TeachersSideBar'; // Import the TEACHER sidebar
import { dashboardAPI } from '../api/dashboardAPI';

// HeroIcons - Required for the sidebar links
import { HomeIcon, UserGroupIcon, CheckBadgeIcon, ClockIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/24/outline';
// Recharts Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Component Imports
import ChartCard from '../components/common/ChartCard';
// UserProfileCard data is passed to TeachersSideBar

// --- Sidebar Links based on your requirements ---
const teacherLinks = [
    { name: 'Dashboard', path: '/dashboard/teacher', icon: <HomeIcon /> },
    { name: 'Attendance', path: '#', icon: <CheckBadgeIcon /> },
    { name: 'Timetable', path: '#', icon: <ClockIcon /> },
    { name: 'Student list', path: '#', icon: <UserGroupIcon /> },
    { name: 'My Qualifications', path: '#', icon: <DocumentTextIcon /> },
];

const bottomLinks = [
    { name: 'Setting', path: '#', icon: <CogIcon /> },
];
// --- END Links ---

const DashboardTeacher = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardAPI.getDashboardData('teacher');
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch teacher data", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // --- MOCK/API DATA FOR THE LIGHT THEME DESIGN ---
    const attendanceChartData = [
        { name: 'Music', Attendance: 25, Other: 18 },
        { name: 'Dance', Attendance: 33, Other: 12 },
        { name: 'Keyboard', Attendance: 42, Other: 22 },
        { name: 'Violin', Attendance: 26, Other: 20 },
    ];

    const studentAttendanceData = data?.students?.slice(0, 4).map(s => ({
        name: s.name,
        percentage: s.attendance || Math.floor(Math.random() * 11) + 90,
        count: `${Math.round(((s.attendance || 90) / 100) * 28)} of 28`
    })) || [
            { name: 'Rohan Kumar', percentage: 90.00, count: '25 of 28' },
            { name: 'Zubair (Example 1)', percentage: 95.00, count: '27 of 28' },
            { name: 'Sajida (Example 2)', percentage: 88.00, count: '25 of 28' },
            { name: 'Student Four', percentage: 92.00, count: '26 of 28' },
        ];
    // --- END DATA ---

    // Define profile objects within the component render logic after checking loading/error
    const prepareSidebarProfile = (profileData, institutionName) => ({
        name: profileData?.name || "User Name",
        avatar: null, // Replace with profileData?.avatarUrl when available
        details: profileData?.subject || "Subject/Dept Placeholder",
        institution: institutionName || "Institution Placeholder"
    });

    if (loading) {
        const loadingProfile = prepareSidebarProfile(); // Get default loading profile
        return (
            <DashboardLayout
                role="teacher"
                links={teacherLinks}
                bottomLinks={bottomLinks}
                userName="Loading..."
                profile={loadingProfile} // Pass profile data for sidebar
                SidebarComponent={TeachersSideBar} // Specify Teacher sidebar
            >
                <div className="p-6 text-center text-xl">Loading Teacher Dashboard...</div>
            </DashboardLayout>
        );
    }

    if (!data) {
        const errorProfile = prepareSidebarProfile(); // Get default error profile
        return (
            <DashboardLayout
                role="teacher"
                links={teacherLinks}
                bottomLinks={bottomLinks}
                userName="Error"
                profile={errorProfile} // Pass profile data for sidebar
                SidebarComponent={TeachersSideBar} // Specify Teacher sidebar
            >
                <div className="p-6 text-center text-xl text-red-500">Failed to load data. Please try logging in again.</div>
            </DashboardLayout>
        );
    }

    // If data loaded successfully:
    const { profile } = data;
    // Prepare profile data for sidebar from actual API data
    const sidebarProfile = prepareSidebarProfile(profile, data?.institution?.name);

    return (
        <DashboardLayout
            role="teacher"
            links={teacherLinks}
            bottomLinks={bottomLinks}
            userName={profile?.name} // For Navbar
            profile={sidebarProfile}  // For Sidebar
            SidebarComponent={TeachersSideBar} // Specify Teacher sidebar
        >
            {/* Main Content Area - Light theme layout */}
            <div className="p-6 space-y-6"> {/* Padding provided by DashboardLayout */}

                {/* Top Row: Attendance Chart (Larger) */}
                <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-md animate-fade-in-up">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-text-main dark:text-text-main-dark">Attendance Overview</h3>
                        <select className="text-sm border rounded p-1.5 bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-1 focus:ring-primary-500 text-text-main dark:text-text-main-dark">
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceChartData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
                                <Tooltip wrapperStyle={{ fontSize: '12px', backgroundColor: '#fff', border: '1px solid #ccc' }} />
                                <Bar dataKey="Attendance" fill="#2563eb" barSize={20} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bottom Row: Today's Attendance Table (Students) */}
                <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-lg font-semibold text-text-main dark:text-text-main-dark mb-4">Today's Attendance</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                            <thead className="bg-gray-50 dark:bg-slate-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
                                        Student Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
                                        Percentage
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
                                        Present/Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-light-card dark:bg-dark-card divide-y divide-gray-200 dark:divide-slate-700">
                                {studentAttendanceData.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-text-main dark:text-text-main-dark">
                                            {student.name}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-text-secondary dark:text-text-secondary-dark">
                                            {student.percentage.toFixed(1)}%
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-text-secondary dark:text-text-secondary-dark">
                                            {student.count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Placeholder Sections for Timetable and Qualifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-text-main dark:text-text-main-dark mb-4">My Timetable</h3>
                        <div className="text-center text-text-secondary dark:text-text-secondary-dark p-10 border-dashed border-2 border-gray-300 dark:border-slate-600 rounded-lg">
                            Timetable display/edit placeholder.
                            <button className="mt-4 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700">Add/Edit Timetable</button>
                        </div>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-text-main dark:text-text-main-dark mb-4">My Qualifications</h3>
                        <div className="text-center text-text-secondary dark:text-text-secondary-dark p-10 border-dashed border-2 border-gray-300 dark:border-slate-600 rounded-lg">
                            Qualifications list placeholder.
                            <button className="mt-4 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700">Upload PDF Certificate</button>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default DashboardTeacher;