import React from 'react';
import reschedule from '../../../assets/user-dashboard-icons/alert-icons/SessionRescheduled-Icon.svg';
import schedule from '../../../assets/user-dashboard-icons/alert-icons/Schedule-Icon.svg';
import systemIcon from '../../../assets/user-dashboard-icons/alert-icons/System-Icon.svg';

import chatIcon from '../../../assets/user-dashboard-icons/UnreadMessages-Icon.svg';

const AlertsData = [
  {
    title: 'Session Reschedule Request',
    type: 'appointment_reschedule',
    description: 'Reschedule to 29th June 2024, 04:00PM to 05...',
    is_seen: false,
  },
  {
    title: 'Welcome to Safe Harbour!!',
    type: 'system',
    description: 'Explore our Services',
    is_seen: false,
  },
  {
    title: 'Dr. Umang Mehta',
    type: 'chat',
    description: 'Can you please send your report?',
    is_seen: true,
  },
  {
    title: 'Meeting Scheduled on 2nd October 2026',
    type: 'appointment_remainder',
    description: 'Dr. Ramesh Upadhyay, Clinical Therapy',
    is_seen: true,
  },
];

const alertIcons = {
  system: systemIcon,
  appointment_remainder: schedule,
  appointment_reschedule: reschedule,
  chat: chatIcon,
};

function Alerts() {
  return (
    <div className='flex flex-col gap-5'>
      <h3 className='font-bold text-2xl inter'>Alerts</h3>
      <div>
        {AlertsData.map((ele) => {
          return (
            <div className='flex gap-3 items-center hover:bg-[#8473E81A] px-7.5 py-[15px] gap-10  rounded-[30px]'>
              <div className='p-3.5 rounded-full bg-[#8473E833] relative  '>
                <img src={alertIcons[ele.type]} alt='' />
                {!ele.is_seen && (
                  <div className='bg-[#FF6363] h-2.5 w-2.5 absolute rounded-full -top-1 -right-1'></div>
                )}
              </div>
              <div>
                <h2 className='font-semibold text-2xl montserrat'>
                  {ele.title}
                </h2>
                <p className='font-semibold montserrat text-[#0000008A] '>
                  {ele.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Alerts;
