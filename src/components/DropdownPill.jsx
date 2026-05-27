import { useState, useRef, useEffect } from 'react';

export default function DropdownPill({ options, value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute a class based on the value for styling specific colors (e.g., green for accepted, red for rejection)
  const getValueClass = (val) => {
    if (!val) return '';
    return val.replace(/\s+/g, '-').toLowerCase();
  };

  return (
    <div className="dropdown-pill-container" ref={dropdownRef}>
      <button 
        className={`dropdown-pill-button ${value ? 'has-value' : ''} value-${getValueClass(value)}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={label}
      >
        <span className="dropdown-pill-text">{value || 'Select...'}</span>
        <svg className={`dropdown-pill-icon ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {isOpen && (
        <ul className="dropdown-pill-menu">
          {options.map((option) => (
            <li 
              key={option} 
              className={`dropdown-pill-item ${value === option ? 'selected' : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
