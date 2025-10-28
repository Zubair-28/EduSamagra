// AI-driven insights display
import React from 'react';
import { BoltIcon } from '@heroicons/react/24/solid';

const AIInsightBox = ({ insight }) => {
    if (!insight) return null;

    const { risk_level, message } = insight;

    const themes = {
        low: {
            bg: 'bg-green-100 dark:bg-green-900',
            text: 'text-green-800 dark:text-green-200',
            border: 'border-green-500',
            icon: 'text-green-500',
        },
        medium: {
            bg: 'bg-yellow-100 dark:bg-yellow-900',
            text: 'text-yellow-800 dark:text-yellow-200',
            border: 'border-yellow-500',
            icon: 'text-yellow-500',
        },
        high: {
            bg: 'bg-red-100 dark:bg-red-900',
            text: 'text-red-800 dark:text-red-200',
            border: 'border-red-500',
            icon: 'text-red-500',
        },
    };

    const theme = themes[risk_level] || themes.medium;

    return (
        <div className={`p-4 rounded-lg shadow ${theme.bg} border-l-4 ${theme.border} animate-fade-in`} style={{ animationDelay: '200ms' }}>
            <div className="flex items-center">
                <BoltIcon className={`h-6 w-6 mr-3 ${theme.icon}`} />
                <h4 className={`text-lg font-semibold ${theme.text}`}>AI Insight</h4>
            </div>
            <p className={`mt-2 ${theme.text}`}>
                <span className="font-bold capitalize">{risk_level} Risk:</span> {message}
            </p>
        </div>
    );
};

export default AIInsightBox;