import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A component that guards routes based on user roles
 */
const RoleGuard = ({ children, allowedRoles, redirectTo }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  // Show loading indicator while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If not authenticated at all, redirect to login with return path
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  
  // Convert allowed roles to array if it's a string
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  // Check if user has the required role
  if (!roles.includes(currentUser.role)) {
    // Use different redirects based on role
    const defaultRedirect = currentUser.role === 'admin' ? '/admin' : '/';
    return <Navigate to={redirectTo || defaultRedirect} replace />;
  }
  
  // User is authorized, render children
  return children;
};

export default RoleGuard;
