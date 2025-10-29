import React, { useState } from 'react';

const AddSkillModal = ({ isOpen, onClose, onSubmit }) => {
    const [skillName, setSkillName] = useState('');
    const [category, setCategory] = useState('Technical'); // Default
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!skillName) {
            setError('Skill name is required.');
            return;
        }
        onSubmit({ skill_name: skillName, category });
        handleClose();
    };

    const handleClose = () => {
        setSkillName('');
        setCategory('Technical');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div id="modal-backdrop" onClick={(e) => { if (e.target.id === 'modal-backdrop') handleClose(); }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <div className="bg-light-card rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-text-main">Add New Skill</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>}
                        <div>
                            <label htmlFor="skill-name" className="block text-sm font-medium text-text-secondary mb-1">Skill Name <span className="text-red-500">*</span></label>
                            <input
                                type="text" id="skill-name" value={skillName}
                                onChange={(e) => setSkillName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                                placeholder="e.g., React"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="skill-category" className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                            <select
                                id="skill-category" value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm bg-white"
                            >
                                <option value="Technical">Technical</option>
                                <option value="Soft Skill">Soft Skill</option>
                                <option value="Language">Language</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                        <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Add Skill</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddSkillModal;