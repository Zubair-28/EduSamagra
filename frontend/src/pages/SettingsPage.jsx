import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CogIcon, ShieldCheckIcon, LockClosedIcon, UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-main">Account Details</h3>
                        <p className="text-sm text-text-secondary">This section allows you to view and update your personal information, course, and institution details.</p>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-4 mb-3">
                                <UserCircleIcon className="w-12 h-12 text-primary-500" />
                                <div>
                                    <p className="font-semibold text-text-main">Zubair</p>
                                    <p className="text-sm text-text-secondary">B.Tech, National Institute of Technology</p>
                                </div>
                            </div>
                            <Link to="#edit-profile" className="px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700">Edit Profile</Link>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-main">Security & Access</h3>
                        <p className="text-sm text-text-secondary">Manage your password and active sessions.</p>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-text-main">Change Password</p>
                                <p className="text-xs text-text-secondary">It is recommended to update your password every 6 months.</p>
                            </div>
                            <button className="px-4 py-2 text-sm bg-accent-yellow text-white rounded-md hover:bg-accent-yellow/90">Reset</button>
                        </div>
                    </div>
                );
            case 'sessions':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-main">Active Sessions</h3>
                        <p className="text-sm text-text-secondary">Logout from all other devices.</p>

                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex justify-between items-center">
                            <p className="font-medium text-red-700">Desktop (Current Session)</p>
                            <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">Logout All</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-main mb-6 flex items-center">
                <CogIcon className="w-6 h-6 mr-3 text-primary-600" />
                Settings
            </h2>

            <div className="bg-light-card rounded-lg shadow-md flex">
                {/* Sidebar Navigation (Tabs) */}
                <div className="w-64 p-4 border-r border-gray-200 flex-shrink-0">
                    <h3 className="font-bold text-text-main mb-4">Navigation</h3>
                    <nav className="space-y-2">
                        {[
                            { id: 'profile', name: 'Profile & Info', icon: UserCircleIcon },
                            { id: 'security', name: 'Security', icon: ShieldCheckIcon },
                            { id: 'sessions', name: 'Active Sessions', icon: LockClosedIcon },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-150 ${activeTab === item.id ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-text-secondary hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;