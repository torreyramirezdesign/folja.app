import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * React Application Entry Point
 * 
 * Think of this as the main mount script. 
 * We select the basic `<div id="root"></div>` placeholder container inside index.html,
 * inject our React root engine inside it, and render the global <App /> container!
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// ==========================================
// PWA SERVICE WORKER REGISTRATION
// ==========================================
// Check if the browser supports Service Workers (used for offline storage and PWA installers)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register sw.js to cache static website files and prompt the user to install Följa on their home screen!
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registered successfully:', reg.scope))
      .catch((err) => console.error('Service Worker registration failed:', err));
  });
}
