import React, { useState, useEffect } from 'react';
import { AcademicCapIcon, UserGroupIcon, CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../api/axiosInstance';
import KPIBox from '../components/common/KPIBox';

// Mock list of students (for initial development before connecting to full API list)
const mockStudents = [
    { id: 1, name: "Rohan Kumar", course: "B.Tech CSE", status: "Present" },
    { id: 2, name: "Zubair", course: "B.Tech ME", status: "Present" },
    { id: 3, name: "Manisha K.", course: "B.Tech ECE", status: "Absent" },
    { id: 4, name: "Pujitha R.", course: "B.Tech EE", status: "Late" },
    { id: 5, name: "Shreya S.", course: "B.Tech CSE", status: "Present" },
    { id: 6, name: "David V.", course: "B.Tech IT", status: "Present" },
];

const AttendancePage = () => {
    const [students, setStudents] = useState(mockStudents); // State for attendance list
    const [selectedClass, setSelectedClass] = useState('B.Tech CSE - Sem 4');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10)); // YYYY-MM-DD
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // Mock KPI Data
    const totalStudents = students.length;
    const presentCount = students.filter(s => s.status === 'Present').length;
    const absentCount = students.filter(s => s.status === 'Absent').length;

    // Handler to change a student's status
    const handleStatusChange = (id, newStatus) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === id ? { ...student, status: newStatus } : student
            )
        );
    };

    // Handler to submit attendance (MOCK API CALL)
    const handleSubmitAttendance = async () => {
        setIsSaving(true);
        setMessage(null);

        // Structure data for API (e.g., send list of [{id: 1, status: 'Present'}, ...])
        const attendanceRecords = students.map(({ id, status }) => ({ student_id: id, status }));

        try {
            // In a real application, this sends data to Flask/SQLAlchemy
            // const response = await axiosInstance.post('/teacher/mark_attendance', { date: selectedDate, class: selectedClass, records: attendanceRecords });

            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
            setMessage({ type: 'success', text: `Attendance for ${selectedClass} on ${selectedDate} saved successfully!` });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save attendance. Please try again.' });
            console.error("Attendance submission failed:", error);
        }
        setIsSaving(false);
    };


    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-main mb-4 flex items-center">
                <CheckCircleIcon className="w-6 h-6 mr-3 text-primary-600" />
                Mark Daily Attendance
            </h2>

            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                <KPIBox title="Total Students" value={totalStudents} icon={<AcademicCapIcon />} delay={0} />
                <KPIBox title="Present Today" value={presentCount} icon={<CheckCircleIcon />} delay={100} />
                <KPIBox title="Absent Today" value={absentCount} icon={<UserGroupIcon />} delay={200} />
            </div>

            {/* Attendance Controls */}
            <div className="bg-light-card p-4 rounded-lg shadow-md flex justify-between items-center space-x-4">
                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-text-main">Class:</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                    >
                        <option>B.Tech CSE - Sem 4</option>
                        <option>B.Tech ECE - Sem 4</option>
                    </select>

                    <label className="text-sm font-medium text-text-main">Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                        max={new Date().toISOString().substring(0, 10)}
                    />
                </div>

                <button
                    onClick={handleSubmitAttendance}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
                >
                    {isSaving ? 'SAVING...' : 'SAVE ATTENDANCE'}
                </button>
            </div>

            {/* Message Alert */}
            {message && (
                <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                    {message.text}
                </div>
            )}

            {/* Attendance Marking Table */}
            <div className="bg-light-card p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-text-main mb-4">Student List ({students.length})</h3>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Student Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Course</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase w-1/3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {students.map(student => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-main">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{student.course}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center space-x-2">
                                        {['Present', 'Absent', 'Late'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusChange(student.id, status)}
                                                className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${student.status === status
                                                        ? status === 'Present' ? 'bg-accent-green text-white' : status === 'Absent' ? 'bg-accent-red text-white' : 'bg-accent-yellow text-white'
                                                        : 'bg-gray-200 text-text-secondary hover:bg-gray-300'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendancePage;