import React from 'react';

/**
 *
 ** @param {Object} props
 * @param {string | number} [props.value] - Selected value
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} [props.onChange]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} props.rest
 */
export const PillSelect = ({
  value,
  onChange,
  children,
  className = '',
  icon,
  ...rest
}) => {
  return (
    <>
      <select
        {...rest}
        value={value}
        onChange={onChange}
        className={[
          'w-full rounded-xl border border-purple-400 px-4 py-2.5 text-sm',
          'text-neutral-700',
          'focus:outline-none focus:ring-2 focus:ring-purple-200',
          className,
        ].join(' ')}
      >
        {children}
      </select>
      {icon && <span className='ml-2'>{icon}</span>}
    </>
  );
};
