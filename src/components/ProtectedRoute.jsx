import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  // Show loading state during authentication check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Redirect to login if user is not authenticated
  if (!currentUser) {
    // Save the attempted location for redirection after login
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  
  // Render children if user is authenticated
  return children;
};

export default ProtectedRoute;
