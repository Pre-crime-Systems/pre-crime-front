import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../modules/dashboard/pages/Dashboard/Dashboard';
import Login from '../modules/auth/pages/Login/Login';
import NewPassword from '../modules/auth/pages/NewPassword/NewPassword';
import Reports from '../modules/reports/pages/Reports/Reports';
import Crimes from '../modules/crimes/pages/Crimes/Crimes';
import Map from '../modules/map/pages/Map/Map';
import ResetPassword from '../modules/auth/pages/ResetPassword/ResetPassword';
import Users from '../modules/users/pages/Users/Users';
import { RoutePaths } from './routePaths';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route path={RoutePaths.Login} element={<Login />} />
        <Route path={RoutePaths.ResetPassword} element={<ResetPassword />} />
        <Route path={RoutePaths.NewPassword} element={<NewPassword />} />
        {/* app routes */}
        <Route path={RoutePaths.Dashboard} element={<Dashboard />} />
        <Route path={RoutePaths.Map} element={<Map />} />
        <Route path={RoutePaths.Reports} element={<Reports />} />
        <Route path={RoutePaths.Crimes} element={<Crimes />} />
        <Route path={RoutePaths.Users} element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
