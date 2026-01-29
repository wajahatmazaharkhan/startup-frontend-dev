import { Heart } from 'lucide-react';

const HeartbeatLoader = () => {
  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 gap-4'>
      {/* Heart + Heartbeat */}
      <div className='flex items-center gap-4'>
        {/* Heart Icon */}
        <Heart className='w-10 h-10 text-[var(--color-brand)] animate-heartbeat' />

        {/* ECG Line */}
        <svg className='w-48 h-10' viewBox='0 0 200 40' fill='none'>
          <polyline
            points='0,20 20,20 30,10 40,30 50,20 70,20 80,5 90,35 100,20 120,20 130,15 140,25 160,20 200,20'
            className='stroke-[var(--color-purple-500)] stroke-[3] fill-none animate-ecg'
          />
        </svg>
      </div>

      {/* Optional Text */}
      <p
        className='text-sm font-medium'
        style={{ color: 'var(--color-muted)' }}
      >
        Monitoring your data...
      </p>

      {/* Styles */}
      <style>
        {`
          /* Heartbeat animation */
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(1); }
            75% { transform: scale(1.2); }
          }
          .animate-heartbeat {
            animation: heartbeat 1.2s ease-in-out infinite;
            transform-origin: center;
          }

          /* ECG line animation */
          @keyframes ecg {
            0% { stroke-dasharray: 0, 300; }
            100% { stroke-dasharray: 300, 0; }
          }
          .animate-ecg {
            stroke-dasharray: 300, 0;
            animation: ecg 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HeartbeatLoader;
