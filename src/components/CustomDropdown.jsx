import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const STATUS_COLORS = {
  Pending: {
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:border-amber-500/60',
    dot: 'bg-amber-500',
    activeOption: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
  },
  Shortlisted: {
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:border-emerald-500/60',
    dot: 'bg-emerald-500',
    activeOption: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
  },
  Reviewed: {
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:border-blue-500/60',
    dot: 'bg-blue-500',
    activeOption: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
  },
  Rejected: {
    badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:border-rose-500/60',
    dot: 'bg-rose-500',
    activeOption: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
  }
};

const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  variant = 'default', // 'default' | 'form' | 'filter' | 'status'
  className = '',
  dropdownClassName = '',
  disabled = false,
  align = 'left',
  direction = 'auto' // 'auto' | 'down' | 'up'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const dropdownRef = useRef(null);

  // Auto detect if dropdown should open upward
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      if (direction === 'up') {
        setOpenUp(true);
      } else if (direction === 'down') {
        setOpenUp(false);
      } else {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceNeeded = 220; // approximate max dropdown height
        if (spaceBelow < spaceNeeded && rect.top > spaceNeeded) {
          setOpenUp(true);
        } else {
          setOpenUp(false);
        }
      }
    }
  }, [isOpen, direction]);

  // Close on outside click and Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Normalize options array: support both string items and { value, label } items
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return { value: opt.value, label: opt.label ?? opt.value };
    }
    return { value: opt, label: opt };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  // Button styles by variant
  let buttonStyle = '';
  if (variant === 'form') {
    buttonStyle = `w-full px-4 py-3.5 rounded-2xl bg-white/60 dark:bg-[#0c0c0e]/80 backdrop-blur-md border ${
      isOpen ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-slate-200/60 dark:border-white/10 hover:border-cyan-500/40'
    } text-slate-900 dark:text-white font-mono text-sm transition-all flex items-center justify-between gap-3 text-left`;
  } else if (variant === 'filter') {
    buttonStyle = `w-full bg-slate-100 dark:bg-white/5 border ${
      isOpen ? 'border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.2)]' : 'border-slate-200 dark:border-white/10 hover:border-cyan-500/40'
    } rounded-xl py-2.5 px-4 text-xs font-mono text-slate-700 dark:text-gray-300 transition-all flex items-center justify-between gap-2 text-left`;
  } else if (variant === 'status') {
    const colorInfo = STATUS_COLORS[value] || STATUS_COLORS.Pending;
    buttonStyle = `px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-between gap-1.5 ${colorInfo.badge} ${
      isOpen ? 'ring-2 ring-cyan-500/30 scale-105' : ''
    }`;
  } else {
    buttonStyle = `flex items-center justify-between gap-2 bg-white/80 dark:bg-[#0c0c0c] backdrop-blur-xl px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-200 hover:border-cyan-500 transition-all w-full text-left`;
  }

  return (
    <div
      ref={dropdownRef}
      className={`relative select-none ${isOpen ? 'z-[999]' : 'z-10'} ${className}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`${buttonStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="truncate flex items-center gap-2">
          {variant === 'status' && (
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                STATUS_COLORS[value]?.dot || 'bg-amber-500'
              }`}
            />
          )}
          {displayLabel}
        </span>
        <ChevronDown
          size={variant === 'status' ? 12 : 14}
          className={`shrink-0 text-cyan-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openUp ? -8 : 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUp ? -8 : 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'} min-w-[170px] w-full bg-white dark:bg-[#0c0c0f] border border-slate-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-1.5 z-[9999] backdrop-blur-2xl max-h-64 overflow-y-auto ${
              align === 'right' ? 'right-0' : 'left-0'
            } ${dropdownClassName}`}
            style={{
              scrollbarWidth: 'thin'
            }}
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              const statusColor = variant === 'status' ? STATUS_COLORS[opt.value] : null;

              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center justify-between gap-2 my-0.5 ${
                    isSelected
                      ? statusColor
                        ? `${statusColor.activeOption} font-bold`
                        : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    {variant === 'status' && statusColor && (
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
                    )}
                    <span className="truncate">{opt.label}</span>
                  </span>
                  {isSelected && (
                    <Check size={13} className="shrink-0 text-cyan-500" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
