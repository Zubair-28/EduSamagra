import React from 'react';

const KPIBox = ({ title, value, icon, delay = 0 }) => {
    return (
        // 1. Removed role-theme, added new primary theme
        // 2. Added new animation 'animate-fade-in-up'
        // 3. Added new hover effects: 'transition-all', 'hover:scale-[102%]', 'hover:shadow-lg'
        <div
            className={`p-6 bg-white dark:bg-dark-card rounded-lg shadow-md border-l-8 border-primary-500 
                  animate-fade-in-up transition-all duration-300 ease-in-out 
                  hover:scale-[102%] hover:shadow-lg`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
                    <p className={`text-3xl font-bold text-primary-600 dark:text-primary-400`}>{value}</p>
                </div>
                <div className={`p-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300`}>
                    {React.cloneElement(icon, { className: 'h-8 w-8' })}
                </div>
            </div>
        </div>
    );
};

export default KPIBox;