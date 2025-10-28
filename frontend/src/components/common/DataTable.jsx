// Reusable data table component
import React from 'react';

const DataTable = ({ title, columns, data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '300ms' }}>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400">No data available.</p>
            </div>
        )
    }

    const keys = Object.keys(data[0]);

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                    <thead className="bg-gray-50 dark:bg-slate-900">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                                {keys.map((key, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;