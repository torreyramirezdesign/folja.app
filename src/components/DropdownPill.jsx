import { useState, useRef, useEffect } from 'react';

/**
 * DropdownPill Component
 * 
 * A premium design system component (like an interactive dropdown select).
 * It displays the current value inside a rounded pill and expands a clean, absolute-positioned
 * popover overlay list when clicked. It automatically closes if the user clicks anywhere else on the screen!
 */
export default function DropdownPill({ options, value, onChange, label }) {
  
  // Controls whether the popover overlay menu is active (visible) or not
  const [isOpen, setIsOpen] = useState(false);
  
  // `dropdownRef` creates a direct reference link to this HTML container element.
  // This allows us to track if clicks are happening inside or outside this specific component!
  const dropdownRef = useRef(null);

  // ==========================================
  // CLICK-AWAY LISTENER (The auto-closing magic)
  // ==========================================
  useEffect(() => {
    // Function that runs every time the mouse is clicked
    const handleClickOutside = (event) => {
      // If the clicked target is NOT inside our dropdown container, close the menu!
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    // Register the listener on the global document page
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup: remove the event listener if the component is ever removed from screen
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Helper function: Converts text values into a dash-separated CSS class name.
   * e.g. "application submitted" becomes "application-submitted" so we can apply specific theme styles!
   */
  const getValueClass = (val) => {
    if (!val) return '';
    return val.replace(/\s+/g, '-').toLowerCase();
  };

  return (
    // We attach `ref={dropdownRef}` to target this element in the DOM click-away code above
    <div className="dropdown-pill-container" ref={dropdownRef}>
      
      {/* Pill Toggle Button */}
      <button 
        // We dynamically inject background styling classes based on selected values (e.g. green for accepted, red for rejection)
        className={`dropdown-pill-button ${value ? 'has-value' : ''} value-${getValueClass(value)}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={label}
      >
        <span className="dropdown-pill-text">{value || 'Select...'}</span>
        
        {/* Dropdown Chevron arrow (automatically rotates when open via a CSS class trigger) */}
        <svg className={`dropdown-pill-icon ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Popover overlay menu: Render only when state is open */}
      {isOpen && (
        <ul className="dropdown-pill-menu">
          {/* Map through each array item to build interactive list items */}
          {options.map((option) => (
            <li 
              key={option} 
              className={`dropdown-pill-item ${value === option ? 'selected' : ''}`}
              onClick={() => {
                onChange(option); // Notifies the parent JobCard of the value change
                setIsOpen(false); // Close the menu popover immediately
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
