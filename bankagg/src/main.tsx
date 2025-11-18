import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider, useAuth} from './Context/AuthContext';

const AutoRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  // If user is logged in and tries to access /login or /register, redirect to /home
  if (token && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AutoRedirect>
          <App />
        </AutoRedirect>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
