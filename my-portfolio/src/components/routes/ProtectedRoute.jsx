import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ fixed import

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem('token');
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedRoute;
