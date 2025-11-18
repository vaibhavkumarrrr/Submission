import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './componenets/NavBar';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Accounts from './Pages/Accounts';
import Banks from './Pages/Banks';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotAuthorized from './Pages/NotAuthorized';
import NotFound from './Pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoutes';


const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected: Home (any authenticated user) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protected: Accounts (any authenticated user) */}
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        />

        {/* Protected: Banks (only Admin or SuperAdmin) */}
        <Route
          path="/banks"
          element={
            <ProtectedRoute roles={['admin', 'superadmin']}>
              <Banks />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;