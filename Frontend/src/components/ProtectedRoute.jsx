import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAdminLoggedIn =
    localStorage.getItem("isAdminLoggedIn");

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

export default ProtectedRoute;