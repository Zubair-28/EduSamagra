import React from 'react';
import { ArrowTopRightOnSquareIcon, TagIcon, TrashIcon } from '@heroicons/react/24/outline';

// This component receives the 'project' data and the 'onDelete' function as props
const ProjectCard = ({ project, onDelete }) => {
    return (
        <div className="bg-light-card rounded-lg shadow-md p-6 animate-fade-in-up flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    {/* Project Title */}
                    <h3 className="text-lg font-semibold text-text-main pr-2">{project.title}</h3>

                    <div className="flex space-x-2 flex-shrink-0">
                        {/* Project Link Button */}
                        {project.project_link && (
                            <a
                                href={project.project_link} target="_blank" rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-800" title="View Project"
                            >
                                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            </a>
                        )}
                        {/* Delete Button */}
                        <button
                            onClick={() => onDelete(project.id)} // Calls the delete function
                            className="text-text-secondary hover:text-accent-red" title="Delete Project"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                {/* Project Description */}
                <p className="text-sm text-text-secondary mb-4">{project.description}</p>
            </div>
            {/* Project Tags */}
            <div className="flex flex-wrap gap-2">
                {Array.isArray(project.tags) && project.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full flex items-center">
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;