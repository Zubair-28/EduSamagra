// frontend/src/components/common/UserProfileCard.jsx
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // Solid version for profile avatar

const UserProfileCard = ({ profile, income }) => {
    return (
        <div className="flex flex-col items-center py-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full bg-primary-200 dark:bg-primary-700 flex items-center justify-center overflow-hidden mb-4 border-2 border-primary-500">
                {/* Replace with actual profile image if profile.avatar exists */}
                {profile?.avatar ? (
                    <img src={profile.avatar} alt={profile?.name} className="w-full h-full object-cover" />
                ) : (
                    <UserCircleIcon className="w-20 h-20 text-primary-500 dark:text-primary-300" />
                )}
            </div>

            {/* Name and Role */}
            <h2 className="text-xl font-semibold dark:text-white mb-1">{profile?.name || 'User Name'}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Teacher ID: {profile?.id || '00000'}</p>

            {/* This Week Income */}
            <div className="bg-primary-100 dark:bg-primary-800 p-4 rounded-lg w-full text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">THIS WEEK INCOME</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1">
                    ${income ? income.toLocaleString() : '0'}
                </p>
            </div>

            {/* Placeholder for small chart/progress bar if needed in the future */}
        </div>
    );
};

export default UserProfileCard;