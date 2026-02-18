import React from 'react';

export default function OrderTabs({ activeTab, setActiveTab, tabs }) {
    return (
        <div className="bg-white dark:bg-gray-900 sticky top-24 z-30 rounded-t-xl shadow-sm border-b border-gray-100 dark:border-gray-800 mb-4 overflow-x-auto scrollbar-thin">
            <div className="flex w-full whitespace-nowrap">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-all ${activeTab === tab.id
                            ? 'border-[#F59E0B] text-[#F59E0B]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
