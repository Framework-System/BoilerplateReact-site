import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export const RequireAuth = ({
  children,
  redirectTo = '/login',
}: PrivateRouteProps) => {
  const { checkTokenExpiration } = useAuth();
  const location = useLocation();

  if (!checkTokenExpiration) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children as React.ReactElement;
};
