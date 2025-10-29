import React, { useState } from 'react';

const AddProjectModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!title) {
            setError('Project title is required.');
            return;
        }
        // Pass data to parent
        onSubmit({ title, description, projectLink, tags });
    };

    const handleClose = () => {
        // Reset form
        setTitle('');
        setDescription('');
        setProjectLink('');
        setTags('');
        setError('');
        onClose(); // Close modal
    };

    if (!isOpen) return null;

    return (
        // Backdrop
        <div
            id="modal-backdrop"
            onClick={(e) => { if (e.target.id === 'modal-backdrop') handleClose(); }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4 animate-fade-in-up"
            style={{ animationDuration: '0.3s' }}
        >
            {/* Modal Content */}
            <div className="bg-light-card rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-text-main">Add New Project</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>}

                        <div>
                            <label htmlFor="proj-title" className="block text-sm font-medium text-text-secondary mb-1">Project Title <span className="text-red-500">*</span></label>
                            <input
                                type="text" id="proj-title" value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="proj-desc" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                            <textarea
                                id="proj-desc" value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="proj-link" className="block text-sm font-medium text-text-secondary mb-1">Project Link (URL)</label>
                            <input
                                type="url" id="proj-link" value={projectLink}
                                onChange={(e) => setProjectLink(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                                placeholder="e.g., https://github.com/your-repo"
                            />
                        </div>
                        <div>
                            <label htmlFor="proj-tags" className="block text-sm font-medium text-text-secondary mb-1">Tags (Comma-separated)</label>
                            <input
                                type="text" id="proj-tags" value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                                placeholder="e.g., React, Python, AI, Hackathon"
                            />
                        </div>
                    </div>
                    {/* Footer with Buttons */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                        <button
                            type="button" onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-text-secondary bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        >
                            Add Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;