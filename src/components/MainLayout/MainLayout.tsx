import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import Icon from '../Icon/Icon';
import './mainLayout.scss';

interface MainLayoutProps {
  children: React.ReactElement;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children, className } = props;
  const navigate = useNavigate();
  const activePath = window.location.pathname;

  const getNameByPath = (path: string) => {
    switch (path) {
      case RoutePaths.Dashboard:
        return 'Dashboard';
      case RoutePaths.Map:
        return 'Mapa';
      case RoutePaths.Reports:
        return 'Reportes';
      case RoutePaths.Crimes:
        return 'Crímenes';
      case RoutePaths.Users:
        return 'Usuarios';
    }
  };

  return (
    <section className={`mainLayout ${className && className}`}>
      <aside className="mainLayout__aside">
        <section className="asideLogo">
          <label className="asideLogo__name">PreCrime</label>
        </section>
        <nav className="asideMenu">
          <p className="asideMenu__title">Menú</p>
          <ul className="asideMenu__list">
            <li className="menuItem">
              <a
                className={`menuItem__content ${
                  activePath === RoutePaths.Dashboard &&
                  'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Dashboard);
                }}
              >
                <Icon className="itemIcon" type="dashboard" />
                <span className="itemText">Dashboard</span>
              </a>
            </li>
            <li className="menuItem">
              <a
                className={`menuItem__content ${
                  activePath === RoutePaths.Map && 'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Map);
                }}
              >
                <Icon className="itemIcon" type="maps" />
                <span className="itemText">Mapa</span>
              </a>
            </li>
            <li className="menuItem">
              <a
                className={`menuItem__content ${
                  activePath === RoutePaths.Reports &&
                  'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Reports);
                }}
              >
                <Icon className="itemIcon" type="reports" />
                <span className="itemText">Reportes</span>
              </a>
            </li>
            <li className="menuItem">
              <a
                className={`menuItem__content ${
                  activePath === RoutePaths.Crimes &&
                  'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Crimes);
                }}
              >
                <Icon className="itemIcon" type="reports" />
                <span className="itemText">Crímenes</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="menuBorder"></div>
        <nav className="asideMenu">
          <p className="asideMenu__title">Cuenta</p>
          <ul className="asideMenu__list">
            <li className="menuItem">
              <a
                className={`menuItem__content ${
                  activePath === RoutePaths.Users && 'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Users);
                }}
              >
                <Icon className="itemIcon" type="users" />
                <span className="itemText">Usuarios</span>
              </a>
            </li>
            <li className="menuItem">
              <a className="menuItem__content">
                <Icon className="itemIcon" type="logOut" />
                <span className="itemText">Cerrar sesión</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <section className="mainLayout__right">
        <header className="rightHeader">
          <h1>{getNameByPath(activePath)}</h1>
        </header>
        <main className="rightContent">{children}</main>
      </section>
    </section>
  );
};

export default MainLayout;
