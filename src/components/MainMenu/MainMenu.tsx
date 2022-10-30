import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { RoutePaths } from '../../routes/routePaths';
import * as localStorage from '../../utils/localStorage.util';
import Icon from '../Icon/Icon';
import './mainMenu.scss';

interface MainMenuProps {
  className: string;
}

const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const activePath = window.location.pathname;

  useEffect(() => {
    if (window?.location?.pathname.indexOf('/app/') > -1) {
      const token = localStorage.getToken() || '';
      if (token.length === 0) {
        navigate(RoutePaths.Login);
      } else {
        const tokenDecoded: any = jwt_decode(token);
        setIsAdmin(tokenDecoded?.isAdmin || false);
        setUsername(tokenDecoded?.sub);
      }
    }
  }, []);

  return (
    <section className={className}>
      <p className="menuUsername">Hola {username}!</p>
      <div className="menuBorder"></div>
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
          {isAdmin && (
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
          )}
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
