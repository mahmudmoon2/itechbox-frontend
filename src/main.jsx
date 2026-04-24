// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { StoreProvider } from './context/StoreContext.jsx'; // এই লাইনটা ইমপোর্ট করতে হবে
import { AuthProvider } from './context/AuthContext.jsx'; // যদি Authentication Context ব্যবহার করতে চান

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* সবার বাইরে রাখুন */}
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
);