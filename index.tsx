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