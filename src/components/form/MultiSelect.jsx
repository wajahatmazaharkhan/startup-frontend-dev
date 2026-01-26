import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, X } from 'lucide-react';

export const PillMultiSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select options',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  const isArrayOptions = Array.isArray(options);

  // 1. Normalize options -> [{ key, label }]
  const normalizedOptions = useMemo(() => {
    if (isArrayOptions) {
      return options.map((item) => ({ key: item, label: item }));
    }
    return Object.entries(options).map(([key, label]) => ({
      key,
      label,
    }));
  }, [options, isArrayOptions]);

  // 2. Filter options based on search term inside the dropdown
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return normalizedOptions;
    return normalizedOptions.filter((opt) =>
      String(opt.label).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [normalizedOptions, searchTerm]);

  // 3. Determine selected keys (Same logic as before)
  const selectedKeys = useMemo(() => {
    if (Array.isArray(value)) return value;
    return value ? Object.keys(value) : [];
  }, [value]);

  // 4. Toggle Logic (Same logic as before)
  const toggleOption = (key, label) => {
    let next;
    if (Array.isArray(value)) {
      next = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key];
    } else if (isArrayOptions) {
      next = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key];
    } else {
      next = { ...(value || {}) };
      if (next[key]) delete next[key];
      else next[key] = label;
    }
    onChange(next);
  };

  // 5. Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm(''); // Reset search on close
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to get label for a selected key (for the input display)
  const getLabelForKey = (key) => {
    const found = normalizedOptions.find((opt) => opt.key === key);
    return found ? found.label : key;
  };

  return (
    <div className='relative w-full' ref={containerRef}>
      {/* TRIGGER INPUT */}
      <div
        className='flex min-h-[42px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-2xl border border-gray-300 bg-white px-3 py-2 transition hover:border-purple-400'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedKeys.length === 0 ? (
          <span className='text-sm text-gray-400'>{placeholder}</span>
        ) : (
          selectedKeys.map((key) => (
            <span
              key={key}
              className='flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700'
              onClick={(e) => e.stopPropagation()} // Prevent opening dropdown when clicking a tag
            >
              {getLabelForKey(key)}
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(key, getLabelForKey(key));
                }}
                className='ml-1 rounded-full p-0.5 hover:bg-purple-200'
              >
                <X size={12} />
              </button>
            </span>
          ))
        )}

        <div className='ml-auto pl-2'>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className='absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white p-3 shadow-lg'>
          {/* Optional: Search Input inside dropdown */}
          <input
            type='text'
            className='mb-2 w-full rounded-md border border-gray-200 px-2 py-1 text-sm focus:border-purple-500 focus:outline-hidden'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />

          <div className='flex flex-wrap gap-2'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(({ key, label }) => {
                const selected = selectedKeys.includes(key);
                return (
                  <button
                    type='button'
                    key={key}
                    onClick={() => toggleOption(key, label)}
                    className={[
                      'rounded-full px-3 py-1 text-sm transition',
                      selected
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-purple-300',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                );
              })
            ) : (
              <p className='text-sm text-gray-400 w-full text-center py-2'>
                No options found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
