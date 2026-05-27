import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ErrorPage from "./pages/ErrorPage";
import CheckedPage from "./pages/CheckedPage";
import FailedPage from "./pages/FailedPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checked" element={<CheckedPage />} />
      <Route path="/failed" element={<FailedPage />} />
      <Route path="/missing" element={<ErrorPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
