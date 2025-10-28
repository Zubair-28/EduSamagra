import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid'; // Solid star for rating

const CourseCard = ({ title, reviews, students, price, imageUrl, delay = 0 }) => {
    return (
        <div
            className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <img className="relative h-30 overflow-hidden rounded-t-xl" src={imageUrl || 'https://via.placeholder.com/300x150?text=Course+Image'} alt={title} /> {/* Placeholder image */}
            <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-1">{title}</h4>
                <div className="flex items-center text-sm text-yellow-500 mb-1">
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4 text-gray-300 dark:text-gray-600 mr-1" /> {/* Example rating */}
                    <span className="text-gray-500 dark:text-gray-400 ml-1">({reviews} Reviews)</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Total Student ({students})</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{price}</span>
                    <button className="px-4 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-full hover:bg-primary-600 transition-colors duration-200">
                        ENROLL NOW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;