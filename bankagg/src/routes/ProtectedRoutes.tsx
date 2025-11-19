import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import NotAuthorized from '../Pages/NotAuthorized';

type Props = {
  children: React.ReactNode;
  roles?: string[];      
  requireAuth?: boolean; 
};

const ProtectedRoute: React.FC<Props> = ({ children, roles = [], requireAuth = true }) => {
  const { token, hasRole } = useAuth();

  
  if (requireAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  
  if (roles.length && !hasRole(...roles)) {
    return <NotAuthorized />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
