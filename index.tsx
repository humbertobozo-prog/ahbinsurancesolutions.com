import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Asynchronously load Google Fonts stylesheet to avoid render-blocking the critical path (retaining preloaded cache)
if (typeof document !== 'undefined') {
  const fontHref = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Roboto:wght@400;500;700&display=swap';
  if (!document.querySelector(`link[href="${fontHref}"][rel="stylesheet"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontHref;
    document.head.appendChild(link);
  }
}

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

// Defer non-critical webVitals performance observer until after window load and idle time
if (typeof window !== 'undefined') {
  const init = () => {
    const scheduleVitals = window.requestIdleCallback || ((cb) => setTimeout(cb, 3000));
    scheduleVitals(() => {
      import('./utils/webVitals').then(({ initWebVitals }) => {
        initWebVitals();
      }).catch(() => {});
    });
  };

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init, { once: true });
  }
}