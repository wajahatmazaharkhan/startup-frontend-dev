import React from 'react';

const Shortbio = ({ bioPoints }) => {
  const points = Array.isArray(bioPoints)
    ? bioPoints
    : typeof bioPoints === "string"
    ? [bioPoints]
    : [];

  return (
    <div className='bg-white w-full'>
      <h2 className='text-xl font-bold'>Short Bio</h2>

      {points.map((point, index) => (
        <div key={index} className='flex gap-2'>
          <span>•</span>
          <p>{point}</p>
        </div>
      ))}
    </div>
  );
};

export default Shortbio;
