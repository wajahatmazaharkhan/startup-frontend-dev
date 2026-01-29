import React from 'react';
import avata1 from '../../../assets/Avatars/avatar1.png';

import iconMic from '../../../assets/otherIcons/mic.svg';
import iconVideo from '../../../assets/otherIcons/video.svg';

const RecentSessionsData = [
  {
    id: 1,
    counsellor_name: 'Dr. Abhishek Mehta',
    duration: '50 min',
    session_type: 'voice',
    time: '04:00 PM',
    profile_image: avata1,
  },
  {
    id: 2,
    counsellor_name: 'Dr. Abhishek Mehta',
    duration: '50 min',
    session_type: 'video',
    time: '04:00 PM',
    profile_image: avata1,
  },
  {
    id: 3,
    counsellor_name: 'Dr. Abhishek Mehta',
    duration: '50 min',
    session_type: 'voice',
    time: '04:00 PM',
    profile_image: avata1,
  },
];

const mediaIcons = {
  video: {
    name: 'Video Session',
    icon: iconVideo,
  },
  voice: {
    name: 'Voice Session',
    icon: iconMic,
  },
};

function RecentSessions() {
  return (
    <div className='inter flex flex-col gap-5'>
      <h3 className='font-bold text-2xl '>Recent Session</h3>
      <div>
        {RecentSessionsData.map((ele) => {
          return (
            <div key={ele.id} className='flex flex-col gap-3'>
              <div className='flex gap-4'>
                <div>
                  <img src={ele.profile_image} alt='' />
                </div>
                <div className='flex gap-[39px] items-center justify-between'>
                  <div className=''>
                    <div className='font-bold text-lg'>
                      {ele.counsellor_name}
                    </div>
                    <div className='text-sm text-[#0000008A] tracking-[2%]'>{`${ele.duration} ${mediaIcons[ele.session_type].name}`}</div>
                  </div>
                  <div className='text-sm text-[#0000008A] tracking-[2%]'>
                    {ele.time}
                  </div>
                  <div>
                    <img
                      src={mediaIcons[ele.session_type].icon}
                      alt=''
                      className=''
                    />
                  </div>
                </div>
              </div>
              <hr
                className=' border-[.2px] bg-gradient-to-r
              from-transparent
              via-black
              to-transparent mb-3 '
              />
            </div>
          );
        })}
      </div>
      <div className='flex justify-center'>
        <button className='text-[#FFFFFF] bg-[#8473E8] hover:bg-[#5241B6] px-[61px] py-[15px] font-semibold rounded-[50px] text-lg max-w-[237px] montserrat'>
          View All
        </button>
      </div>
    </div>
  );
}

export default RecentSessions;
