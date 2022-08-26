import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import './mainLayout.scss';

interface MainLayoutProps {
  children: React.ReactElement;
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children } = props;
  const navigate = useNavigate();
  const activeUrl = window.location.pathname;

  return (
    <section className="mainLayout">
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
                Dashboard
              </a>
            </li>
            <li className="menuItem">
              <a className="menuItem__content">Mapa</a>
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
                Reportes
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
                Usuarios
              </a>
            </li>
            <li className="menuItem">
              <a className="menuItem__content">Cerrar sesión</a>
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
