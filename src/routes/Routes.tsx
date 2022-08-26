import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../modules/auth/pages/Login/Login';
import NewPassword from '../modules/auth/pages/NewPassword/NewPassword';
import ResetPassword from '../modules/auth/pages/ResetPassword/ResetPassword';
import Dashboard from '../modules/dashboard/pages/Dashboard/Dashboard';
import Reports from '../modules/reports/pages/Reports/Reports';
import Users from '../modules/users/pages/Users/Users';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/new-password" element={<NewPassword />} />
        {/* app routes */}
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/reports" element={<Reports />} />
        <Route path="/app/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
