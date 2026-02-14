
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Shim process.env for the browser environment.
 * The @google/genai SDK often expects process.env.API_KEY to be available.
 * We bridge Vite's standard import.meta.env system to this shim.
 */
if (typeof (window as any).process === 'undefined') {
  (window as any).process = {
    env: {
      // Fixed: Cast import.meta to any to resolve "Property 'env' does not exist on type 'ImportMeta'"
      API_KEY: (import.meta as any).env.VITE_API_KEY
    }
  };
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
