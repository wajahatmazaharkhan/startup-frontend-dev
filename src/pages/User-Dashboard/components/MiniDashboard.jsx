import React from 'react';
import duration from '../../../assets/user-dashboard-icons/SessionDuration-Icon.svg';
import sessionBooked from '../../../assets/user-dashboard-icons/SessionCompleted-Icon.svg';
import UpcomingSessions from '../../../assets/user-dashboard-icons/UpcomingSessions-Icon.svg';
import chat from '../../../assets/user-dashboard-icons/UnreadMessages-Icon.svg';

const user = {
  name: 'Rajesh Tewatia',
};

const dashboardData = [
  {
    title: 'Sessions Attended',
    value: 2,
    icon: sessionBooked,
  },
  {
    title: 'Upcoming Sessions',
    value: 6,
    icon: UpcomingSessions,
  },
  {
    title: 'Session Duration',
    value: '3h 35min',
    icon: duration,
  },
  {
    title: 'Unread Messages',
    value: 5,
    icon: chat,
  },
];

function MiniDashboard() {
  return (
    <div className='flex flex-col gap-7.5'>
      <h2 className='bg-gradient-to-r from-[#8473E8] from-[12.02%] to-[#5241B6] to-[88.94%] bg-clip-text text-transparent text-[36px]'>
        Good Morning, <span className='font-bold text-[44px]'>{user.name}</span>
      </h2>
      <div className='flex gap-4 items-center '>
        {dashboardData.map((ele) => {
          return (
            <div
              key={ele.title}
              className='flex flex-col items-center px-[15px] py-6.25 rounded-2xl bg-[#8473E81A] gap-2.5 w-[183px]'
            >
              <div>
                <img src={ele.icon} alt='' className='w-8.5 h-8.5 ' />
              </div>
              <div className='font-semibold text-base'>{ele.title}</div>
              <div className='text-[32px] bg-gradient-to-b from-[#8473E8] from-[12%] to-[#5241B6] bg-clip-text text-transparent mt-1.25 font-bold '>
                {ele.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MiniDashboard;
