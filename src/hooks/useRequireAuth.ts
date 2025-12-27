import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type AppRole = 'user' | 'admin';

interface UseRequireAuthOptions {
  redirectTo?: string;
  requiredRole?: AppRole;
}

export const useRequireAuth = (options: UseRequireAuthOptions = {}) => {
  const { redirectTo = '/auth', requiredRole } = options;
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate(redirectTo);
      return;
    }

    if (requiredRole && role !== requiredRole) {
      // User doesn't have the required role
      navigate('/dashboard');
    }
  }, [user, role, loading, navigate, redirectTo, requiredRole]);

  return { user, role, loading };
};
