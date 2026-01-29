import React, { useState } from 'react';

/* ================= MOCK DATA ================= */

// Monthly single session (used below calendar)
const MONTHLY_SESSIONS = {
  24: {
    time: '13:00 PM to 14:00 PM',
    doctor: 'Dr. Anil Ojha',
    tag: 'Mental Health',
    type: 'Video Session',
  },
};

// Daily sessions
const SESSIONS = {
  24: Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    doctor: 'Dr. Anil Ojha',
    patient: 'Rakesh',
    issue: 'Depression Treatment - Mental Health',
    time: '13:00PM to 14:00PM',
  })),
  29: [
    {
      id: 99,
      doctor: 'Dr. Anil Ojha',
      patient: 'Rakesh',
      issue: 'Depression Treatment - Mental Health',
      time: '12:00PM to 14:00PM',
    },
  ],
};

/* ================= UI HELPERS ================= */

const Card = ({ children }) => (
  <div className='bg-[#3f3b54] rounded-[28px] p-6 text-white w-full max-w-[360px] mx-auto'>
    {children}
  </div>
);

const PurpleBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className='w-full bg-[#8f7cff] py-3 rounded-full font-semibold'
  >
    {children}
  </button>
);

const BlueBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className='w-full bg-[#3f8cff] py-3 rounded-full font-semibold'
  >
    {children}
  </button>
);

/* ================= MONTHLY CALENDAR ================= */

