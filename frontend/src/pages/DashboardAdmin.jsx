import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import DashboardLayout from '../components/layout/DashboardLayout';
import Sidebar from '../components/layout/Sidebar'; // Using the default sidebar
import axiosInstance from '../api/axiosInstance';
import KPIBox from '../components/common/KPIBox';
import ChartCard from '../components/common/ChartCard';
import {
    HomeIcon, UserGroupIcon, BuildingOfficeIcon, CogIcon, ChartBarIcon,
    UsersIcon, BanknotesIcon, AcademicCapIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- Indian States List (Needed for dropdown) ---
const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// --- Mock Data for Initial City View (Needed for chart) ---
const initialCityData = [
    { state: "Delhi", institutions: 150 }, { state: "Mumbai", institutions: 120 },
    { state: "Bangalore", institutions: 180 }, { state: "Chennai", institutions: 110 },
    { state: "Hyderabad", institutions: 130 },
];

// --- Mock Key Institutions List ---
const keyInstitutions = [
    { id: 101, name: "Indian Institute of Technology Bombay (IITB)" },
    { id: 102, name: "Indian Institute of Technology Delhi (IITD)" },
    { id: 103, name: "National Institute of Technology Warangal (NITW)" },
    { id: 104, name: "National Institute of Technology Tiruchirappalli (NITT)" },
    { id: 105, name: "Indian Institute of Science (IISc) Bangalore" },
    { id: 106, name: "Indian Institute of Technology Madras (IITM)" },
];
// --- End Mock List ---

// --- Sidebar Links for Admin ---
const adminLinks = [
    { name: 'Overview', path: '/dashboard/admin', icon: <HomeIcon /> },
    { name: 'Manage Institutions', path: '/admin/manage-institutions', icon: <BuildingOfficeIcon /> },
];
const bottomLinks = [
    { name: 'System Settings', path: '#', icon: <CogIcon /> }, // Placeholder path
];
// --- END Links ---

const DashboardAdmin = () => {
    const [overviewData, setOverviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedStateView, setSelectedStateView] = useState('keyCities'); // State for dropdown

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const overviewRes = await axiosInstance.get('/admin/overview');
                setOverviewData(overviewRes.data);
            } catch (err) {
                console.error("Failed to fetch admin overview data", err);
                setError('Failed to load overview data.');
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Memoize chart data based on selection
    const institutionsChartData = useMemo(() => {
        const allStateData = overviewData?.charts?.state_heatmap || [];
        if (selectedStateView === 'keyCities') return initialCityData;
        // Removed 'all' option for simplicity, can be added back if needed
        const filteredData = allStateData.filter(item => item.state === selectedStateView);
        return filteredData.length > 0 ? filteredData : [{ state: selectedStateView, institutions: 0 }];
    }, [selectedStateView, overviewData]);

    const sidebarProfile = { name: "Admin User", avatar: null, details: "System Administrator", institution: "Nationwide" };

    // Loading State
    if (loading) {
        return (
            <DashboardLayout role="admin" links={adminLinks} bottomLinks={bottomLinks} userName="Admin" profile={sidebarProfile} SidebarComponent={Sidebar}>
                <div className="p-6 text-center text-xl text-text-secondary">Loading Admin Overview...</div>
            </DashboardLayout>
        );
    }

    // Error State
    if (error) { // Simplified check for error string
        return (
            <DashboardLayout role="admin" links={adminLinks} bottomLinks={bottomLinks} userName="Admin" profile={sidebarProfile} SidebarComponent={Sidebar}>
                <div className="p-6 text-center text-xl text-red-500">{error}</div>
            </DashboardLayout>
        );
    }

    // Safely destructure data after loading/error checks
    const { kpis, charts } = overviewData || {}; // Fallback to empty object

    return (
        <DashboardLayout role="admin" links={adminLinks} bottomLinks={bottomLinks} userName="Admin" profile={sidebarProfile} SidebarComponent={Sidebar}>
            <div className="p-6 space-y-8">

                {/* Section 1: Overview */}
                <section id="overview">
                    <h2 className="text-2xl font-semibold text-text-main mb-4">Platform Overview</h2>
                    {/* KPI Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <KPIBox title="Total Institutions" value={kpis?.total_institutions ?? 0} icon={<BuildingOfficeIcon />} delay={0} />
                        <KPIBox title="Total Users" value={kpis?.total_users ?? 0} icon={<UsersIcon />} delay={100} />
                        <KPIBox title="Total Students" value={kpis?.total_students ?? 0} icon={<UserGroupIcon />} delay={200} />
                        <KPIBox title="Total Teachers" value={kpis?.total_teachers ?? 0} icon={<AcademicCapIcon />} delay={300} />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <ChartCard title="Nationwide Enrolment Trend (Mock)">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={charts?.enrolment_trend || []} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip /> <Legend />
                                    <Line type="monotone" dataKey="students" stroke="#06b6d4" strokeWidth={2} activeDot={{ r: 6 }} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartCard>

                        {/* Institutions Count Chart */}
                        <ChartCard title="Institutions Count">
                            <div className="mb-4">
                                <label htmlFor="stateSelect" className="text-sm font-medium text-text-secondary mr-2">View:</label>
                                <select id="stateSelect" value={selectedStateView} onChange={(e) => setSelectedStateView(e.target.value)} className="text-sm border rounded p-1.5 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 text-text-main">
                                    <option value="keyCities">Key Cities (Default)</option>
                                    {indianStates.map(state => (<option key={state} value={state}>{state}</option>))}
                                </select>
                            </div>
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={institutionsChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                                    <XAxis dataKey="state" tick={{ fill: '#6b7280', fontSize: 10 }} interval={0} angle={institutionsChartData.length > 1 ? -30 : 0} textAnchor={institutionsChartData.length > 1 ? "end" : "middle"} height={institutionsChartData.length > 1 ? 50 : 30} />
                                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip />
                                    <Bar dataKey="institutions" fill="#22d3ee" barSize={selectedStateView === 'keyCities' ? 20 : 40} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>

                    {/* Key Institutions List Section (Below Charts) */}
                    <div className="bg-light-card p-6 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-text-main">Key Institutions</h3>
                            <Link to="/admin/manage-institutions" className="text-xs font-medium text-primary-600 hover:text-primary-800 hover:underline">
                                view all institutions &rarr;
                            </Link>
                        </div>
                        <ul className="space-y-3">
                            {keyInstitutions.slice(0, 5).map(inst => ( // Show first 5
                                <li key={inst.id} className="text-sm text-text-secondary flex items-center">
                                    <span className="flex-shrink-0 w-2 h-2 bg-primary-300 rounded-full mr-2"></span>
                                    <Link to={`/admin/institution/${inst.id}`} className="hover:text-primary-600 truncate hover:underline" title={inst.name}>
                                        {inst.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <hr className="border-gray-200" />

                {/* Section 4: System Settings */}
                <section id="settings">
                    <h2 className="text-2xl font-semibold text-text-main mb-4">System Settings</h2>
                    <div className="bg-light-card p-6 rounded-lg shadow-md">
                        <p className="text-text-secondary">System configuration options will go here...</p>
                    </div>
                </section>

            </div>
        </DashboardLayout>
    );
};

export default DashboardAdmin;