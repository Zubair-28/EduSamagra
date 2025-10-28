import React from 'react';
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // Using outline version

const Navbar = ({ role, userName }) => {
    return (
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-dark-card shadow-sm border-b dark:border-slate-700">
            <div className="flex items-center">
                {/* The 'Welcome, Zeba!' part for teacher is now inside DashboardTeacher content,
            so Navbar keeps generic greeting or can be removed if not needed for student */}
                <span className="text-xl font-semibold text-gray-800 dark:text-white">Hello, {userName || 'User'}!</span>
            </div>

            <div className="flex items-center space-x-4">
                {/* Search bar */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                {/* Notification Icon */}
                <button className="relative p-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        3
                    </span>
                </button>

                {/* User Profile - Now much simpler, just an icon or initial */}
                <div className="flex items-center space-x-2">
                    <div className="h-9 w-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-lg">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    {/* User ID / Role - Can be moved or kept minimal */}
                    {/* <span className="text-gray-700 dark:text-gray-200 text-sm">User ID: 00023</span> */}
                </div>
            </div>
        </header>
    );
};

export default Navbar;