import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import ChartCard from '../components/common/ChartCard';
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// --- MOCK API RESPONSE STRUCTURE ---
// Using the typical database structure for Timetable entries
const mockTimetable = [
    { class_name: 'B.Tech CSE - Sem 4', subject: 'Data Structures', teacher: 'Dr. Sharma', day_of_week: 'Monday', start_time: '10:00:00', end_time: '11:00:00' },
    { class_name: 'B.Tech CSE - Sem 4', subject: 'AI/ML', teacher: 'Prof. Kumar', day_of_week: 'Monday', start_time: '11:00:00', end_time: '12:00:00' },
    { class_name: 'B.Tech CSE - Sem 4', subject: 'Operating Systems', teacher: 'Mr. Singh', day_of_week: 'Tuesday', start_time: '14:00:00', end_time: '15:30:00' },
    { class_name: 'B.Tech CSE - Sem 4', subject: 'Data Structures', teacher: 'Dr. Sharma', day_of_week: 'Wednesday', start_time: '10:00:00', end_time: '11:00:00' },
    { class_name: 'B.Tech CSE - Sem 4', subject: 'Computer Networks', teacher: 'Ms. Gupta', day_of_week: 'Thursday', start_time: '09:00:00', end_time: '10:00:00' },
    { class_name: 'B.Tech CSE - Sem 4', subject: 'Lab Session', teacher: 'Mr. Ali', day_of_week: 'Friday', start_time: '13:00:00', end_time: '15:00:00' },
];

// Helper to structure data by day
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const groupTimetable = (data) => {
    const grouped = {};
    days.forEach(day => { grouped[day] = []; });

    (data || mockTimetable).forEach(item => {
        if (grouped[item.day_of_week]) {
            // Simple string comparison for sorting by time
            grouped[item.day_of_week].push(item);
        }
    });
    // Sort classes by start time
    Object.keys(grouped).forEach(day => {
        grouped[day].sort((a, b) => a.start_time.localeCompare(b.start_time));
    });

    return grouped;
};

// Determine the longest day to set table height/rows
const getMaxClasses = (groupedSchedule) => {
    return Math.max(...Object.values(groupedSchedule).map(day => day.length), 4); // Min rows = 4
};


const TimeTablePage = () => {
    const [timetableData, setTimetableData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [groupedSchedule, setGroupedSchedule] = useState(groupTimetable(null)); // Initialize with mock structure

    // Function to fetch timetable data
    useEffect(() => {
        const fetchTimetable = async () => {
            setLoading(true);
            setError('');
            try {
                // In a production scenario, you would fetch the timetable here.
                // const response = await axiosInstance.get('/student/timetable');
                // setTimetableData(response.data.timetable);

                // --- MOCK FETCH DELAY ---
                await new Promise(resolve => setTimeout(resolve, 800));

                setTimetableData(mockTimetable); // Use mock data
                setGroupedSchedule(groupTimetable(mockTimetable));
                // --- END MOCK FETCH ---

            } catch (err) {
                console.error("Failed to fetch timetable", err);
                setError('Failed to load timetable data.');
            }
            setLoading(false);
        };
        fetchTimetable();
    }, []);

    const maxRows = getMaxClasses(groupedSchedule);

    if (loading) {
        return <div className="p-6 text-center text-xl text-text-secondary">Loading Timetable...</div>;
    }

    if (error || !timetableData) {
        return (
            <div className="p-6 text-center text-xl text-red-500">
                {error || 'Timetable is currently unavailable.'}
                <Link to="/dashboard/student" className="text-primary-600 hover:underline mt-4 inline-block">&larr; Back to Dashboard</Link>
            </div>
        );
    }

    // Determine current day for highlighting
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-main mb-4 flex items-center">
                <ClockIcon className="w-6 h-6 mr-3 text-primary-600" />
                Weekly Class Schedule
            </h2>

            <div className="bg-light-card p-4 rounded-lg shadow-md animate-fade-in-up">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-primary-50"> {/* Light blue header */}
                            <tr>
                                {/* Day headers */}
                                {days.map(day => (
                                    <th
                                        key={day}
                                        scope="col"
                                        className={`px-4 py-3 text-center text-sm font-bold text-primary-700 uppercase tracking-wider border-x border-gray-200 ${day === currentDay ? 'bg-primary-100/50' : ''}`}
                                    >
                                        {day}
                                        {day === currentDay && (
                                            <span className="block text-xs font-semibold text-accent-green">(Today)</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-light-card divide-x divide-y divide-gray-200">
                            {[...Array(maxRows)].map((_, timeSlotIndex) => (
                                <tr key={timeSlotIndex}>
                                    {days.map(day => {
                                        const classes = groupedSchedule[day] || [];
                                        const currentClass = classes[timeSlotIndex];
                                        const isCurrentDay = day === currentDay;

                                        return (
                                            <td
                                                key={day}
                                                className={`p-3 align-top border-r border-gray-200 transition-colors duration-100 ${isCurrentDay ? 'bg-primary-50' : 'bg-white'} ${currentClass ? 'hover:shadow-inner' : ''}`}
                                                style={{ minWidth: '150px', height: '80px' }}
                                            >
                                                {currentClass ? (
                                                    <div className="flex flex-col border-l-4 border-primary-500 pl-2">
                                                        <p className="text-sm font-bold text-text-main leading-tight">{currentClass.subject}</p>
                                                        <p className="text-xs text-primary-700 mt-1 font-medium">
                                                            {currentClass.start_time.substring(0, 5)} - {currentClass.end_time.substring(0, 5)}
                                                        </p>
                                                        <p className="text-xs text-text-secondary mt-1">
                                                            {currentClass.teacher}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400">---</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Time Table Legend/Notes */}
            <div className="mt-6">
                <p className="text-sm text-text-secondary">
                    Note: This is your student timetable view for the current semester. Changes will be reflected here.
                </p>
                <Link to="#full-calendar" className="text-sm font-medium text-primary-600 hover:underline mt-2 inline-block">
                    View Full Yearly Academic Calendar &rarr;
                </Link>
            </div>
        </div>
    );
};

export default TimeTablePage;