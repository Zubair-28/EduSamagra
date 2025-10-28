import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, role, links, bottomLinks, userName }) => {

    return (
        <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
            <Sidebar role={role} links={links} bottomLinks={bottomLinks} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar role={role} userName={userName} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light-bg dark:bg-dark-bg"> {/* Removed p-6 here */}
                    {/* Removed max-w-7xl and container mx-auto here */}
                    {children} {/* Children (including the new grid for teacher dashboard) will handle its own padding */}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;