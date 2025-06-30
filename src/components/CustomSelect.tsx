import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  maxDisplayLength?: number;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  label,
  icon,
  maxDisplayLength = 25,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.2,
      },
    }),
  };

  return (
    <div className='relative' ref={selectRef}>
      {label && (
        <label className='mb-2 flex items-center text-sm font-medium text-gray-300'>
          {icon && <span className='mr-1 inline'>{icon}</span>}
          {label}
        </label>
      )}

      <motion.div
        className={`relative w-full rounded-xl border border-dark-600 bg-dark-800/50 transition-all duration-300 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 ${className}`}
        whileFocus={{ scale: 1.02 }}
      >
        <button
          type='button'
          onClick={handleToggle}
          className='flex w-full items-center justify-between px-4 py-4 text-left text-white'
          aria-haspopup='listbox'
          aria-expanded={isOpen}
        >
          <span className='block truncate'>
            {selectedOption
              ? truncateText(selectedOption.label, maxDisplayLength)
              : truncateText(placeholder, maxDisplayLength)}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} className='text-gray-400' />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='absolute z-50 mt-1 w-full rounded-xl border border-dark-600 bg-dark-800/95 shadow-xl backdrop-blur-sm'
              variants={dropdownVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <div className='p-2'>
                <input
                  ref={inputRef}
                  type='text'
                  placeholder='Search options...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full rounded-lg border border-dark-600 bg-dark-700/50 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500'
                />
              </div>

              <div className='max-h-56 overflow-y-auto'>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type='button'
                      onClick={() => handleOptionSelect(option.value)}
                      className={`flex w-full items-center px-4 py-3 text-left text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-cyan-600/20 ${
                        value === option.value
                          ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      variants={optionVariants}
                      initial='hidden'
                      animate='visible'
                      custom={index}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className='w-full truncate'>
                        {truncateText(option.label, maxDisplayLength)}
                      </span>
                    </motion.button>
                  ))
                ) : (
                  <div className='px-4 py-3 text-sm text-gray-400'>
                    No options found!
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CustomSelect;
