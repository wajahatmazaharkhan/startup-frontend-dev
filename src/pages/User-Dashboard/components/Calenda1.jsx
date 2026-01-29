import React, { useState } from 'react';
import Calendar from 'react-calendar';

function Calendar1() {
  const [value, setValue] = useState(new Date());
  return (
    <div className='w-'>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}

export default Calendar1;
