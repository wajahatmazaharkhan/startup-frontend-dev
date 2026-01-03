import React from 'react';

const tabs = [
  { id: 'all', label: 'All Notifications' },
  { id: 'meeting', label: 'Meetings' },
  { id: 'message', label: 'Messages' },
  { id: 'system', label: 'System Messages' },
];

const NotificationTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full flex justify-start sm:justify-center items-center py-2 sm:py-4 bg-transparent montserrat overflow-x-auto no-scrollbar">
      <nav className="flex space-x-6 sm:space-x-8 px-2 min-w-max" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                whitespace-nowrap pb-2 px-1 font-medium text-sm sm:text-base transition-all duration-200 outline-none
                ${
                  isActive
                    ? 'text-purple-500 border-b-2 border-purple-500' 
                    : 'text-gray-500 hover:text-purple-400 border-b-2 border-transparent'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NotificationTabs;