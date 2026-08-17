import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Defer non-critical performance observer until browser is idle
if (typeof window !== 'undefined') {
  const scheduleVitals = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
  scheduleVitals(() => {
    import('./utils/webVitals').then(({ initWebVitals }) => {
      initWebVitals();
    }).catch(() => {});
  });
}