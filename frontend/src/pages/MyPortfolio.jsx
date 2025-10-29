import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import AddProjectModal from '../components/common/AddProjectModal';
import AddSkillModal from '../components/common/AddSkillModal'; // Import new modal
import AddLinkModal from '../components/common/AddLinkModal'; // Import new modal
import { PlusIcon, ArrowTopRightOnSquareIcon, TagIcon, TrashIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProjectCard from '../components/common/ProjectCard';

const MyPortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]); // State for skills
    const [links, setLinks] = useState([]); // State for links

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal states
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    // Fetch all portfolio data
    useEffect(() => {
        const fetchPortfolio = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axiosInstance.get('/student/portfolio');
                setProjects(response.data.projects);
                setSkills(response.data.skills);
                setLinks(response.data.links);
            } catch (err) {
                console.error("Failed to fetch portfolio data", err);
                setError('Could not load portfolio data.');
            }
            setLoading(false);
        };
        fetchPortfolio();
    }, []);

    // --- Project Handlers ---
    const handleAddProject = async (projectData) => { /* ... (no change) ... */ };
    const handleDeleteProject = async (projectId) => { /* ... (no change) ... */ };

    // --- Skill Handlers ---
    const handleAddSkill = async (skillData) => {
        try {
            const response = await axiosInstance.post('/student/portfolio/skill', skillData);
            setSkills([response.data, ...skills]);
            setIsSkillModalOpen(false);
        } catch (err) {
            alert(`Error: ${err.response?.data?.msg || 'Could not add skill'}`);
        }
    };
    const handleDeleteSkill = async (skillId) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            try {
                await axiosInstance.delete(`/student/portfolio/skill/${skillId}`);
                setSkills(skills.filter(s => s.id !== skillId));
            } catch (err) {
                alert(`Error: ${err.response?.data?.msg || 'Could not delete skill'}`);
            }
        }
    };

    // --- Link Handlers ---
    const handleAddLink = async (linkData) => {
        try {
            const response = await axiosInstance.post('/student/portfolio/link', linkData);
            setLinks([response.data, ...links]);
            setIsLinkModalOpen(false);
        } catch (err) {
            alert(`Error: ${err.response?.data?.msg || 'Could not add link'}`);
        }
    };
    const handleDeleteLink = async (linkId) => {
        if (window.confirm("Are you sure you want to delete this link?")) {
            try {
                await axiosInstance.delete(`/student/portfolio/link/${linkId}`);
                setLinks(links.filter(l => l.id !== linkId));
            } catch (err) {
                alert(`Error: ${err.response?.data?.msg || 'Could not delete link'}`);
            }
        }
    };

    return (
        <>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-text-main">My Portfolio</h2>
                    <button
                        onClick={() => setIsProjectModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add New Project
                    </button>
                </div>

                {/* Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content: Projects */}
                    <div className="lg:col-span-2 space-y-6">
                        <section id="projects">
                            {/* ... (Projects loading/error/display logic - no change) ... */}
                        </section>
                    </div>

                    {/* Sidebar: Skills, Links, Resume */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Skills Section */}
                        <div className="bg-light-card p-6 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-text-main">My Skills</h3>
                                <button
                                    onClick={() => setIsSkillModalOpen(true)}
                                    className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full hover:bg-primary-200"
                                >
                                    Add Skill
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.length > 0 ? (
                                    skills.map(skill => (
                                        <span key={skill.id} className="relative group px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full flex items-center">
                                            {skill.skill_name}
                                            <button
                                                onClick={() => handleDeleteSkill(skill.id)}
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete skill"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-text-secondary w-full text-center p-4">No skills added yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Links & Resume Section */}
                        <div className="bg-light-card p-6 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-text-main">Links & Resume</h3>
                                <button
                                    onClick={() => setIsLinkModalOpen(true)}
                                    className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full hover:bg-primary-200"
                                >
                                    Add Link
                                </button>
                            </div>
                            <div className="space-y-3">
                                {links.length > 0 ? (
                                    links.map(link => (
                                        <div key={link.id} className="flex items-center justify-between group">
                                            <a
                                                href={link.url} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center text-sm text-primary-600 hover:underline"
                                            >
                                                <LinkIcon className="w-4 h-4 mr-2" />
                                                {link.title}
                                            </a>
                                            <button
                                                onClick={() => handleDeleteLink(link.id)}
                                                className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete link"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-text-secondary w-full text-center p-4">No links added yet.</p>
                                )}
                                {/* Resume Placeholder */}
                                <hr className="my-4 border-gray-200" />
                                <div className="text-center text-text-secondary p-2">
                                    Resume placeholder.
                                    <button className="mt-2 w-full px-3 py-1 bg-gray-200 text-text-secondary text-xs rounded hover:bg-gray-300">Upload Resume (PDF)</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Modals */}
            <AddProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} onSubmit={handleAddProject} />
            <AddSkillModal isOpen={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)} onSubmit={handleAddSkill} />
            <AddLinkModal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} onSubmit={handleAddLink} />
        </>
    );
};

export default MyPortfolio;