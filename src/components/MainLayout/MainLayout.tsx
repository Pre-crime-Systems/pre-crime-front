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
  const activeUrl = window.location.pathname;

  return (
    <section className={`mainLayout ${className && className}`}>
      <aside className="mainLayout__aside">
        <section className="asideLogo">
          <label className="asideLogo__name">Pre Crime</label>
        </section>
        <nav className="asideMenu">
          <p className="asideMenu__title">Menú</p>
          <ul className="asideMenu__list">
            <li className="menuItem">
              <a
                className={`menuItem__content ${
                  activeUrl === RoutePaths.Dashboard &&
                  'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Dashboard);
                }}
              >
                <Icon className="itemIcon" type="dashboard" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="menuItem">
              <a className="menuItem__content">
                <Icon className="itemIcon" type="maps" />
                <span>Mapa</span>
              </a>
            </li>
            <li className="menuItem">
              <a
                className={`menuItem__content ${
                  activeUrl === RoutePaths.Reports &&
                  'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Reports);
                }}
              >
                <Icon className="itemIcon" type="reports" />
                <span>Reportes</span>
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
                  activeUrl === RoutePaths.Users && 'menuItem__content--active'
                }`}
                onClick={() => {
                  navigate(RoutePaths.Users);
                }}
              >
                <Icon className="itemIcon" type="users" />
                <span>Usuarios</span>
              </a>
            </li>
            <li className="menuItem">
              <a className="menuItem__content">
                <Icon className="itemIcon" type="logOut" />
                <span>Cerrar sesión</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <section className="mainLayout__right">
        <header className="rightHeader"></header>
        <main className="rightContent">{children}</main>
      </section>
    </section>
  );
};

export default MainLayout;
