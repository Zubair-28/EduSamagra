import React from 'react'; // Removed useEffect, useState
// Removed DashboardLayout and TeachersSideBar imports
import ChartCard from '../components/common/ChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Removed link/icon imports as they are handled by MainLayout

// Component now receives dashboardData as a prop
const DashboardTeacher = ({ dashboardData }) => {
    // --- Data Preparation (Using Data from MainLayout) ---
    const { profile, kpis, students = [], charts } = dashboardData || {};

    // Check if data is still loading (passed as empty object)
    if (!profile) {
        return <div className="p-6 text-center text-xl text-text-secondary">Loading Teacher data...</div>;
    }

    // Mock data for the attendance chart (This is what determines the bar colors/names)
    const attendanceChartData = [
        { name: 'Music', Attendance: 25 }, { name: 'Dance', Attendance: 33 },
        { name: 'Keyboard', Attendance: 42 }, { name: 'Violin', Attendance: 26 },
    ];

    // Use data?.students safely
    const studentAttendanceData = students.slice(0, 4).map(s => ({
        name: s.name,
        percentage: s.attendance || 90.0, // Use 90 as fallback
        count: `${Math.round(((s.attendance || 90) / 100) * 28)} of 28`
    })) || [
            { name: 'Rohan Kumar', percentage: 90.00, count: '25 of 28' },
            { name: 'Zubair (Example 1)', percentage: 95.00, count: '27 of 28' },
        ];
    // --- END DATA ---

    return (
        // --- RENDER ONLY THE PAGE CONTENT ---
        <div className="p-6 space-y-6">
            <div className="bg-light-card p-4 rounded-lg shadow-md animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-text-main">Attendance Overview</h3>
                    <select className="text-sm border rounded p-1.5 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 text-text-main">
                        <option>This Month</option> <option>Last Month</option> <option>This Year</option>
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

            <div className="bg-light-card p-4 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h3 className="text-lg font-semibold text-text-main mb-4">Today's Attendance</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Student Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Percentage</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Present/Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-light-card divide-y divide-gray-200">
                            {studentAttendanceData.map((student, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-text-main">{student.name}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-text-secondary">{typeof student.percentage === 'number' ? `${student.percentage.toFixed(1)}%` : 'N/A'}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-text-secondary">{student.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-light-card p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-text-main mb-4">My Timetable</h3>
                    <div className="text-center text-text-secondary p-10 border-dashed border-2 border-gray-300 rounded-lg">
                        Timetable display/edit placeholder.
                        <button className="mt-4 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700">Add/Edit Timetable</button>
                    </div>
                </div>
                <div className="bg-light-card p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-text-main mb-4">My Qualifications</h3>
                    <div className="text-center text-text-secondary p-10 border-dashed border-2 border-gray-300 rounded-lg">
                        Qualifications list placeholder.
                        <button className="mt-4 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700">Upload PDF Certificate</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTeacher;