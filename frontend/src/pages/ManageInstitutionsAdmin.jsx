import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Removed DashboardLayout and Sidebar imports
import { adminAPI } from '../api/adminAPI';
import DataTable from '../components/common/DataTable';
import AddInstitutionModal from '../components/common/AddInstitutionModal';
// Removed icon imports for sidebar

// --- Remove Sidebar Link Definitions ---
// const adminLinks = [ ... ];
// const bottomLinks = [ ... ];

const ManageInstitutionsAdmin = () => {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchInstitutions = async () => {
            setLoading(true);
            setError('');
            try {
                const instRes = await adminAPI.getInstitutions();
                setInstitutions(instRes.data);
            } catch (err) {
                console.error("Failed to fetch institutions", err);
                setError('Failed to load institutions list.');
            }
            setLoading(false);
        };
        fetchInstitutions();
    }, []);

    // --- Modal Handlers ---
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleAddInstitution = async (institutionData) => {
        try {
            await adminAPI.addInstitution(institutionData);
            setIsModalOpen(false);
            const instRes = await adminAPI.getInstitutions();
            setInstitutions(instRes.data);
            alert('Institution added successfully!');
        } catch (err) {
            console.error("Failed to add institution", err);
            alert(`Error adding institution: ${err.response?.data?.msg || err.message}`);
        }
    };
    // --- End Modal Handlers ---

    // --- Define renderCell function ---
    const renderInstitutionCell = (row, key, value) => {
        if (key === 'name') {
            return (
                <Link to={`/admin/institution/${row.id}`} className="text-primary-600 hover:text-primary-800 hover:underline font-medium">
                    {value}
                </Link>
            );
        }
        return value;
    };
    // --- End renderCell ---

    // Removed sidebarProfile definition

    // Note: Loading and Error JSX are now rendered inside the main div
    return (
        // --- REMOVED DashboardLayout Wrapper ---
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-main mb-4">Manage Institutions</h2>

            {loading && <p className="text-center text-text-secondary">Loading institutions...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="bg-light-card p-4 rounded-lg shadow-md">
                    <div className="mb-4 text-right">
                        <button onClick={handleOpenModal} className="px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700">
                            Add New Institution
                        </button>
                    </div>
                    <DataTable
                        title="All Institutions"
                        columns={['ID', 'Name', 'Type', 'State']}
                        data={institutions.map(i => ({ id: i.id, name: i.name, type: i.type, state: i.state }))}
                        renderCell={renderInstitutionCell}
                    />
                </div>
            )}

            {/* Render the Modal */}
            <AddInstitutionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleAddInstitution}
            />
        </div>
        // --- END Removed DashboardLayout Wrapper ---
    );
};

export default ManageInstitutionsAdmin;