import React, { useState, useEffect, useRef } from 'react'; // Added useState, useEffect, useRef
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { BellIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '../../api/authAPI';

const Navbar = ({ role, userName }) => {
    const navigate = useNavigate();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // State for dropdown
    const notificationRef = useRef(null); // Ref to detect clicks outside

    // --- Mock Notifications ---
    const notifications = [
        { id: 1, text: "New Government Scheme 'Digital Scholar' added.", time: "2 hours ago", link: "/dashboard/student/schemes" },
        { id: 2, text: "Your attendance dropped below 75%.", time: "1 day ago", link: "#attendance" }, // Placeholder links
        { id: 3, text: "Upcoming Event: AI Ethics Lecture on Nov 5th.", time: "3 days ago", link: "#events" },
        { id: 4, text: "Reminder: Assignment due tomorrow.", time: "1 day ago", link: "#assignments" },
    ];
    // --- End Mock ---

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Toggle notification dropdown
    const handleNotifications = () => {
        setIsNotificationsOpen(prev => !prev);
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };
        // Add event listener when dropdown is open
        if (isNotificationsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        // Cleanup listener on component unmount or when dropdown closes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationsOpen]);


    return (
        <header className="flex items-center justify-between h-16 px-6 bg-light-card shadow-sm border-b border-gray-200">
            <div className="flex items-center">
                <span className="text-lg font-semibold text-text-main">Hello, {userName || 'User'}!</span>
            </div>

            <div className="flex items-center space-x-4">
                {/* Notification Icon & Dropdown - Added relative positioning */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={handleNotifications}
                        className="relative p-1 text-text-secondary hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-full"
                        title="Notifications"
                    >
                        <BellIcon className="h-6 w-6" />
                        {/* Notification Count Badge */}
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {notifications.length > 0 ? notifications.length : '0'} {/* Dynamic count */}
                        </span>
                    </button>

                    {/* --- Notification Dropdown Panel --- */}
                    {isNotificationsOpen && (
                        <div
                            className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 animate-fade-in-up"
                            style={{ animationDuration: '0.2s' }} // Faster fade
                        >
                            <div className="py-2 px-4 border-b border-gray-200">
                                <h4 className="text-sm font-semibold text-text-main">Notifications</h4>
                            </div>
                            <div className="max-h-60 overflow-y-auto"> {/* Scrollable area */}
                                {notifications.length > 0 ? (
                                    notifications.map(notif => (
                                        <Link
                                            key={notif.id}
                                            to={notif.link} // Use notification-specific link
                                            onClick={() => setIsNotificationsOpen(false)} // Close on click
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                        >
                                            <p className="font-medium truncate">{notif.text}</p>
                                            <p className="text-xs text-gray-500">{notif.time}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="p-4 text-sm text-text-secondary">No new notifications.</p>
                                )}
                            </div>
                            <div className="py-2 px-4 border-t border-gray-200 text-center">
                                {/* Link to Notification History Page */}
                                <Link
                                    to="/notifications/history" // Define this route in App.js
                                    onClick={() => setIsNotificationsOpen(false)} // Close on click
                                    className="text-xs font-medium text-primary-600 hover:text-primary-800 hover:underline"
                                >
                                    History
                                </Link>
                            </div>
                        </div>
                    )}
                    {/* --- End Notification Dropdown --- */}
                </div> {/* End relative container */}

                {/* User Profile Icon */}
                <div className="flex items-center space-x-2">
                    <div className="h-9 w-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-sm">
                        {userName ? userName.charAt(0).toUpperCase() : '?'}
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="p-2 text-text-secondary rounded-lg hover:bg-gray-100 focus:outline-none"
                    title="Logout"
                >
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;