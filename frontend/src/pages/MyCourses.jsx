import React from 'react';
import { Link } from 'react-router-dom';
import ChartCard from '../components/common/ChartCard';
import KPIBox from '../components/common/KPIBox';
import { BookOpenIcon, ClockIcon, AcademicCapIcon, CheckIcon, UserIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK COURSE DATA ---
const mockCourseEnrollments = [
    {
        id: 1,
        title: "Introduction to Data Structures (B.Tech)",
        progress: 85,
        status: "In Progress",
        instructor: "Dr. Priya Sharma",
        last_accessed: "Yesterday",
        kpi_gpa: 8.5,
        icon: <ClockIcon className="w-6 h-6 text-primary-600" />,
        course_link: "/dashboard/student/courses/1" // Example dynamic link
    },
    {
        id: 2,
        title: "Artificial Intelligence & Machine Learning",
        progress: 40,
        status: "In Progress",
        instructor: "Prof. R. Kumar",
        last_accessed: "2 days ago",
        kpi_gpa: 7.2,
        icon: <AcademicCapIcon className="w-6 h-6 text-primary-600" />,
        course_link: "/dashboard/student/courses/2"
    },
    {
        id: 3,
        title: "Engineering Mathematics IV (Completed)",
        progress: 100,
        status: "Completed",
        instructor: "Mrs. S. Devi",
        last_accessed: "Last Month",
        kpi_gpa: 9.1,
        icon: <CheckIcon className="w-6 h-6 text-accent-green" />,
        course_link: "/dashboard/student/courses/3"
    },
    {
        id: 4,
        title: "Environmental Studies",
        progress: 10,
        status: "Pending",
        instructor: "Dr. A. Singh",
        last_accessed: "Never",
        kpi_gpa: 'N/A',
        icon: <BookOpenIcon className="w-6 h-6 text-primary-600" />,
        course_link: "/dashboard/student/courses/4"
    },
];

// Mock data for the subject GPA chart
const mockSubjectGpa = [
    { subject: 'DS', gpa: 8.5 },
    { subject: 'AIML', gpa: 7.2 },
    { subject: 'Math', gpa: 9.1 },
    { subject: 'EVS', gpa: 6.8 },
];
// --- END MOCK DATA ---

const CourseProgressBar = ({ progress }) => {
    const isCompleted = progress === 100;
    // Use named colors defined in tailwind.config.js
    const color = isCompleted ? 'bg-accent-green' : (progress > 50 ? 'bg-primary-500' : 'bg-accent-yellow');
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full transition-all duration-500 ${color}`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

const CourseCard = ({ course }) => {
    return (
        <div className="bg-light-card p-4 rounded-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 animate-fade-in-up">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-3 bg-primary-50 rounded-full">
                    {course.icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-main mb-1">{course.title}</h3>
                    <p className="text-xs text-text-secondary flex items-center">
                        <UserIcon className="w-3 h-3 mr-1" /> {course.instructor}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <p className={`text-xs font-medium ${course.status === 'Completed' ? 'text-accent-green' : 'text-primary-600'} mb-1`}>
                    {course.status} ({course.progress}%)
                </p>
                <CourseProgressBar progress={course.progress} />
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-text-secondary">Last Accessed: {course.last_accessed}</div>
                {/* --- REMOVED "Go to Course" LINK --- 
                 <Link
                    to={course.course_link}
                    className="text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline"
                 >
                    Go to Course &rarr;
                 </Link>
                 --- END REMOVAL --- */}
            </div>
        </div>
    );
};


const MyCourses = () => {
    // Note: Data is entirely mocked/local for this page until a course API is implemented

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-main mb-4">My Courses</h2>

            {/* Current Enrollment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                <KPIBox title="Active Courses" value={mockCourseEnrollments.filter(c => c.status !== 'Completed').length} icon={<BookOpenIcon />} delay={0} />
                <KPIBox title="Completed Courses" value={mockCourseEnrollments.filter(c => c.status === 'Completed').length} icon={<CheckIcon />} delay={100} />
                <KPIBox title="Highest GPA" value="9.10" icon={<AcademicCapIcon />} delay={200} />
            </div>

            {/* Courses List */}
            <section id="enrollments">
                <h3 className="text-xl font-semibold text-text-main mb-4 mt-6">Current Enrollment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    {mockCourseEnrollments.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </section>

            {/* Academic Performance Review (Can reuse a chart component) */}
            <section id="performance-review">
                <h3 className="text-xl font-semibold text-text-main mb-4 mt-6">Subject Performance</h3>
                <ChartCard title="Subject Wise GPA (Current Semester)">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockSubjectGpa} margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDashArray="3 3" vertical={false} strokeOpacity={0.3} />
                            <XAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip wrapperStyle={{ fontSize: '12px', backgroundColor: '#fff', border: '1px solid #ccc' }} />
                            <Bar dataKey="gpa" fill="#06b6d4" barSize={30} radius={[4, 4, 0, 0]} /> {/* Teal color */}
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </section>

        </div>
    );
};

export default MyCourses;