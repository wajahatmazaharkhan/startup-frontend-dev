import { Paperclip } from 'lucide-react';
import React from 'react';

/**
 * @param {Object} props
 * @param {string} props.label - Main label shown inside the card
 * @param {string} [props.sub] - Helper text shown below
 * @param {string} [props.accept] - Accepted file types
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange]
 */
export const DocumentCard = ({
  label,
  sub,
  accept = '.pdf,.jpg,.png,.jpeg',
  onChange,
  icon,
  isUploaded = false,
}) => {
  return (
    <label className='flex flex-col gap-1 cursor-pointer group'>
      <div
        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
          isUploaded
            ? 'border-green-500 bg-green-50 text-green-700'
            : 'border-purple-300 text-neutral-600 hover:border-purple-600 hover:bg-purple-50'
        }`}
      >
        <div className='flex items-center gap-2'>
          {icon || <Paperclip size={16} />}
          <span className='font-medium'>{label}</span>
        </div>
        <span className='text-xs font-semibold'>
          {isUploaded ? 'Change File' : 'Upload'}
        </span>
      </div>

      {sub && <span className='text-[11px] text-neutral-400 px-1'>{sub}</span>}

      <input
        type='file'
        className='hidden'
        accept={accept}
        onChange={onChange}
      />
    </label>
  );
};
