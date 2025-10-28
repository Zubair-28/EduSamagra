// Chart container component
import React from 'react';
import { ResponsiveContainer } from 'recharts';

const ChartCard = ({ title, children }) => {
    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    {children}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartCard;