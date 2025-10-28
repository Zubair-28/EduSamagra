// Admin Dashboard
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { dashboardAPI } from '../api/dashboardAPI';
import { adminAPI } from '../api/adminAPI';
import KPIBox from '../components/common/KPIBox';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import { HomeIcon, UserGroupIcon, BuildingOfficeIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const adminLinks = [
    { name: 'Overview', path: '/dashboard/admin', icon: <HomeIcon /> },
    { name: 'Manage Users', path: '#', icon: <UserGroupIcon /> },
    { name: 'Manage Institutions', path: '#', icon: <BuildingOfficeIcon /> },
    { name: 'System Settings', path: '#', icon: <CogIcon /> },
];

const DashboardAdmin = () => {
    const [data, setData] = useState(null);
    const [users, setUsers] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [overviewRes, usersRes, instRes] = await Promise.all([
                    dashboardAPI.getDashboardData('admin'),
                    adminAPI.getUsers(),
                    adminAPI.getInstitutions()
                ]);
                setData(overviewRes.data);
                setUsers(usersRes.data);
                setInstitutions(instRes.data);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <DashboardLayout role="admin" links={adminLinks}>
                <div className="text-center text-xl">Loading System Admin Dashboard...</div>
            </DashboardLayout>
        );
    }

    if (!data) {
        return (
            <DashboardLayout role="admin" links={adminLinks}>
                <div className="text-center text-xl text-red-500">Failed to load data.</div>
            </DashboardLayout>
        );
    }

    const { kpis, charts } = data;

    return (
        <DashboardLayout role="admin" links={adminLinks}>
            <h2 className="text-3xl font-semibold mb-6 dark:text-white">
                System Admin Panel 🧑‍💼
            </h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <KPIBox title="Total Institutions" value={kpis.total_institutions} icon={<BuildingOfficeIcon />} theme="admin" />
                <KPIBox title="Total Users" value={kpis.total_users} icon={<UserGroupIcon />} theme="admin" />
                <KPIBox title="Total Students" value={kpis.total_students} icon={<UserGroupIcon />} theme="admin" />
                <KPIBox title="Total Teachers" value={kpis.total_teachers} icon={<UserGroupIcon />} theme="admin" />
            </div>

            <div className="grid grid-cols-1 gap-6">
                <ChartCard title="Nationwide Enrolment Trend (Mock)">
                    <LineChart data={charts.enrolment_trend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="students" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                </ChartCard>

                <DataTable
                    title="User Management"
                    columns={['ID', 'Email', 'Role', 'Institution']}
                    data={users.map(u => ({
                        id: u.id,
                        email: u.email,
                        role: u.role,
                        institution: u.institution || 'N/A'
                    }))}
                />

                <DataTable
                    title="Institution Management"
                    columns={['ID', 'Name', 'Type', 'State']}
                    data={institutions.map(i => ({
                        id: i.id,
                        name: i.name,
                        type: i.type,
                        state: i.state
                    }))}
                />
            </div>
        </DashboardLayout>
    );
};

export default DashboardAdmin;