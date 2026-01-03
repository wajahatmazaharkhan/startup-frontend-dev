import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react'; 
import NotificationTabs from '../components/Notification/NotificationTabs';
import NotificationList from '../components/Notification/NotificationList';
import { notifications as dummyNotifications } from '../data/notifications';

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') {
      return dummyNotifications;
    }
    return dummyNotifications.filter((notification) => notification.type === activeTab);
  }, [activeTab]);

  return (
    // Background and full height container
    <div className="min-h-screen bg-[#F9FAFB] pt-4 sm:pt-8 pb-10 montserrat">
      
      {/* Responsive Container: Mobile (Full), Tablet (Medium), Desktop (Large) */}
      <div className="w-full max-w-[95%] sm:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Tabs Section */}
        <div className="mb-4 sm:mb-8">
          <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Clear All Link */}
        <div className="flex justify-end mb-3 sm:mb-5">
          <button className="text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
            Clear All Notifications
          </button>
        </div>
        
        {/* Notification List */}
        <NotificationList notifications={filteredNotifications} />
      </div>
    </div>
  );
};

export default NotificationPage;