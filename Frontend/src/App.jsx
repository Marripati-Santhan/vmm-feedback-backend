import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import StoreServices from "./pages/StoreServices";
import StaffReviews from "./pages/StaffReviews";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/store-services"
          element={<StoreServices />}
        />

        <Route
          path="/staff-reviews"
          element={<StaffReviews />}
        />
        <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
     <Route
  path="/admin-login"
  element={<AdminLogin />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;