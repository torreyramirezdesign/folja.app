import { useState, useEffect } from 'react';
import JobCard from './components/JobCard';
import './index.css';

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobApplications');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [newJobTitle, setNewJobTitle] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  // Filter and Sort states
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Date Added (Newest)');

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const addJob = (e) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    const newJob = {
      id: crypto.randomUUID(),
      title: newJobTitle.trim(),
      status: 'application submitted',
      applied: 'yes',
      heardBack: 'no',
      createdAt: Date.now(),
      comments: '',
      role: '',
      jobType: 'full time'
    };

    setJobs([newJob, ...jobs]);
    setNewJobTitle('');
  };

  const updateJob = (id, field, value) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, [field]: value } : job
    ));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  // Filter and sort the jobs
  const displayedJobs = jobs
    .filter(job => filterStatus === 'All' || job.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'Favorites') {
        if (a.favorite === b.favorite) {
          return (b.createdAt || 0) - (a.createdAt || 0);
        }
        return a.favorite ? -1 : 1;
      }
      if (sortBy === 'Date Added (Newest)') return (b.createdAt || 0) - (a.createdAt || 0);
      if (sortBy === 'Date Added (Oldest)') return (a.createdAt || 0) - (b.createdAt || 0);
      if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
      if (sortBy === 'Z-A') return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <button 
            className="theme-toggle" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
          >
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

      <main className="app-main">
        <form className="add-job-form" onSubmit={addJob}>
          <div className="input-and-filters">
            <div className="input-row">
              <input 
                type="text" 
                placeholder="Enter company or organization..." 
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                className="job-input"
              />
              <button type="submit" className="add-button">
                <span className="hide-mobile">Add Application</span>
                <span className="show-mobile">Add</span>
              </button>
            </div>
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

        <div className="job-list">
          {displayedJobs.length === 0 ? (
            <div className="empty-state">
              <p>{jobs.length === 0 ? "No applications tracked yet. Add one above to get started!" : "No applications match your filters."}</p>
            </div>
          ) : (
            displayedJobs.map((job, index) => (
              <JobCard 
                key={job.id} 
                job={job} 
                updateJob={updateJob} 
                deleteJob={deleteJob}
                zIndex={displayedJobs.length - index}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
