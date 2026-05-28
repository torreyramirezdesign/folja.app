import { useState } from 'react';
import DropdownPill from './DropdownPill';

/**
 * JobCard Component
 * 
 * Think of this as a single card component/symbol in Figma.
 * It displays specific details about a job application, including inline text edit boxes
 * for company name and role title, status switches, favorite toggles, and notes.
 */
export default function JobCard({ job, updateJob, deleteJob, zIndex }) {
  
  // ==========================================
  // IN-LINE EDIT STATES (Toggling view vs edit mode)
  // ==========================================
  
  // Controls if we are viewing the job details or editing them simultaneously
  const [isEditing, setIsEditing] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(job.title);
  const [editRoleValue, setEditRoleValue] = useState(job.role || '');

  // ==========================================
  // SELECTOR OPTIONS (Design system values)
  // ==========================================
  const statusOptions = ["application submitted", "in progress", "rejection", "interview", "accepted"];
  const yesNoOptions = ["yes", "no"];
  const jobTypeOptions = ["full time", "part time", "contract", "internship", "volunteer"];

  // ==========================================
  // INTERACTION HANDLERS (Saving changes)
  // ==========================================

  /**
   * Begins the editing session, resetting state to current values
   */
  const startEditing = () => {
    setEditTitleValue(job.title);
    setEditRoleValue(job.role || '');
    setIsEditing(true);
  };

  /**
   * Saves both the company title and job role simultaneously.
   */
  const handleSaveBoth = () => {
    if (editTitleValue.trim()) {
      updateJob(job.id, 'title', editTitleValue.trim());
    } else {
      setEditTitleValue(job.title);
    }
    updateJob(job.id, 'role', editRoleValue.trim());
    setIsEditing(false); // Switch back to static text view mode
  };

  /**
   * Discards any changes and closes the editing fields.
   */
  const handleCancel = () => {
    setEditTitleValue(job.title);
    setEditRoleValue(job.role || '');
    setIsEditing(false);
  };

  /**
   * Listens for key events (Enter to save, Escape to cancel) in either text input.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveBoth(); 
    if (e.key === 'Escape') handleCancel();
  };

  /**
   * Handles saving and closing editing mode when the user clicks away.
   * Special exception: clicking between the two active input boxes won't close editing.
   */
  const handleBlur = (e) => {
    const targetClass = e.relatedTarget?.className;
    if (targetClass === 'title-edit-input' || targetClass === 'role-edit-input') {
      return;
    }
    handleSaveBoth();
  };

  // ==========================================
  // RENDER INTERFACE (Layout HTML/JSX structure)
  // ==========================================
  return (
    // We apply z-index dynamically so active dropdown menus overlap cards below them neatly
    <div className="job-card" style={{ zIndex: zIndex, position: 'relative' }}>
      
      {/* HEADER: Organization, Role */}
      <div className="job-card-header">
        <div className="job-title-group">
          
          {/* Company/Organization Name Block */}
          <div className="job-title-container">
            {isEditing ? (
              // EDIT MODE: Show active input field
              <input 
                type="text" 
                className="title-edit-input" 
                value={editTitleValue} 
                onChange={(e) => setEditTitleValue(e.target.value)}
                onBlur={handleBlur} // Saves automatically if the user clicks away
                onKeyDown={handleKeyDown}
                autoFocus // Focuses the cursor inside the input automatically
              />
            ) : (
              // VIEW MODE: Show static text
              <h3 className="job-title" onClick={startEditing}>{job.title}</h3>
            )}
          </div>
          
          {/* Job Role Title Block (e.g. "Product Designer") */}
          <div className="job-role-container">
            {isEditing ? (
              // EDIT MODE: Show active input field
              <input 
                type="text" 
                className="role-edit-input" 
                value={editRoleValue} 
                onChange={(e) => setEditRoleValue(e.target.value)}
                onBlur={handleBlur} // Saves automatically if the user clicks away
                onKeyDown={handleKeyDown}
                placeholder="Job title..."
              />
            ) : (
              // VIEW MODE: Show static role text or placeholder
              <span className="job-role" onClick={startEditing}>{job.role || 'Add job title...'}</span>
            )}
          </div>
        </div>
      </div>

      {/* TOP RIGHT CARD ACTIONS (Edit, Favorites Star & Delete Trash icon) */}
      <div className="job-actions">
        {/* Toggle Edit Mode */}
        {isEditing ? (
          <button 
            className="edit-button-save" 
            onClick={handleSaveBoth}
            onMouseDown={(e) => e.preventDefault()} // Prevents blur event from firing before click
            aria-label="Save changes"
            style={{ color: '#34D399' }} // Green checkmark
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        ) : (
          <button 
            className="edit-button-action" 
            onClick={startEditing} 
            aria-label="Edit job details"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        )}

        {/* Toggle Favorite Star */}
        <button 
          className={`favorite-button ${job.favorite ? 'is-favorite' : ''}`} 
          onClick={() => updateJob(job.id, 'favorite', !job.favorite)} 
          aria-label="Favorite job"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={job.favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
        
        {/* Delete Card */}
        <button className="delete-button" onClick={() => deleteJob(job.id)} aria-label="Delete job">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>

      {/* CATEGORIES ROW (Status, Job Type, Applied, and Heard Back Dropdown Pills) */}
      <div className="job-card-categories">
        {/* Status Category */}
        <div className="job-category">
          <span className="category-label">Job Status</span>
          <DropdownPill 
            options={statusOptions} 
            value={job.status} 
            onChange={(val) => updateJob(job.id, 'status', val)}
            label="Job Status"
          />
        </div>
        
        {/* Job Type Category (e.g. Contract, Full-time) */}
        <div className="job-category">
          <span className="category-label">Job Type</span>
          <DropdownPill 
            options={jobTypeOptions} 
            value={job.jobType || "full time"} 
            onChange={(val) => updateJob(job.id, 'jobType', val)}
            label="Job Type"
          />
        </div>
        
        {/* Applied Category (Yes / No) */}
        <div className="job-category">
          <span className="category-label">Applied</span>
          <DropdownPill 
            options={yesNoOptions} 
            value={job.applied} 
            onChange={(val) => updateJob(job.id, 'applied', val)}
            label="Applied"
          />
        </div>
        
        {/* Heard Back Category (Yes / No) */}
        <div className="job-category">
          <span className="category-label">Heard Back</span>
          <DropdownPill 
            options={yesNoOptions} 
            value={job.heardBack} 
            onChange={(val) => updateJob(job.id, 'heardBack', val)}
            label="Heard Back"
          />
        </div>
      </div>

      {/* COMMENTS / NOTES SECTION */}
      <div className="job-comments">
        <textarea 
          className="comments-textarea"
          placeholder="Add any notes or comments here... (e.g. Salary, contact info, interview dates)"
          value={job.comments || ''}
          // Saves character updates directly to the persistent array list in real time
          onChange={(e) => updateJob(job.id, 'comments', e.target.value)}
        />
      </div>
    </div>
  );
}
