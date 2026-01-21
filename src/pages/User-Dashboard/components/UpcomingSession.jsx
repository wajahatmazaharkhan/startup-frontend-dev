import React from 'react';
const sessionData = {
  doctorName: 'Dr. Nitin Mehta',
  treatment: 'Depression Treatment',
  date: '1d 18h 45m 57s', //convert date to remaining time
};
function UpcomingSession() {
  return (
    <div className='flex flex-col gap-5 inter '>
      <h3 className='font-bold text-2xl '>Upcoming Session</h3>
      <div className='flex gap-10  bg-[#8473E81A] rounded-[40px] py-[30px] px-[40px]'>
        <div className='flex flex-col gap-5.5'>
          <div className='text-lg pt-1'>
            <div>
              Next Voice Session with{' '}
              <span className='bg-[#5241B61A] px-2.5 py-1.25 rounded-[20px] mx-1'>
                <span className='text-xl font-bold  bg-gradient-to-b from-[#8473E8] from-[12%] to-[#5241B6] bg-clip-text text-transparent'>
                  {sessionData.doctorName}
                </span>{' '}
              </span>
              on
            </div>
            <div className='text-xl bg-gradient-to-b from-[#8473E8] from-[12%] to-[#5241B6] bg-clip-text text-transparent font-bold'>
              {sessionData.treatment}
            </div>
          </div>
          <div className='text-[28px] bg-gradient-to-b from-[#8473E8] from-[12%] to-[#5241B6] bg-clip-text text-transparent font-bold '>
            {sessionData.date}
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <button className='text-[#FFFFFF] bg-[#8473E8] hover:bg-[#5241B6] px-[61px] py-[15px] font-semibold rounded-[50px] text-lg max-w-[237px] montserrat'>
            Join Session
          </button>
          <button className=' text-[#8473E8] text-lg border-1 border-[#8473E8]  py-[15px] font-semibold rounded-[50px] max-w-[237px] montserrat'>
            Change Date / Time
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpcomingSession;
