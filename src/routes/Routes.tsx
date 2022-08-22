import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../modules/auth/pages/Login/Login';
import NewPassword from '../modules/auth/pages/NewPassword/NewPassword';
import ResetPassword from '../modules/auth/pages/ResetPassword/ResetPassword';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/new-password" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
