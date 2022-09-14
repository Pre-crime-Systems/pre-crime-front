import React, { useState } from 'react';
import cx from 'classnames';
import { RoutePaths } from '../../routes/routePaths';
import Icon from '../Icon/Icon';
import MainMenu from '../MainMenu/MainMenu';
import './mainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children, className } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);
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
        <section
          className={cx('asideOptions', showMenu && 'asideOptions--show')}
        >
          <MainMenu className="asideOptions__desktop" />
          <div
            className={cx(
              'asideOptions__mobile',
              showMenu && 'asideOptions__mobile--show'
            )}
          >
            <button
              className="menuButton"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <Icon className="menuButton__icon" type="menu" />
            </button>
            <MainMenu className="menuContent" />
          </div>
        </section>
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
