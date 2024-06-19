import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ roles }) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/Login" />;
  }

  // eslint-disable-next-line react/prop-types
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
