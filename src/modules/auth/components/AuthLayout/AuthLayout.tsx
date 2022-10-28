import React, { useEffect, useState } from 'react';
import './authLayout.scss';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = (props: AuthLayoutProps) => {
  const { children } = props;
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <section className="authLayout">
      <aside className="authLayout__aside">
        <video className="asideVideo" autoPlay muted loop id="myVideo">
          <source src={`${origin}/pre-crime-video.mp4`} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <section className="asideLogo">
          <label className="asideLogo__name">Pre Crime</label>
        </section>
      </aside>
      <main className="authLayout__content">{children}</main>
    </section>
  );
};

export default AuthLayout;
