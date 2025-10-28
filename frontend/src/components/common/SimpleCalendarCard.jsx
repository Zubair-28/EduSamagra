// frontend/src/components/common/SimpleCalendarCard.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const SimpleCalendarCard = () => {
    // Mock calendar data for July 2018 (as per image 2)
    const currentMonth = "JULY 2018"; // Hardcoded for demo
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const dates = [
        null, null, null, null, null, null, 1, // Start on Sunday for July 1st 2018
        2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28, 29,
        30, 31, null, null, null, null, null
    ]; // Array of days, null for empty cells

    // Highlighted dates from image (example)
    const highlightedDates = [1, 7, 14, 21, 28, 29]; // Example: 29 is the active one

    const getDayClass = (date) => {
        let classes = 'w-9 h-9 flex items-center justify-center rounded-full text-sm ';
        if (date === null) {
            classes += 'text-gray-400 dark:text-gray-600 cursor-not-allowed'; // Placeholder color
        } else {
            classes += 'text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-800 cursor-pointer';
            if (highlightedDates.includes(date)) {
                classes += ' bg-primary-500 text-white font-semibold'; // General highlight
            }
            if (date === 29) { // Specific active date from image
                classes += ' ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-500 text-white font-bold';
            }
        }
        return classes;
    };

    return (
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-4 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
                <ChevronLeftIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-white" />
                <h3 className="text-lg font-semibold dark:text-white">{currentMonth}</h3>
                <ChevronRightIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-white" />
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                {daysOfWeek.map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {dates.map((date, index) => (
                    <div key={index} className={getDayClass(date)}>
                        {date}
                    </div>
                ))}
            </div>

            {/* Placeholder for calendar events / summary if needed */}
        </div>
    );
};

export default SimpleCalendarCard;