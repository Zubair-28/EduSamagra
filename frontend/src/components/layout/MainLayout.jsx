import React, { useEffect, useState, cloneElement } from 'react';
import DashboardLayout from './DashboardLayout';
import Sidebar from './Sidebar';
import StudentSideBar from './StudentSideBar';
import TeachersSideBar from './TeachersSideBar';
import axiosInstance from '../../api/axiosInstance';
// Import Icons needed for links
import {
    HomeIcon, ChartBarIcon, UserIcon, BookOpenIcon, ClockIcon, SparklesIcon, CogIcon, // Student
    CheckBadgeIcon, DocumentTextIcon, // Teacher
    BuildingOfficeIcon, AcademicCapIcon, UserGroupIcon, // Admin/Institution
    UsersIcon, BanknotesIcon // Added Banknotes and Users for Admin KPI
} from '@heroicons/react/24/outline';


// --- Sidebar Links Definition ---
const studentLinks = [
    { name: 'Overview', path: '/dashboard/student', icon: <HomeIcon /> },
    { name: 'Academic Performance', path: '/dashboard/student/academics', icon: <ChartBarIcon /> },
    { name: 'My Portfolio', path: '/dashboard/student/portfolio', icon: <UserIcon /> },
    { name: 'Courses', path: '/dashboard/student/courses', icon: <BookOpenIcon /> },
    { name: 'Time Table', path: '/dashboard/student/timetable', icon: <ClockIcon /> },
    { name: 'Schemes', path: '/dashboard/student/schemes', icon: <SparklesIcon /> },
];
const studentBottomLinks = [{ name: 'Setting', path: '/dashboard/student/settings', icon: <CogIcon /> }];

const teacherLinks = [
    { name: 'Dashboard', path: '/dashboard/teacher', icon: <HomeIcon /> },
    { name: 'Attendance', path: '/dashboard/teacher/attendance', icon: <CheckBadgeIcon /> },
    { name: 'Timetable', path: '#', icon: <ClockIcon /> },
    { name: 'Student list', path: '#', icon: <UserGroupIcon /> },
    { name: 'My Qualifications', path: '#', icon: <DocumentTextIcon /> },
];
const teacherBottomLinks = [{ name: 'Setting', path: '#', icon: <CogIcon /> }];

const adminLinks = [
    { name: 'Overview', path: '/dashboard/admin', icon: <HomeIcon /> },
    { name: 'Manage Institutions', path: '/admin/manage-institutions', icon: <BuildingOfficeIcon /> },
];
const adminBottomLinks = [{ name: 'System Settings', path: '#', icon: <CogIcon /> }];

const institutionLinks = [
    { name: 'Dashboard', path: '/dashboard/institution', icon: <HomeIcon /> },
    { name: 'Manage Faculty', path: '#faculty', icon: <AcademicCapIcon /> },
    { name: 'Manage Students', path: '#students', icon: <UserGroupIcon /> },
];
const institutionBottomLinks = [{ name: 'Settings', path: '#', icon: <CogIcon /> }];


// --- Default Profiles ---
const defaultProfiles = {
    student: { name: "Student", avatar: null, details: "Course", institution: "Institution" },
    teacher: { name: "Teacher", avatar: null, details: "Subject", institution: "Institution" },
    admin: { name: "Admin", avatar: null, details: "System Admin", institution: "Nationwide" },
    institution: { name: "Inst. Admin", avatar: null, details: "Administrator", institution: "Institution" },
    default: { name: "User", avatar: null, details: "...", institution: "..." }
};

const prepareSidebarProfile = (profileData, defaultProfile) => ({
    name: profileData?.name || defaultProfile.name,
    avatar: profileData?.avatar || defaultProfile.avatar,
    details: profileData?.course || profileData?.subject || defaultProfile.details,
    institution: profileData?.institution || defaultProfile.institution
});


const MainLayout = ({ children, expectedRole }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [layoutConfig, setLayoutConfig] = useState({
        links: [],
        bottomLinks: [],
        SidebarComponent: Sidebar,
    });

    useEffect(() => {
        // 1. Set sidebar/links config based on role
        let links, bottomLinks, SidebarComponent;

        switch (expectedRole) {
            case 'student':
                links = studentLinks; bottomLinks = studentBottomLinks; SidebarComponent = StudentSideBar;
                break;
            case 'teacher':
                links = teacherLinks; bottomLinks = teacherBottomLinks; SidebarComponent = TeachersSideBar;
                break;
            case 'admin':
                links = adminLinks; bottomLinks = adminBottomLinks; SidebarComponent = Sidebar;
                break;
            case 'institution':
                links = institutionLinks; bottomLinks = institutionBottomLinks; SidebarComponent = Sidebar;
                break;
            default:
                links = []; bottomLinks = []; SidebarComponent = Sidebar;
        }
        setLayoutConfig({ links, bottomLinks, SidebarComponent });


        // 2. Fetch data for this dashboard
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                let apiPath = '';

                // --- FIX: Determine the correct API path based on role ---
                if (expectedRole === 'admin') {
                    apiPath = '/admin/overview'; // CORRECT Admin Overview Path
                } else if (expectedRole === 'institution') {
                    apiPath = '/institution/overview'; // CORRECT Institution Overview Path
                } else {
                    apiPath = `/${expectedRole}/dashboard`; // Student/Teacher
                }

                // Fetch data
                const response = await axiosInstance.get(apiPath);
                setDashboardData(response.data);

            } catch (err) {
                console.error(`Failed to fetch ${expectedRole} data from API: ${err.message}`, err);
                // The error message is now more generic for the frontend display
                setError(`Failed to load ${expectedRole} dashboard data. Please check if your backend is running.`);
            }
            setLoading(false);
        };

        if (expectedRole) {
            fetchData();
        } else {
            setLoading(false);
            setError("No role provided to layout.");
        }
    }, [expectedRole]);

    // Get the correct default profile for the current role
    const defaultProfile = defaultProfiles[expectedRole] || defaultProfiles.default;

    // Prepare the actual profile data (if loaded) or use default
    const profile = prepareSidebarProfile(dashboardData?.profile, defaultProfile);
    const userName = dashboardData?.profile?.name || defaultProfile.name;

    // Render loading state
    if (loading) {
        return (
            <DashboardLayout
                role={expectedRole} links={layoutConfig.links} bottomLinks={layoutConfig.bottomLinks}
                userName="Loading..." profile={defaultProfile} SidebarComponent={layoutConfig.SidebarComponent}
            >
                <div className="p-6 text-center text-xl text-text-secondary">Loading...</div>
            </DashboardLayout>
        );
    }

    // Render error state
    if (error) {
        return (
            <DashboardLayout
                role={expectedRole} links={layoutConfig.links} bottomLinks={layoutConfig.bottomLinks}
                userName="Error" profile={defaultProfile} SidebarComponent={layoutConfig.SidebarComponent}
            >
                <div className="p-6 text-center text-xl text-red-500">{error}</div>
            </DashboardLayout>
        );
    }

    // Render content
    return (
        <DashboardLayout
            role={expectedRole}
            links={layoutConfig.links}
            bottomLinks={layoutConfig.bottomLinks}
            userName={userName} // Pass REAL user name
            profile={profile} // Pass REAL profile data
            SidebarComponent={layoutConfig.SidebarComponent}
        >
            {/* Pass the fetched data down to the actual page component */}
            {React.isValidElement(children) ? cloneElement(children, { dashboardData: dashboardData || {} }) : children}
        </DashboardLayout>
    );
};

export default MainLayout;