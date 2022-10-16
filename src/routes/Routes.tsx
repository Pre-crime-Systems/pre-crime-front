import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../modules/dashboard/pages/Dashboard/Dashboard';
import Login from '../modules/auth/pages/Login/Login';
import NewPassword from '../modules/auth/pages/NewPassword/NewPassword';
import CrimesInit from '../modules/crimes/pages/CrimesInit';
import ReportsInit from '../modules/reports/pages/ReportsInit';
import UsersInit from '../modules/users/pages/UsersInit';
import Map from '../modules/map/pages/Map/Map';
import ResetPassword from '../modules/auth/pages/ResetPassword/ResetPassword';
import Store from '../redux/Store';
import { RoutePaths } from './routePaths';

const AppRoutes = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          {/* auth routes */}
          <Route path={RoutePaths.Login} element={<Login />} />
          <Route path={RoutePaths.ResetPassword} element={<ResetPassword />} />
          <Route path={RoutePaths.NewPassword} element={<NewPassword />} />
          {/* app routes */}
          <Route path={RoutePaths.Dashboard} element={<Dashboard />} />
          <Route path={RoutePaths.Map} element={<Map />} />
          <Route path={RoutePaths.Crimes} element={<CrimesInit />} />
          <Route path={RoutePaths.Reports} element={<ReportsInit />} />
          <Route path={RoutePaths.Users} element={<UsersInit />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRoutes;
