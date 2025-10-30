import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { SparklesIcon, CheckCircleIcon, CurrencyRupeeIcon, DocumentTextIcon } from '@heroicons/react/24/outline'; // Icons for scheme types

// --- Scheme Card Component ---
const SchemeCard = ({ scheme }) => {
    // Determine status color (mock logic)
    // FIX: Safely access status
    const status = scheme.status || 'inactive';
    const statusColor = status === 'active' ? 'bg-accent-green' : 'bg-accent-yellow';

    return (
        <div className="bg-light-card p-6 rounded-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-primary-100 rounded-full flex-shrink-0">
                    <CurrencyRupeeIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-text-main leading-tight">{scheme.name}</h3>
                    <p className="text-xs text-text-secondary mt-1">Status:
                        <span className={`ml-1 px-2 py-0.5 text-xs font-medium text-white rounded-full ${statusColor}`}>
                            {status.toUpperCase()}
                        </span>
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-main mb-4 flex-1">
                {scheme.description || "No detailed description available."}
            </p>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
                <p className="text-xs text-text-secondary flex items-center">
                    <DocumentTextIcon className="w-4 h-4 mr-1" /> Document Link
                </p>
                <button
                    onClick={() => alert(`Applying for ${scheme.name}...`)}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent-green rounded-md hover:bg-accent-green/90 transition-colors duration-200"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

// --- Main Schemes Page ---
const SchemesPage = ({ dashboardData }) => {
    const [loading, setLoading] = useState(true);
    const [schemes, setSchemes] = useState([]);
    const [error, setError] = useState('');

    // Fetch schemes data from API (or use the data passed from MainLayout)
    useEffect(() => {
        // Fetch all student dashboard data, which includes schemes
        const fetchSchemes = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axiosInstance.get('/student/dashboard');
                setSchemes(response.data.schemes);
            } catch (err) {
                setError("Could not retrieve full scheme list.");
            }
            setLoading(false);
        };
        fetchSchemes();
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-xl text-text-secondary">Loading Schemes...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-main mb-4 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-3 text-primary-600" />
                Government Schemes & Financial Aid
            </h2>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                {schemes.length > 0 ? (
                    schemes.map(scheme => (
                        <SchemeCard key={scheme.id} scheme={scheme} />
                    ))
                ) : (
                    <div className="lg:col-span-3 text-center text-text-secondary p-10 border-dashed border-2 border-gray-300 rounded-lg bg-gray-50">
                        <p className="text-lg">No active schemes found for your profile.</p>
                        <p className="text-sm mt-2">Check back later or contact your institution's welfare office.</p>
                    </div>
                )}
            </div>

            {/* Placeholder for Eligibility/Document Checker */}
            <div className="mt-8 bg-primary-50 p-6 rounded-lg border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold text-primary-700">Eligibility Checker (AI Mock)</h3>
                <p className="text-sm text-text-secondary mt-2">
                    Use this tool to see which schemes you qualify for.
                </p>
                <button className="mt-3 px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700">Check Eligibility</button>
            </div>
        </div>
    );
};

export default SchemesPage;