const MonthlyCalendar = ({ selectedDate, onSelect }) => {
  return (
    <div className='bg-white rounded-[32px] p-6 w-full max-w-[360px]'>
      <div className='text-center text-[#8f7cff] font-bold text-lg mb-4'>
        June 2024
      </div>

      <div className='grid grid-cols-7 text-xs text-gray-400 mb-2 text-center'>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-3 text-center text-sm'>
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              onClick={() => onSelect(day)}
              className={`relative p-2 rounded-full cursor-pointer ${
                day === selectedDate
                  ? 'bg-[#8f7cff] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {day}
              {SESSIONS[day]?.length > 0 && (
                <span className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full' />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ================= NO SCHEDULE ================= */

const NoSchedule = ({ date }) => (
  <Card>
    <div className='text-center text-[#8f7cff] font-semibold text-lg mb-6'>
      {date}th June 2024
    </div>
    <div className='text-center text-gray-400 text-lg mt-16'>
      Session Not Scheduled
    </div>
  </Card>
);

/* ================= DAILY LIST VIEW ================= */

const DailyList = ({ sessions, onReschedule }) => (
  <Card>
    <div className='flex justify-between items-center mb-4'>
      <div className='text-sm'>
        Total Sessions
        <span className='ml-2 bg-[#8f7cff] px-2 py-0.5 rounded-full'>
          {sessions.length}
        </span>
      </div>
      <div className='bg-[#8f7cff] px-4 py-1 rounded-full text-sm'>
        List View
      </div>
    </div>

    <div className='space-y-3 max-h-[260px] overflow-y-auto pr-1'>
      {sessions.map((s) => (
        <div
          key={s.id}
          className='bg-[#524e6a] rounded-2xl p-3 flex justify-between items-center'
        >
          <div className='flex gap-3 items-center'>
            <div className='w-10 h-10 rounded-full bg-[#8f7cff]/30 flex items-center justify-center'>
              👤
            </div>
            <div>
              <div className='font-semibold text-sm'>{s.doctor}</div>
              <div className='text-xs opacity-70'>{s.issue}</div>
            </div>
          </div>

          <div className='text-xs text-right'>
            <div>{s.time}</div>
            <button className='mt-1 bg-[#8f7cff] px-4 py-1 rounded-full'>
              Join
            </button>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={onReschedule}
      className='mt-4 text-sm underline text-center w-full'
    >
      Change Date / Time
    </button>
  </Card>
);

/* ================= SINGLE VIEW ================= */

const SingleView = ({ date, session, onReschedule }) => (
  <Card>
    <div className='text-center text-[#8f7cff] font-semibold text-lg mb-4'>
      {date}th June 2024
    </div>

    <div className='w-20 h-20 mx-auto rounded-full bg-[#8f7cff]/30 mb-3 flex items-center justify-center'>
      👨‍⚕️
    </div>

    <div className='text-center font-semibold'>{session.doctor}</div>
    <div className='text-center text-xs opacity-70 mb-4'>{session.issue}</div>

    <div className='bg-[#524e6a] p-4 rounded-2xl text-center mb-4'>
      <div className='text-sm'>Video Session</div>
      <div className='font-semibold'>{session.time}</div>
    </div>

    <PurpleBtn>Join Session</PurpleBtn>

    <button
      onClick={onReschedule}
      className='mt-4 w-full border border-[#8f7cff] text-[#8f7cff] py-2 rounded-full'
    >
      Change Date / Time
    </button>
  </Card>
);

/* ================= RESCHEDULE POPUP (WITH CALENDAR) ================= */

const ReschedulePage = ({ onClose, onSubmit }) => {
  const [date, setDate] = useState(29);
  const [from, setFrom] = useState('13:00PM');
  const [to, setTo] = useState('15:00PM');

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-[32px] p-6 w-full max-w-[360px]'>
        <div className='text-center text-[#8f7cff] font-bold text-lg mb-4'>
          Dr. Nitin Mehta
        </div>

        {/* Calendar */}
        <MonthlyCalendar selectedDate={date} onSelect={setDate} />

        <div className='text-sm mt-4 mb-2'>
          Suggest time slots to the patient
        </div>

        <div className='flex gap-2 mb-4'>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className='border rounded-xl px-3 py-2 w-full'
          />
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className='border rounded-xl px-3 py-2 w-full'
          />
        </div>

        <PurpleBtn onClick={onSubmit}>Suggest Reschedule</PurpleBtn>

        <button onClick={onClose} className='mt-4 text-sm w-full'>
          Cancel
        </button>
      </div>
    </div>
  );
};

/* ================= CONFIRM CARD ================= */

const ConfirmCard = ({ onConfirm, onEdit }) => (
  <Card>
    <div className='flex justify-between text-sm mb-4'>
      <div>
        <div className='text-[#8f7cff]'>Original</div>
        <div>24 June · 13:00–14:00</div>
      </div>
      <div>
        <div className='text-[#8f7cff]'>Reschedule</div>
        <div>29 June · 12:00–14:00</div>
      </div>
    </div>

    <PurpleBtn onClick={onConfirm}>Confirm Reschedule</PurpleBtn>
    <div className='mt-3'>
      <BlueBtn onClick={onEdit}>Edit Reschedule</BlueBtn>
    </div>
  </Card>
);

/* ================= MAIN ================= */

export default function Calendar() {
  const [mode, setMode] = useState('monthly');
  const [sessionView, setSessionView] = useState('single');
  const [selectedDate, setSelectedDate] = useState(24);
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduled, setRescheduled] = useState(false);

  const sessions = SESSIONS[selectedDate] || [];
  const monthlySession = MONTHLY_SESSIONS[selectedDate];

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center gap-6 p-6'>
      {/* Monthly / Daily Toggle */}
      <div className='flex bg-white rounded-full p-1 w-[360px]'>
        <button
          onClick={() => setMode('monthly')}
          className={`flex-1 py-2 rounded-full ${
            mode === 'monthly' ? 'bg-[#8f7cff] text-white' : ''
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setMode('daily')}
          className={`flex-1 py-2 rounded-full ${
            mode === 'daily' ? 'bg-[#8f7cff] text-white' : ''
          }`}
        >
          Daily
        </button>
      </div>

      {/* MONTHLY */}
      {mode === 'monthly' && (
        <>
          <MonthlyCalendar
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />

          {monthlySession && (
            <Card>
              <div className='text-center mb-4'>
                <div className='font-semibold'>{monthlySession.type}</div>
                <div className='text-sm'>{monthlySession.time}</div>
                <div className='text-sm'>{monthlySession.doctor}</div>
              </div>
              <PurpleBtn>Join Session</PurpleBtn>
            </Card>
          )}
        </>
      )}

      {/* DAILY */}
      {mode === 'daily' && (
        <>
          <div className='flex bg-[#524e6a] rounded-full p-1 w-[360px]'>
            <button
              onClick={() => setSessionView('single')}
              className={`flex-1 py-2 rounded-full ${
                sessionView === 'single' ? 'bg-[#8f7cff]' : ''
              }`}
            >
              Single View
            </button>
            <button
              onClick={() => setSessionView('list')}
              className={`flex-1 py-2 rounded-full ${
                sessionView === 'list' ? 'bg-[#8f7cff]' : ''
              }`}
            >
              List View
            </button>
          </div>

          {sessionView === 'single' &&
            (sessions.length === 0 ? (
              <NoSchedule date={selectedDate} />
            ) : (
              <>
                <SingleView
                  date={selectedDate}
                  session={sessions[0]}
                  onReschedule={() => setShowReschedule(true)}
                />

                {rescheduled && (
                  <ConfirmCard
                    onConfirm={() => alert('Reschedule Confirmed')}
                    onEdit={() => setShowReschedule(true)}
                  />
                )}
              </>
            ))}

          {sessionView === 'list' &&
            (sessions.length === 0 ? (
              <NoSchedule date={selectedDate} />
            ) : (
              <DailyList
                sessions={sessions}
                onReschedule={() => setShowReschedule(true)}
              />
            ))}
        </>
      )}

      {showReschedule && (
        <ReschedulePage
          onClose={() => setShowReschedule(false)}
          onSubmit={() => {
            setRescheduled(true);
            setShowReschedule(false);
          }}
        />
      )}
    </div>
  );
}
