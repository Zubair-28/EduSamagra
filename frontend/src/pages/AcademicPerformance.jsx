import React from 'react';
import ChartCard from '../components/common/ChartCard';
import KPIBox from '../components/common/KPIBox';
import DataTable from '../components/common/DataTable';
import { AcademicCapIcon, CheckCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// This component receives dashboardData as a prop from MainLayout
const AcademicPerformance = ({ dashboardData }) => {

    // Use the prop, and provide fallbacks
    const { profile, kpis, charts } = dashboardData || {};

    // Show loading text if data hasn't arrived
    if (!profile) {
        return <div className="p-6 text-center text-xl text-text-secondary">Loading academic data...</div>;
    }

    // Get all performance data (not just sliced)
    const performanceData = charts?.gpa_trend || [
        { semester: 1, gpa: 8.2, attendance: 90 },
        { semester: 2, gpa: 8.8, attendance: 85 },
        { semester: 3, gpa: 8.5, attendance: 75 },
    ]; // Use full data or mock

    // Data for the table
    const tableData = performanceData.map(item => ({
        semester: `Semester ${item.semester}`,
        gpa: item.gpa?.toFixed(2) || 'N/A',
        attendance: `${item.attendance?.toFixed(1) || 'N/A'}%` // This relies on the backend fix
    }));

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <h2 className="text-2xl font-semibold text-text-main mb-4">Full Academic Performance</h2>

            {/* Summary KPI Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in-up">
                <KPIBox
                    title="Overall GPA"
                    value={kpis?.gpa?.toFixed(2) ?? 'N/A'}
                    icon={<AcademicCapIcon />}
                    delay={0}
                />
                <KPIBox
                    title="Overall Attendance"
                    value={`${kpis?.attendance?.toFixed(1) ?? 'N/A'}%`}
                    icon={<CheckCircleIcon />}
                    delay={100}
                />
                <KPIBox
                    title="Total Credits Earned"
                    value={kpis?.credits_earned ?? 'N/A'}
                    icon={<BookOpenIcon />}
                    delay={200}
                />
            </div>

            {/* Full Performance Trend Chart */}
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <ChartCard title="Full Performance Trend (All Semesters)">
                    <ResponsiveContainer width="100%" height={350}> {/* Made it taller */}
                        <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                            <XAxis
                                dataKey="semester"
                                label={{ value: 'Semester', position: 'insideBottom', offset: -5, fill: '#6b7280' }}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <YAxis
                                domain={[0, 10]} // GPA scale
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} />
                            <Line
                                type="monotone"
                                dataKey="gpa"
                                name="GPA"
                                stroke="#06b6d4" // Teal color
                                strokeWidth={2}
                                activeDot={{ r: 6 }}
                            />
                            {/* This line will appear once the backend is updated */}
                            <Line
                                type="monotone"
                                dataKey="attendance"
                                name="Attendance (%)"
                                yAxisId="attendance" // Use a separate Y-axis
                                stroke="#8b5cf6" // A purple color
                                strokeWidth={2}
                                activeDot={{ r: 6 }}
                                dot={false}
                            />
                            {/* Define the second Y-axis for attendance */}
                            <YAxis
                                yAxisId="attendance"
                                orientation="right"
                                domain={[0, 100]} // Attendance scale
                                tick={{ fill: '#8b5cf6', fontSize: 12 }}
                                axisLine={{ stroke: '#8b5cf6' }}
                                tickLine={{ stroke: '#8b5cf6' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Detailed Grades Table */}
            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <DataTable
                    title="Semester-wise Details"
                    columns={['Semester', 'GPA', 'Attendance']}
                    data={tableData}
                />
            </div>
        </div>
    );
};

export default AcademicPerformance;