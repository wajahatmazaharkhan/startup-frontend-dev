import React from 'react';
import { Calendar, MessageCircle, BellRing, X } from 'lucide-react';

const NotificationItem = ({ notification }) => {
  const { title, description, time, type } = notification;

  // Unified Purple Icon Style
  const commonIconClass = "w-5 h-5 sm:w-6 sm:h-6 text-purple-500"; 

  const getIcon = (type) => {
    switch (type) {
      case 'meeting':
        return <Calendar className={commonIconClass} />;
      case 'message':
        return <MessageCircle className={commonIconClass} />;
      case 'system':
        return <BellRing className={commonIconClass} />;
      default:
        return <BellRing className={commonIconClass} />;
    }
  };

  return (
    <div className="flex items-start p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm relative group montserrat hover:shadow-md transition-shadow duration-200 mb-3 sm:mb-4">
      {/* Icon Container - Responsive padding & rounded corners */}
      <div className="flex-shrink-0 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-purple-50">
        {getIcon(type)}
      </div>

      {/* Content Body */}
      <div className="ml-3 sm:ml-4 flex-1 pr-6 sm:pr-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
          <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 leading-tight">
            {title}
          </h3>
          {/* Time hidden in mobile title row if needed, or shown below. Keeping it simple here. */}
        </div>
        
        {/* Description */}
        <p className="text-xs sm:text-[14px] text-gray-500 leading-relaxed font-medium mt-0.5 sm:mt-1 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Right 'X' Close Icon */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
        <button className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;