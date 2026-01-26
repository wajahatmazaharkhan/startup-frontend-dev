import React from 'react';

/**
 *
 *  @param {Object} props
 * @param {string | number} [props.value] - Input value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange]
 * @param {string} [props.className]
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props.rest
 */
export const PillInput = ({
  value,
  onChange,
  className = '',
  icon,
  ...rest
}) => {
  return (
    <>
      <input
        {...rest}
        value={value}
        onChange={onChange}
        className={[
          'w-full rounded-xl border h-fit border-purple-400 px-4 py-2.5 text-sm',
          'text-neutral-700 placeholder:text-neutral-400',
          'focus:outline-none focus:ring-2 focus:ring-purple-200',
          className,
        ].join(' ')}
      />
      {icon && <span className='ml-2'>{icon}</span>}
    </>
  );
};
