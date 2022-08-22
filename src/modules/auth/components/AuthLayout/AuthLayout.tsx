import React from 'react';
import './authLayout.scss';

interface AuthLayoutProps {
  children: React.ReactElement;
}

const AuthLayout: React.FC<AuthLayoutProps> = (props: AuthLayoutProps) => {
  const { children } = props;
  return (
    <section className="authLayout">
      <aside className="authLayout__aside">
        <section className="asideLogo">
          <label className="asideLogo__name">Pre Crime</label>
        </section>
      </aside>
      <main className="authLayout__content">{children}</main>
    </section>
  );
};

export default AuthLayout;
