import React from 'react';
import { NavLink } from 'react-router-dom'; // Removed useNavigate import
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/solid';

const StudentSideBar = ({ role, links, bottomLinks, profile }) => {
    // Removed the useNavigate hook: const navigate = useNavigate();

    // Config for the light theme
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
    };

    const linkClass = ({ isActive }) =>
        `flex items-center px-4 py-2.5 mx-2 mt-1 text-sm rounded-lg ${config.textColor} ${config.hoverBg} ${config.hoverText} transition-colors duration-150 ` +
        (isActive ? `${config.activeBg} ${config.activeText}` : '');

    // Placeholder Edit Handler (no longer uses navigate)
    const handleEditProfile = () => {
        alert('Edit Profile button clicked! (Implement navigation later)');
    };

    return (
        <div className={`hidden md:flex flex-col w-64 ${config.bgColor} shadow-md border-r ${config.borderColor}`}>
            {/* Profile Section */}
            <div className={`relative flex flex-col items-center p-4 pt-6 border-b ${config.borderColor}`}>
                {/* Profile Image */}
                <div className={`w-20 h-20 rounded-full bg-gray-100 mb-3 overflow-hidden border-2 border-primary-200`}>
                    {profile?.avatar ? (<img src={profile.avatar} alt={profile?.name || 'Profile'} className="w-full h-full object-cover" />) : (<UserCircleIcon className="w-full h-full text-gray-400" />)}
                </div>
                {/* Profile Text */}
                <h3 className={`font-semibold text-base ${config.profileTextColor} text-center`}>{profile?.name || 'User Name'}</h3>
                <p className={`text-xs ${config.profileSubTextColor} text-center mt-1 max-w-full truncate`}>{profile?.details || 'Details...'}</p>
                <p className={`text-xs ${config.profileSubTextColor} text-center max-w-full truncate`}>{profile?.institution || 'Institution...'}</p>

                {/* Edit Button */}
                <button
                    onClick={handleEditProfile}
                    className={`absolute top-2 right-2 p-1.5 rounded-full hover:bg-primary-100 text-text-secondary hover:text-primary-700 transition-colors duration-150`}
                    title="Edit Profile"
                >
                    <PencilIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Main Navigation */}
            <nav className={`flex-1 mt-4 px-2`}>
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

export default StudentSideBar;