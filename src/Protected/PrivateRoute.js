import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
  
  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
