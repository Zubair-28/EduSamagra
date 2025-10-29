import React from 'react';
import Navbar from './Navbar';
// REMOVE import Sidebar from './Sidebar'; // Do not import the default here

// Accept SidebarComponent prop
const DashboardLayout = ({ children, role, links, bottomLinks, userName, profile, SidebarComponent }) => {

    return (
        <div className="flex h-screen bg-light-bg"> {/* Light bg only */}

            {/* --- FIX: Only render the SidebarComponent if it is provided --- */}
            {SidebarComponent && (
                <SidebarComponent
                    role={role}
                    links={links}
                    bottomLinks={bottomLinks}
                    profile={profile} // Pass profile data
                />
            )}
            {/* --- END FIX --- */}

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar role={role} userName={userName} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light-bg">
                    {/* Padding for general content area */}
                    <div className="container mx-auto max-w-7xl p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;