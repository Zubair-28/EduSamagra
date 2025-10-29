// frontend/src/components/layout/TeachersSideBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // For default avatar

// Accept 'profile', 'links', and 'bottomLinks' props
const TeachersSideBar = ({ profile, links, bottomLinks }) => {

    // Configuration matching the darker sidebar in Image 2
    const config = {
        color: 'text-white', // Text color for brand
        bg: 'hover:bg-primary-700', // Hover background for links
        active: 'bg-primary-600 text-white font-semibold', // Active link background and text
        borderColor: 'border-primary-800', // Border color for separators
        profileTextColor: 'text-white',
        profileSubTextColor: 'text-blue-200', // Lighter text for sub details
    };

    const linkClass = ({ isActive }) =>
        `flex items-center px-4 py-2.5 mx-2 mt-1 text-gray-200 ${config.bg} transition-colors duration-200 rounded-md ` +
        (isActive ? config.active : 'hover:text-white');

    return (
        // Darker background for the sidebar
        <div className="hidden md:flex flex-col w-64 bg-primary-900 dark:bg-primary-900 shadow-lg border-r border-primary-800">
            {/* Profile Section */}
            <div className={`flex flex-col items-center p-4 border-b ${config.borderColor}`}>
                <div className="w-20 h-20 rounded-full bg-primary-700 mb-3 overflow-hidden border-2 border-primary-600">
                    {profile?.avatar ? (
                        <img src={profile.avatar} alt={profile?.name || 'Profile'} className="w-full h-full object-cover" />
                    ) : (
                        <UserCircleIcon className="w-full h-full text-primary-500" /> // Use primary color for icon
                    )}
                </div>
                <h3 className={`font-semibold text-lg ${config.profileTextColor} text-center`}>{profile?.name || 'Teacher Name'}</h3>
                <p className={`text-xs ${config.profileSubTextColor} text-center mt-1`}>{profile?.details || 'Subject / Department'}</p>
                {/* Removed institution name for cleaner look, can be added back if needed */}
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 mt-4 px-2">
                {links && links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        end
                        className={linkClass}
                    >
                        {React.isValidElement(link.icon) ? React.cloneElement(link.icon, { className: 'w-5 h-5 mr-3' }) : null}
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Navigation */}
            {bottomLinks && bottomLinks.length > 0 && (
                <div className={`mb-4 px-2 border-t pt-4 ${config.borderColor}`}>
                    {bottomLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end
                            className={linkClass}
                        >
                            {React.isValidElement(link.icon) ? React.cloneElement(link.icon, { className: 'w-5 h-5 mr-3' }) : null}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeachersSideBar;