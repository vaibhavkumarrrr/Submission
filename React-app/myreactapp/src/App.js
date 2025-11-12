import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Users from './pages/Users';
import About from './pages/About';
import Landing from './pages/Landing';
import NotFound from './pages/NotFoundPage';

export default function App() {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '');

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJwt('');
  };

  const handleLogin = (token) => {
    localStorage.setItem('jwt', token);
    setJwt(token);
  };

  return (
    <Router>
      <div className="app-container">
        {jwt && <Navbar onLogout={handleLogout} />}

        <Routes>
          {!jwt ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />
              <Route path="/register" element={<AuthForm onLogin={handleLogin} />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users jwt={jwt} />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
