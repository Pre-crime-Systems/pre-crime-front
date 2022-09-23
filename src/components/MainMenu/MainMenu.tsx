import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import Icon from '../Icon/Icon';
import './mainMenu.scss';

interface MainMenuProps {
  className: string;
}

const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const activePath = window.location.pathname;

  return (
    <section className={className}>
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
                activePath === RoutePaths.Crimes && 'menuItem__content--active'
              }`}
              onClick={() => {
                navigate(RoutePaths.Crimes);
              }}
            >
              <Icon className="itemIcon" type="finger-print" />
              <span className="itemText">Crímenes</span>
            </a>
          </li>
          <li className="menuItem">
            <a
              className={`menuItem__content ${
                activePath === RoutePaths.Reports && 'menuItem__content--active'
              }`}
              onClick={() => {
                navigate(RoutePaths.Reports);
              }}
            >
              <Icon className="itemIcon" type="reports" />
              <span className="itemText">Reportes</span>
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
            <a
              className="menuItem__content"
              onClick={() => {
                navigate(RoutePaths.Login);
              }}
            >
              <Icon className="itemIcon" type="logOut" />
              <span className="itemText">Cerrar sesión</span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default MainMenu;
