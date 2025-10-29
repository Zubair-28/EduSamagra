import React from 'react';

// Added 'renderCell' prop
const DataTable = ({ title, columns, data, renderCell }) => {
    if (!data || data.length === 0) {
        return (
            <div className="p-6 bg-light-card rounded-lg shadow-md animate-fade-in-up"> {/* Use light-card, adjusted animation */}
                <h3 className="text-lg font-semibold text-text-main mb-4">{title}</h3> {/* Use text-main */}
                <p className="text-text-secondary">No data available.</p> {/* Use text-secondary */}
            </div>
        )
    }

    // Attempt to derive keys from the first data row if columns match structure, otherwise use basic derivation
    const dataKeys = Object.keys(data[0]);
    const keys = columns.length === dataKeys.length ? dataKeys : columns.map(col => col.toLowerCase().replace(/[^a-z0-9]/gi, '_')); // More robust key derivation


    return (
        <div className="p-4 bg-light-card rounded-lg shadow-md animate-fade-in-up"> {/* Use light-card, padding adjusted */}
            <h3 className="text-lg font-semibold text-text-main mb-4">{title}</h3> {/* Use text-main */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200"> {/* Light theme divide */}
                    <thead className="bg-gray-50"> {/* Light theme header */}
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"> {/* Light theme text */}
                                    {col}
                                </th>
                            ))}
                            {/* Optional: Add Actions column header if needed later */}
                            {/* <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-light-card divide-y divide-gray-200"> {/* Light theme bg/divide */}
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50"> {/* Light theme hover */}
                                {keys.map((key, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-text-main"> {/* Light theme text */}
                                        {/* Use renderCell function if provided */}
                                        {renderCell && typeof renderCell === 'function'
                                            ? renderCell(row, key, row[key]) // Pass row, key, and value
                                            : row[key] // Default render
                                        }
                                    </td>
                                ))}
                                {/* Optional: Add Actions cell per row if needed later */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;