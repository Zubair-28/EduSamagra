// frontend/src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ role, links, bottomLinks, profile }) => {

    // Config for the light theme with TEAL/CYAN accents
    const config = {
        bgColor: 'bg-white',
        textColor: 'text-text-secondary',
        hoverBg: 'hover:bg-primary-50',
        hoverText: 'hover:text-primary-600',
        activeBg: 'bg-primary-100',
        activeText: 'text-primary-700 font-semibold',
        borderColor: 'border-gray-200',
        profileTextColor: 'text-text-main',
        profileSubTextColor: 'text-text-secondary',
        brandColor: 'text-primary-600'
    };

    const linkClass = ({ isActive }) =>
        `flex items-center px-4 py-2.5 mx-2 mt-1 text-sm rounded-lg ${config.textColor} ${config.hoverBg} ${config.hoverText} transition-colors duration-150 ` +
        (isActive ? `${config.activeBg} ${config.activeText}` : '');

    return (
        <div className={`hidden md:flex flex-col w-64 ${config.bgColor} shadow-md border-r ${config.borderColor}`}>

            {/* --- FIX: Conditionally render Profile Section --- */}
            {(role === 'student' || role === 'teacher') && (
                <div className={`flex flex-col items-center p-4 pt-6 border-b ${config.borderColor}`}>
                    <div className={`w-20 h-20 rounded-full bg-gray-100 mb-3 overflow-hidden border-2 border-primary-200`}>
                        {profile?.avatar ? (
                            <img src={profile.avatar} alt={profile?.name || 'Profile'} className="w-full h-full object-cover" />
                        ) : (
                            <UserCircleIcon className="w-full h-full text-gray-400" />
                        )}
                    </div>
                    <h3 className={`font-semibold text-base ${config.profileTextColor} text-center`}>{profile?.name || 'User Name'}</h3>
                    <p className={`text-xs ${config.profileSubTextColor} text-center mt-1 max-w-full truncate`}>{profile?.details || 'Details...'}</p>
                    <p className={`text-xs ${config.profileSubTextColor} text-center max-w-full truncate`}>{profile?.institution || 'Institution...'}</p>
                </div>
            )}
            {/* --- END FIX --- */}

            {/* Optional: Add a simple Logo/Title for Admin/Institution */}
            {!(role === 'student' || role === 'teacher') && (
                <div className={`flex items-center justify-center h-20 border-b ${config.borderColor}`}>
                    <h1 className={`text-2xl font-bold ${config.brandColor}`}>EduSamagra</h1>
                    {/* Or display the role */}
                    {/* <span className="text-lg font-semibold text-text-main capitalize">{role} Panel</span> */}
                </div>
            )}


            {/* Main Navigation */}
            {/* Adjust margin-top if profile section is hidden */}
            <nav className={`flex-1 px-2 ${(role === 'student' || role === 'teacher') ? 'mt-4' : 'mt-6'}`}>
                {links && links.map((link) => (
                    <NavLink key={link.name} to={link.path} end className={linkClass}>
                        {React.isValidElement(link.icon) ? React.cloneElement(link.icon, { className: 'w-5 h-5 mr-3 flex-shrink-0' }) : null}
                        <span className="truncate">{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Navigation */}
            {bottomLinks && bottomLinks.length > 0 && (
                <div className={`mb-4 px-2 border-t pt-4 ${config.borderColor}`}>
                    {bottomLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} end className={linkClass}>
                            {React.isValidElement(link.icon) ? React.cloneElement(link.icon, { className: 'w-5 h-5 mr-3 flex-shrink-0' }) : null}
                            <span className="truncate">{link.name}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sidebar;