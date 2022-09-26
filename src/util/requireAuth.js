import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from './auth';

function RequireAuth({ children }) {
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
