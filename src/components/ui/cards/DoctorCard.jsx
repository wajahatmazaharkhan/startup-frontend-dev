import React from 'react';
import videoIcon from '../../../assets/otherIcons/video.svg';
import ChatIcon from '../../../assets/otherIcons/chat.svg';

function DoctorCard() {
  return (
    <div className='max-w-[350px] rounded-3xl  bg-white   text-gray-500 shadow-lg pb-2 text-xs'>
      <div className='w-[350px] h-full  '>
        <img
          src='https://ik.imagekit.io/cdvgfqhqp/1769348783483.jpg-1769348781559-184170198_lmg14vMbH'
          alt='docotr image'
          className='object-cover w-full h-full rounded-t-3xl '
        />
      </div>
      <div className='px-4 py-2 flex flex-col gap-2'>
        <div className='flex justify-between'>
          <div className='text-lg font-semibold text-black'>Dr. Sarah Chen</div>
          <div className='flex items-center gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='orange'
              stroke='currentColor'
              stroke-width='.5'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='lucide lucide-star w-4 h-4 fill-accent text-accent'
            >
              <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'></path>
            </svg>
            <span>4.9</span>
            <span>(321)</span>
          </div>
        </div>
        <div className='text-sm -mt-3'>Licensed Clinical Psychologist</div>
        <div className='flex gap-2 mt-1'>
          {['anixety', 'depression', 'realtionship'].map((ele) => {
            return (
              <span class='px-2.5 py-1 rounded-lg text-xs font-medium capitalize bg-[#8573e880]'>
                {ele}
              </span>
            );
          })}
        </div>
        <div className='flex gap-3 mt-1 items-center '>
          <span className='flex items-center gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='lucide lucide-clock w-4 h-4'
            >
              <circle cx='12' cy='12' r='10'></circle>
              <polyline points='12 6 12 12 16 14'></polyline>
            </svg>
            12 yrs exp
          </span>
          <span className='flex items-center gap-1'>
            <img src={videoIcon} alt='' className='h-4 w-4' />
            Video
          </span>
          <span className='flex items-center gap-1'>
            <img src={ChatIcon} alt='' className='h-4 w-4 ' />
            Chat
          </span>
        </div>
      </div>
      <div className='px-3'>
        <hr className='border-[#e9edef] border-1' />
      </div>
      <div className='flex justify-between items-center px-4 py-3 '>
        <div>
          <span className='font-semibold text-black text-lg'>₹1200</span>
          /session
        </div>
        <button className='bg-purple-500 hover hover:bg-purple-600 px-3 py-1.5 rounded-xl text-white text-xs'>
          View Profile
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
