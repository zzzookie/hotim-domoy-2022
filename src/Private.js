import { Navigate, useLocation } from 'react-router-dom';

export default function Private({ isAllowed, isLoading, redirectTo = 'auth', children }) {
  if (isLoading) {
    return null;
  }
  const location = useLocation();

  return isAllowed ? (
    <>{ children }</>
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}
