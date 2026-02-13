import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginAlert from '../components/LoginAlert';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); 

  if (!user) {
   
    return <LoginAlert />;
  }

  return children;
};

export default ProtectedRoute;