import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
  placeholder = "Select an option",
  className = "",
  label,
  icon,
  maxDisplayLength = 25,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOption = options.find((option) => option.value === value);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.1 } },
  };

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-fg">
          {icon && <span className="inline text-muted">{icon}</span>}
          {label}
        </label>
      )}

      <div
        className={`relative w-full rounded-md border border-rule bg-raised transition-colors focus-within:border-accent ${className}`}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={`block truncate ${selectedOption ? "text-fg" : "text-muted"}`}
          >
            {selectedOption
              ? truncateText(selectedOption.label, maxDisplayLength)
              : truncateText(placeholder, maxDisplayLength)}
          </span>
          <ChevronDown size={18} className="shrink-0 text-muted" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute z-50 mt-1 w-full rounded-md border border-rule bg-raised"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="border-b border-rule p-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-rule bg-ink px-3 py-2 text-sm text-fg transition-colors placeholder:text-muted focus:border-accent"
                />
              </div>

              <div className="max-h-56 overflow-y-auto py-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const isSelected = value === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleOptionSelect(option.value)}
                        className={`flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent/10 hover:text-white focus-visible:bg-accent/10 focus-visible:text-white ${
                          isSelected ? "text-white" : "text-fg"
                        }`}
                      >
                        <span className="truncate">
                          {truncateText(option.label, maxDisplayLength)}
                        </span>
                        {isSelected && (
                          <Check
                            size={16}
                            className="shrink-0 text-accent"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-2.5 text-sm text-muted">
                    No options found!
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomSelect;
