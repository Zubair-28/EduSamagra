import React from 'react';
import { Link } from 'react-router-dom'; // Use Link

// --- FIX: Accept 'role' as a prop ---
const PlaceholderPage = ({ title, role }) => {

    // --- REMOVED: Deleted the broken URL-guessing logic ---
    // const pathSegments = window.location.pathname.split('/');
    // let role = 'user'; ...

    return (
        <div className="p-10 bg-light-card rounded-lg shadow m-4">
            <h1 className="text-2xl font-bold text-text-main mb-4">{title}</h1>
            <p className="text-text-secondary">This page is under construction. Content will be added soon!</p>

            {/* --- FIX: Link now uses the 'role' prop --- */}
            {/* Use 'student' as a fallback just in case */}
            <Link to={`/dashboard/${role || 'student'}`} className="text-primary-600 hover:underline mt-6 inline-block">
                &larr; Back to Dashboard
            </Link>
        </div>
    );
};

export default PlaceholderPage;