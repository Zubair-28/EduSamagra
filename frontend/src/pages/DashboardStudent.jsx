import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { dashboardAPI } from '../api/dashboardAPI';
import KPIBox from '../components/common/KPIBox';
import ChartCard from '../components/common/ChartCard';
import CourseCard from '../components/common/CourseCard'; // Import the new component
import {
    HomeIcon, BookOpenIcon, AcademicCapIcon, SparklesIcon, CalendarDaysIcon, CogIcon, ArrowLeftOnRectangleIcon,
    ClipboardDocumentListIcon, LightBulbIcon // Added missing KPI icons
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; // Added ResponsiveContainer
import Navbar from '../components/layout/Navbar'; // Import Navbar
import graphicDesignImg from '../assets/graphic-design.png'; // Import image
import webDevelopmentImg from '../assets/web-development.png'; // Import image


// --- Sidebar Links ---
const studentLinks = [
    { name: 'Dashboard', path: '/dashboard/student', icon: <HomeIcon /> },
    { name: 'My Courses', path: '#', icon: <BookOpenIcon /> }, // Placeholder path
    { name: 'Grades', path: '#', icon: <AcademicCapIcon /> },  // Placeholder path
    { name: 'Schemes', path: '#', icon: <SparklesIcon /> },   // Placeholder path
    { name: 'Events', path: '#', icon: <CalendarDaysIcon /> }, // Placeholder path
];

const bottomLinks = [ // Separate array for bottom links
    { name: 'Setting', path: '#', icon: <CogIcon /> },
];
// --- END Sidebar Links ---

const DashboardStudent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardAPI.getDashboardData('student');
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch student data", error);
                // Keep loading false, let the error state handle it
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // --- MOCK DATA SECTION (Uses API data + fallbacks) ---
    // Moved inside the component function, uses 'data' state
    const kpiData = {
        enrolledCourses: data?.kpis?.credits_earned / 20 || 1,
        totalClass: 50, // Mock
        assignments: 25, // Mock
        quizzes: 10, // Mock
    };

    const newCourses = [
        { title: "Graphic Design", reviews: 12503, students: 500, price: "Rs. 5000", delay: 100, imageUrl: graphicDesignImg },
        { title: "Web Development", reviews: 20023, students: 800, price: "Rs. 6000", delay: 200, imageUrl: webDevelopmentImg },
    ];

    const courseActivityData = data?.charts?.gpa_trend?.map(item => ({
        name: `Sem ${item.semester}`,
        Hours: item.gpa * 8
    })) || [];

    const dailyActivityData = [
        { name: 'Completed', value: data?.kpis?.attendance || 80 },
        { name: 'Remaining', value: 100 - (data?.kpis?.attendance || 80) },
    ];
    const DAILY_ACTIVITY_COLORS = ['#3b82f6', '#e5e7eb'];
    // --- END MOCK DATA SECTION ---

    if (loading) {
        return (
            <DashboardLayout role="student" links={studentLinks} bottomLinks={bottomLinks}>
                {/* Navbar is rendered by DashboardLayout now */}
                <div className="p-6 text-center text-xl">Loading Student Dashboard...</div>
            </DashboardLayout>
        );
    }

    if (!data) {
        return (
            <DashboardLayout role="student" links={studentLinks} bottomLinks={bottomLinks}>
                {/* Navbar is rendered by DashboardLayout now */}
                <div className="p-6 text-center text-xl text-red-500">Failed to load data. Please try logging in again.</div>
            </DashboardLayout>
        );
    }

    // If data loaded successfully:
    const { profile } = data; // Get profile data

    return (
        // Pass profile name to DashboardLayout which will pass it to Navbar
        <DashboardLayout role="student" links={studentLinks} bottomLinks={bottomLinks} userName={profile?.name}>

            {/* --- Navbar is NO LONGER rendered here --- */}

            {/* Main Content Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Updated KPI Boxes */}
                    <KPIBox
                        title="Enrolled Courses"
                        value={kpiData.enrolledCourses}
                        icon={<BookOpenIcon />}
                        delay={0}
                    />
                    <KPIBox
                        title="Total Class"
                        value={kpiData.totalClass}
                        icon={<AcademicCapIcon />}
                        delay={100}
                    />
                    <KPIBox
                        title="Assignment"
                        value={kpiData.assignments}
                        icon={<ClipboardDocumentListIcon />}
                        delay={200}
                    />
                    <KPIBox
                        title="Quiz"
                        value={kpiData.quizzes}
                        icon={<LightBulbIcon />}
                        delay={300}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* New Course Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white animate-fade-in-up">New Course</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {newCourses.map((course, index) => (
                                <CourseCard
                                    key={index}
                                    title={course.title}
                                    reviews={course.reviews}
                                    students={course.students}
                                    price={course.price}
                                    delay={course.delay}
                                    imageUrl={course.imageUrl} // Pass the image URL
                                />
                            ))}
                        </div>
                    </div>

                    {/* Class Schedule (Placeholder) */}
                    <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-md animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <h3 className="text-xl font-semibold mb-4 dark:text-white text-center">Class schedule</h3>
                        <div className="text-center text-gray-500 p-10 border-dashed border-2 border-gray-300 dark:border-slate-600 rounded-lg">
                            Calendar Widget Placeholder
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Course Activity Chart */}
                    <div className="lg:col-span-2">
                        <ChartCard title="Course Activity (Mock - GPA Trend x8)">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={courseActivityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Hours" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>

                    {/* Daily Activity Chart */}
                    <div>
                        <ChartCard title="Daily Activity (Mock - Attendance)">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={dailyActivityData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={85}
                                        fill="#8884d8"
                                        paddingAngle={3}
                                        dataKey="value"
                                        labelLine={false}
                                    >
                                        {dailyActivityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={DAILY_ACTIVITY_COLORS[index % DAILY_ACTIVITY_COLORS.length]} stroke={index === 0 ? '#fff' : 'none'} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-primary-600 dark:fill-primary-400">
                                        {`${dailyActivityData[0].value}%`}
                                    </text>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardStudent;