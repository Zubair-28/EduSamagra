import React, { useState } from 'react';

const AddInstitutionModal = ({ isOpen, onClose, onSubmit }) => {
    // State to hold form data
    const [name, setName] = useState('');
    const [type, setType] = useState('University'); // Default type
    const [state, setState] = useState('');
    const [district, setDistrict] = useState(''); // Added District as per schema
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        if (!name || !type || !state || !district) {
            setError('All fields are required.');
            return;
        }
        // Call the onSubmit function passed from the parent
        onSubmit({ name, type, state, district });
    };

    // Close modal if clicked outside the content area
    const handleBackdropClick = (e) => {
        if (e.target.id === 'modal-backdrop') {
            onClose();
        }
    };

    if (!isOpen) return null; // Don't render if not open

    return (
        // Backdrop
        <div
            id="modal-backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4 animate-fade-in-up"
            style={{ animationDuration: '0.3s' }} // Faster animation
        >
            {/* Modal Content */}
            <div className="bg-light-card rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-text-main">Add New Institution</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        {/* Error Message */}
                        {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>}

                        {/* Form Fields - Using divs for better layout */}
                        <div>
                            <label htmlFor="inst-name" className="block text-sm font-medium text-text-secondary mb-1">Institution Name</label>
                            <input
                                type="text"
                                id="inst-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="inst-type" className="block text-sm font-medium text-text-secondary mb-1">Type</label>
                            <select
                                id="inst-type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm bg-white"
                                required
                            >
                                <option value="University">University</option>
                                <option value="College">College</option>
                                <option value="School">School</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="inst-state" className="block text-sm font-medium text-text-secondary mb-1">State</label>
                            <input
                                type="text"
                                id="inst-state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                                placeholder="e.g., Telangana"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="inst-district" className="block text-sm font-medium text-text-secondary mb-1">District</label>
                            <input
                                type="text"
                                id="inst-district"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                                placeholder="e.g., Hyderabad"
                                required
                            />
                        </div>

                    </div>
                    {/* Footer with Buttons */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-text-secondary bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        >
                            Add Institution
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInstitutionModal;