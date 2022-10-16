import React, { useState } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/Store';
import { ILoadingBox } from '../../redux/models/LoadingBox.model';
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
  const loadingBoxState: ILoadingBox = useSelector(
    (store: AppStore) => store.loadingBox
  );
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
      {loadingBoxState?.open && (
        <section className="mainLayout__loadingReport">
          {loadingBoxState?.loading &&
            (loadingBoxState?.response === null ||
              loadingBoxState?.response === undefined) && (
              <div className="loadingBox">
                <p className="loadingBox__text">{loadingBoxState?.label}</p>
                <div className="loadingBox__line"></div>
                <div className="loadingBox__line"></div>
                <div className="loadingBox__line"></div>
              </div>
            )}
          {loadingBoxState?.response && (
            <div className="loadingBox">
              {loadingBoxState?.response?.success && (
                <p className="loadingBox__text">Subida exitosa</p>
              )}
              {loadingBoxState?.response?.error && (
                <p className="loadingBox__text">Hubo un error</p>
              )}
            </div>
          )}
        </section>
      )}
    </section>
  );
};

export default MainLayout;
