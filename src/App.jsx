import { useState, useEffect } from 'react';
import JobCard from './components/JobCard';
import './index.css';

/**
 * App Component
 * 
 * Think of this as the "Main Layout" or the "Artboard Container" of our application.
 * It houses all the application's global information (State), controls light/dark modes,
 * manages the list of jobs, and filters the results.
 */
function App() {
  
  // ==========================================
  // STATE MANAGEMENT (Think: Dynamic Content Variables)
  // ==========================================
  
  // `jobs` represents our list of job application objects.
  // We initialize it by checking the browser's persistent memory (localStorage)
  // so the user's jobs are saved even if they refresh the tab!
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobApplications');
    // If we have saved jobs, parse them from string back to JavaScript array; otherwise, start empty
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  // `newJobTitle` holds the current text value of the search/input box as the user types.
  const [newJobTitle, setNewJobTitle] = useState('');

  // `isDarkMode` controls whether we show the dark mode or light mode layout.
  // We default to true (dark mode) as designed.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  // `filterStatus` controls which status category of jobs is visible (e.g. 'interview', 'accepted', 'All').
  const [filterStatus, setFilterStatus] = useState('All');

  // `sortBy` determines the ordering algorithm for listing the job cards.
  const [sortBy, setSortBy] = useState('Date Added (Newest)');

  // `layoutMode` controls whether we show the jobs in a vertical card layout or a horizontal spreadsheet layout.
  const [layoutMode, setLayoutMode] = useState(() => {
    const saved = localStorage.getItem('layoutMode');
    return saved || 'horizontal';
  });

  // `showSplash` controls the initial mobile loading screen logic
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('hasSeenSplash');
  });

  // ==========================================
  // SIDE EFFECTS (Think: Event Listeners & Global Actions)
  // ==========================================

  // Whenever the `jobs` list changes, we save the updated list to localStorage.
  // This behaves like an autosave feature!
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  // Whenever `isDarkMode` changes, we toggle the class on the HTML `<body>`
  // so our CSS variables automatically switch theme colors!
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  // Save the user's preferred layout mode to localStorage
  useEffect(() => {
    localStorage.setItem('layoutMode', layoutMode);
  }, [layoutMode]);

  // Handle the initial mobile splash screen timer
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 2000); // Display loading screen for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Lock the mobile viewport aspect ratio by disabling multi-touch pinch and rapid double-tap zooming
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    let lastTouchTime = 0;
    const handleTouchEnd = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTouchTime <= 300) {
        e.preventDefault();
      }
      lastTouchTime = currentTime;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // ==========================================
  // BUSINESS LOGIC FUNCTIONS (Think: Interaction Actions)
  // ==========================================

  /**
   * Adds a new job tracking card to our state list.
   * Runs when the user submits the add job form.
   */
  const addJob = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    if (!newJobTitle.trim()) return; // Don't add anything if the input is empty or just spaces

    // Define the structural model of a new job entry
    const newJob = {
      id: crypto.randomUUID(), // Generates a unique secure ID string (e.g. "f81d4fae-7dec-11d0-a765-00a0c91e6bf6")
      title: newJobTitle.trim(),
      status: 'application submitted',
      applied: 'yes',
      heardBack: 'no',
      createdAt: Date.now(), // Timestamp for sorting
      comments: '',
      role: '',
      jobType: 'full time'
    };

    // Prepend the new job card to the top of the list
    setJobs([newJob, ...jobs]);
    setNewJobTitle(''); // Clear the text input for the next entry
  };

  /**
   * Updates a single property of a job (like renaming the title or comments).
   */
  const updateJob = (id, field, value) => {
    setJobs(jobs.map(job => 
      // If this matches the target card ID, update only the specified property; otherwise leave as is
      job.id === id ? { ...job, [field]: value } : job
    ));
  };

  /**
   * Deletes a job card completely from the array list.
   */
  const deleteJob = (id) => {
    // Keep only the cards that DO NOT match the deleted card's ID
    setJobs(jobs.filter(job => job.id !== id));
  };

  // ==========================================
  // FILTER & SORT ENGINE (Dynamic Filtering)
  // ==========================================
  
  // Here we dynamically filter and sort the jobs array *before* rendering it to the screen.
  const displayedJobs = jobs
    .filter(job => filterStatus === 'All' || job.status === filterStatus)
    .sort((a, b) => {
      // Sort favorite items to the top if requested
      if (sortBy === 'Favorites') {
        if (a.favorite === b.favorite) {
          return (b.createdAt || 0) - (a.createdAt || 0); // fallback to timestamp if both are starred or not starred
        }
        return a.favorite ? -1 : 1; // puts favorite first
      }
      
      // Date and alphabetical sorts
      if (sortBy === 'Date Added (Newest)') return (b.createdAt || 0) - (a.createdAt || 0);
      if (sortBy === 'Date Added (Oldest)') return (a.createdAt || 0) - (b.createdAt || 0);
      if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
      if (sortBy === 'Z-A') return b.title.localeCompare(a.title);
      return 0;
    });

  // ==========================================
  // MARKUP RENDERING (Think: HTML/JSX Structure)
  // ==========================================
  return (
    <>
      {showSplash && (
        <div className="mobile-splash-screen">
          <h1>följa</h1>
        </div>
      )}
      <div className="app-container">
        {/* HEADER SECTION (Brand & Theme Switcher) */}
      <header className="app-header">
        <div className="header-top" style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="theme-toggle" 
            onClick={() => setLayoutMode(layoutMode === 'vertical' ? 'horizontal' : 'vertical')}
            aria-label="Toggle layout"
          >
            {layoutMode === 'vertical' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" title="Horizontal Layout"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" title="Vertical Layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            )}
          </button>
          <button 
            className="theme-toggle" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
          >
            {/* Display Moon or Sun SVG depending on light/dark mode state */}
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
        </div>
        <h1>följa</h1>
        <p>Keep your job applications organized.</p>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="app-main">
        
        {/* ADD APPLICATION FORM & CONTROLS */}
        <form className="add-job-form" onSubmit={addJob}>
          <div className="input-and-filters">
            {/* Input line for typing organization names */}
            <div className="input-row">
              <input 
                type="text" 
                placeholder="Enter company or organization..." 
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                className="job-input"
              />
              <button type="submit" className="add-button">
                {/* Shows responsive text depending on media query CSS class names */}
                <span className="hide-mobile">Add Application</span>
                <span className="show-mobile">Add</span>
              </button>
            </div>
            
            {/* Filtering and sorting selectors */}
            <div className="filter-bar">
              <div className="filter-group">
                <label>Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option>Favorites</option>
                  <option>Date Added (Newest)</option>
                  <option>Date Added (Oldest)</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Filter Status</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Statuses</option>
                  <option value="in progress">In Progress</option>
                  <option value="application submitted">Application Submitted</option>
                  <option value="interview">Interview</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejection">Rejection</option>
                </select>
              </div>
            </div>
          </div>
        </form>

        {/* JOB CARDS CONTAINER GRID/LIST */}
        <div className={`job-list ${layoutMode === 'horizontal' ? 'layout-horizontal' : ''}`}>
          {displayedJobs.length === 0 ? (
            // Empty State (no job cards match current selection)
            <div className="empty-state">
              <p>{jobs.length === 0 ? "No applications tracked yet. Add one above to get started!" : "No applications match your filters."}</p>
            </div>
          ) : (
            // Render each job card entry in order
            displayedJobs.map((job, index) => (
              <JobCard 
                key={job.id} 
                job={job} 
                updateJob={updateJob} 
                deleteJob={deleteJob}
                // Decrement z-index so dropdown menus from upper cards sit on top of lower cards beautifully
                zIndex={displayedJobs.length - index}
              />
            ))
          )}
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
