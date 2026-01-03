import React from 'react';
import NotificationItem from './NotificationItem';
import { Bell } from 'lucide-react';

const NotificationList = ({ notifications }) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-transparent montserrat">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <Bell className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium text-sm sm:text-base">No notifications found.</p>
      </div>
    );
  }

  // Group by category (Today, Yesterday, Date)
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const { category } = notification;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(notification);
    return acc;
  }, {});

  return (
    <div className="pb-10 sm:pb-20 montserrat">
      {Object.entries(groupedNotifications).map(([category, items]) => (
        <div key={category} className="mb-6 sm:mb-8">
          {/* Section Header */}
          <h2 className="text-xs sm:text-sm font-bold text-gray-400 mb-3 px-1 uppercase tracking-wider">
            {category}
          </h2>
          
          {/* List Items */}
          <div className="space-y-3 sm:space-y-4">
            {items.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;