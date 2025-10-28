import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role, links, bottomLinks }) => {

    // Adjusted config to match the darker, more vibrant sidebar in Image 2
    const config = {
        color: 'text-white', // Text color for brand
        bg: 'hover:bg-primary-700', // Hover background for links
        active: 'bg-primary-600 text-white font-semibold' // Active link background and text
    };

    const linkClass = ({ isActive }) =>
        `flex items-center px-6 py-3 mt-1 text-gray-200 ${config.bg} transition-colors duration-200 rounded-md mx-2 ` +
        (isActive ? config.active : 'hover:text-white');

    return (
        // Darker background for the sidebar to match Image 2
        <div className="hidden md:flex flex-col w-64 bg-primary-900 dark:bg-primary-900 shadow-lg border-r border-primary-800">
            <div className="flex items-center justify-center h-20 border-b border-primary-800">
                <h1 className={`text-3xl font-bold ${config.color}`}>
                    EduSamagra
                </h1>
            </div>
            {/* Main Navigation */}
            <nav className="flex-1 mt-6 px-2">
                {links && links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        end
                        className={linkClass}
                    >
                        {React.isValidElement(link.icon) ? React.cloneElement(link.icon, { className: 'w-6 h-6' }) : null}
                        <span className="mx-4">{link.name}</span>
                    </NavLink>
                ))}
            </nav>
            {/* Bottom Navigation */}
            {bottomLinks && bottomLinks.length > 0 && (
                <div className="mb-6 px-2 border-t pt-4 border-primary-800">
                    {bottomLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end
                            className={linkClass}
                        >
                            {React.isValidElement(link.icon) ? React.cloneElement(link.icon, { className: 'w-6 h-6' }) : null}
                            <span className="mx-4">{link.name}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sidebar;