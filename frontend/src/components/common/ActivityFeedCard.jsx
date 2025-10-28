// frontend/src/components/common/ActivityFeedCard.jsx
import React from 'react';
import { EllipsisVerticalIcon, UserCircleIcon, ChatBubbleLeftIcon, CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/outline'; // Icons for different types

const ActivityFeedCard = ({ title, items, type }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/50';
            case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50';
            case 'in progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/50';
            case 'declined': return 'text-red-600 bg-red-100 dark:bg-red-900/50';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700/50';
        }
    };

    const renderItem = (item, index) => {
        switch (type) {
            case 'orders':
                return (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                        <div className="flex-1">
                            <p className="text-sm font-medium dark:text-white">{item.client} ({item.orderNumber})</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusClass(item.status)}`}>
                            {item.status}
                        </span>
                    </div>
                );
            case 'comments':
                return (
                    <div key={index} className="flex space-x-3 py-3 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                        <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                        <div>
                            <p className="font-semibold dark:text-white">{item.user}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.comment}</p>
                        </div>
                    </div>
                );
            case 'contacts':
                return (
                    <div key={index} className="flex items-center space-x-3 py-3 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                        <div className="relative">
                            {item.avatar ? (
                                <img src={item.avatar} alt={item.name} className="h-9 w-9 rounded-full object-cover" />
                            ) : (
                                <UserCircleIcon className="h-9 w-9 text-gray-400 dark:text-gray-600" />
                            )}
                            {item.status === 'online' && <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white dark:ring-dark-card"></span>}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium dark:text-white">{item.name}</p>
                        </div>
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer dark:hover:text-gray-200" />
                    </div>
                );
            default:
                return <div key={index} className="py-2 dark:text-white">Unknown item type</div>;
        }
    };

    return (
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-4 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
                {type === 'orders' && (
                    <select className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-md py-1 px-2 focus:outline-none">
                        <option>Status</option>
                        <option>Completed</option>
                        <option>Pending</option>
                    </select>
                )}
                {type === 'contacts' && (
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer dark:hover:text-gray-200" />
                )}
            </div>
            <div className="space-y-2">
                {items.length > 0 ? items.map(renderItem) : <p className="text-gray-500 dark:text-gray-400">No data available.</p>}
            </div>
        </div>
    );
};

export default ActivityFeedCard;