import React, { useEffect } from 'react';
import { useAuthStore } from './store/authStore';


const AppInit: React.FC = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    checkAuth(); // Check authentication on app load
  }, [checkAuth]);

  return null; // No UI for this component
};

export default AppInit;
