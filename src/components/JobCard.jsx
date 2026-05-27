import { useState } from 'react';
import DropdownPill from './DropdownPill';

export default function JobCard({ job, updateJob, deleteJob, zIndex }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(job.title);
  
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [editRoleValue, setEditRoleValue] = useState(job.role || '');

  const statusOptions = ["application submitted", "in progress", "rejection", "interview", "accepted"];
  const yesNoOptions = ["yes", "no"];
  const jobTypeOptions = ["full time", "part time", "contract", "internship", "volunteer"];

  const handleSaveTitle = () => {
    if (editTitleValue.trim()) {
      updateJob(job.id, 'title', editTitleValue.trim());
    } else {
      setEditTitleValue(job.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveTitle();
    if (e.key === 'Escape') {
      setEditTitleValue(job.title);
      setIsEditingTitle(false);
    }
  };

  const handleSaveRole = () => {
    updateJob(job.id, 'role', editRoleValue.trim());
    setIsEditingRole(false);
  };

  const handleRoleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveRole();
    if (e.key === 'Escape') {
      setEditRoleValue(job.role || '');
      setIsEditingRole(false);
    }
  };

  return (
    <div className="job-card" style={{ zIndex: zIndex, position: 'relative' }}>
      <div className="job-card-header">
        <div className="job-title-group">
          <div className="job-title-container">
            {isEditingTitle ? (
              <input 
                type="text" 
                className="title-edit-input" 
                value={editTitleValue} 
                onChange={(e) => setEditTitleValue(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
            ) : (
              <>
                <h3 className="job-title">{job.title}</h3>
                <button className="edit-button" onClick={() => setIsEditingTitle(true)} aria-label="Edit application name">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="job-role-container">
            {isEditingRole ? (
              <input 
                type="text" 
                className="role-edit-input" 
                value={editRoleValue} 
                onChange={(e) => setEditRoleValue(e.target.value)}
                onBlur={handleSaveRole}
                onKeyDown={handleRoleKeyDown}
                placeholder="Job title..."
                autoFocus
              />
            ) : (
              <>
                <span className="job-role">{job.role || 'Add job title...'}</span>
                <button className="edit-button-small" onClick={() => setIsEditingRole(true)} aria-label="Edit job title">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="job-actions">
          <button className={`favorite-button ${job.favorite ? 'is-favorite' : ''}`} onClick={() => updateJob(job.id, 'favorite', !job.favorite)} aria-label="Favorite job">
            <svg width="16" height="16" viewBox="0 0 24 24" fill={job.favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
          <button className="delete-button" onClick={() => deleteJob(job.id)} aria-label="Delete job">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="job-card-categories">
        <div className="job-category">
          <span className="category-label">Job Status</span>
          <DropdownPill 
            options={statusOptions} 
            value={job.status} 
            onChange={(val) => updateJob(job.id, 'status', val)}
            label="Job Status"
          />
        </div>
        <div className="job-category">
          <span className="category-label">Job Type</span>
          <DropdownPill 
            options={jobTypeOptions} 
            value={job.jobType || "full time"} 
            onChange={(val) => updateJob(job.id, 'jobType', val)}
            label="Job Type"
          />
        </div>
        <div className="job-category">
          <span className="category-label">Applied</span>
          <DropdownPill 
            options={yesNoOptions} 
            value={job.applied} 
            onChange={(val) => updateJob(job.id, 'applied', val)}
            label="Applied"
          />
        </div>
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
      <div className="job-comments">
        <textarea 
          className="comments-textarea"
          placeholder="Add any notes or comments here... (e.g. Salary, contact info, interview dates)"
          value={job.comments || ''}
          onChange={(e) => updateJob(job.id, 'comments', e.target.value)}
        />
      </div>
    </div>
  );
}
