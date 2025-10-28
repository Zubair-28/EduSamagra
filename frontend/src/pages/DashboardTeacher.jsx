import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { dashboardAPI } from '../api/dashboardAPI';

// HeroIcons
import {
    HomeIcon, UserGroupIcon, CalendarDaysIcon, ChartBarIcon, DocumentTextIcon, CogIcon,
    Bars3Icon, XMarkIcon, BellIcon, MagnifyingGlassIcon, ArrowLeftOnRectangleIcon, AcademicCapIcon,
    EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, CubeTransparentIcon
} from '@heroicons/react/24/outline';

// --- FIX: Add Recharts imports ---
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
// --- END FIX ---

// Component imports
import ChartCard from '../components/common/ChartCard';
// --- FIX: Ensure this path is correct based on your file location ---
import UserProfileCard from '../components/common/UserProfileCard';
// --- END FIX ---
import ActivityFeedCard from '../components/common/ActivityFeedCard';
import SimpleCalendarCard from '../components/common/SimpleCalendarCard';

// --- Sidebar Links ---
const teacherLinks = [
    { name: 'Dashboard', path: '/dashboard/teacher', icon: <HomeIcon /> },
    { name: 'Calendar', path: '#', icon: <CalendarDaysIcon /> },
    { name: 'Inbox', path: '#', icon: <EnvelopeIcon /> },
    { name: 'Widget', path: '#', icon: <CubeTransparentIcon /> },
    { name: 'Tasks', path: '#', icon: <CheckCircleIcon /> },
    { name: 'Profile', path: '#', icon: <UserGroupIcon /> },
    { name: 'Write Post', path: '#', icon: <DocumentTextIcon /> },
    { name: 'Pages', path: '#', icon: <Bars3Icon /> },
    { name: 'Chart', path: '#', icon: <ChartBarIcon /> },
    { name: 'Social App', path: '#', icon: <ChatBubbleLeftRightIcon /> },
];

const bottomLinks = [
    { name: 'Global Setting', path: '#', icon: <CogIcon /> },
];
// --- END Sidebar Links ---

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

    // --- MOCK DATA FOR NEW DESIGN ---
    const kpiData = {
        totalStudents: data?.kpis?.total_students || 4,
        classAverageGpa: data?.kpis?.average_gpa || 3.25,
        classAvgAttendance: data?.kpis?.average_attendance || 92.5,
        thisWeekIncome: data?.kpis?.weekly_income || 1250,
    };

    const recentOrdersData = [
        { client: 'Mr. John', orderNumber: '123979', date: '11-07-18', status: 'completed' },
        { client: 'Mr. Daniel', orderNumber: '123979', date: '11-07-18', status: 'pending' },
        { client: 'Mr. David', orderNumber: '123979', date: '11-07-18', status: 'in progress' },
        { client: 'Mr. Tony', orderNumber: '123979', date: '11-07-18', status: 'declined' },
        { client: 'Mr. Mark', orderNumber: '123979', date: '11-07-18', status: 'completed' },
    ];

    const recentCommentsData = [
        { user: 'Mark Hamilton', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor...' },
        { user: 'Thomas Gold', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor...' },
        { user: 'Jessica Smith', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor...' },
    ];

    const contactListData = [
        { name: 'Andrew Bennet', avatar: null, status: 'online' }, // Using null for avatar placeholder
        { name: 'Jessica Smith', avatar: null, status: 'offline' },
        { name: 'David Lee', avatar: null, status: 'online' },
    ];

    const salesChartData = [
        { name: 'Week 1', sales: 65, uv: 50 },
        { name: 'Week 2', sales: 59, uv: 40 },
        { name: 'Week 3', sales: 80, uv: 85 },
        { name: 'Week 4', sales: 81, uv: 70 },
        { name: 'Week 5', sales: 56, uv: 60 },
        { name: 'Week 6', sales: 55, uv: 75 },
        { name: 'Week 7', sales: 40, uv: 30 },
    ];
    // --- END MOCK DATA ---

    if (loading) {
        return (
            <DashboardLayout role="teacher" links={teacherLinks} bottomLinks={bottomLinks} userName="Loading...">
                <div className="p-6 text-center text-xl">Loading Teacher Dashboard...</div>
            </DashboardLayout>
        );
    }

    if (!data) {
        return (
            <DashboardLayout role="teacher" links={teacherLinks} bottomLinks={bottomLinks} userName="Error">
                <div className="p-6 text-center text-xl text-red-500">Failed to load data. Please try logging in again.</div>
            </DashboardLayout>
        );
    }

    const { profile } = data;

    return (
        <DashboardLayout role="teacher" links={teacherLinks} bottomLinks={bottomLinks} userName={profile?.name}>
            <div className="flex w-full"> {/* Outer flex container */}
                {/* Left Profile/Summary Section */}
                <div className="w-1/4 min-w-[280px] p-6 bg-white dark:bg-dark-card rounded-l-xl shadow-lg border-r dark:border-slate-700">
                    <UserProfileCard profile={profile} income={kpiData.thisWeekIncome} />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 space-y-6">
                    {/* Top Row: Chart and Calendar */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard title="This Week Income">
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={salesChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="flex justify-around mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>Item #1 (50)</span>
                                <span>Item #2 (30)</span>
                                <span>Item #3 (72)</span>
                            </div>
                        </ChartCard>
                        <SimpleCalendarCard />
                    </div>

                    {/* Middle Row: Recent Orders and Comments */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ActivityFeedCard title="Recent Orders" items={recentOrdersData} type="orders" />
                        <ActivityFeedCard title="Recent Comments" items={recentCommentsData} type="comments" />
                    </div>

                    {/* Bottom Row: Contact List */}
                    <div className="w-full">
                        <ActivityFeedCard title="Contact List" items={contactListData} type="contacts" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardTeacher;