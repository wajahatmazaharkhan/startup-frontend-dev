import React from 'react';
import MiniDashboard from './components/MiniDashboard';
import UpcomingSession from './components/UpcomingSession';
import Alerts from './components/Alerts';
import RecentSessions from './components/RecentSessions';
import UniversalLoader from './components/UniversalLoader';
import ECGLoader from './components/UniversalLoader';
import CapsuleLoader from './components/UniversalLoader';
import AdvancedCapsuleLoader from './components/UniversalLoader';
import BrandCapsuleLoader from './components/UniversalLoader';
import HourglassLoader from './components/UniversalLoader';
import UniversalDotsLoader from './components/UniversalLoader';
import HeartbeatLoader from './components/UniversalLoader';
import CenterHeartbeatLoader from './components/UniversalLoader';
import Calendar from './components/Calendar';
import Calendar1 from './components/Calenda1';

function UserDashboard() {
  return (
    // <div className='grid grid-rows-4 grid-cols-7 px-10 h-full'>
    //   <div className='bg-red-500 col-span-4 row-span-1'>good morning</div>
    //   <div className='col-span-1 row-span-4'></div>
    //   <div className='bg-blue-400 col-span-2 h-80 row-span-2'>calendar</div>
    //   <div className='bg-amber-200 col-span-4 row-span-1'>upcoming session</div>
    //   <div className='bg-gray-400 col-span-4 row-span-1'>alert</div>
    //   <div className='bg-sky-300 col-span-2 row-span-1'>Recent sessions</div>
    // </div>
    <>
      {/* <MiniDashboard /> */}
      {/* <UpcomingSession /> */}
      {/* <Alerts /> */}
      {/* <RecentSessions /> */}
      {/* <HeartbeatLoader /> */}
      {/* <Calendar /> */}
      <Calendar1 />
    </>
  );
}

export default UserDashboard;
