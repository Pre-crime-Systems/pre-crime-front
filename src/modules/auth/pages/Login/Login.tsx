import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import { useApi } from '../../../../hooks/useApi';
import { RoutePaths } from '../../../../routes/routePaths';
import { login } from '../../../../services/auth.service';
import * as localStorage from '../../../../utils/localStorage.util';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import './login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [responseEndpoint, callEndpoint] = useApi();

  const onLogin = () => {
    setLoading(true);
    callEndpoint(login({ email, password }));
  };

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      const token = responseEndpoint?.data?.token;
      localStorage.setToken(token);
      setLoading(false);
      navigate(RoutePaths.Dashboard);
    }
  }, [responseEndpoint]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthLayout>
      <Card className="loginCard">
        <section className="loginCard__header">
          <h1 className="loginTitle">Inicio de sesión</h1>
          <p className="loginDescription">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </section>
        <section className="loginCard__content">
          <Input
            className="loginInput"
            label="Correo electrónico"
            placeholder="correo@dominio.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            className="loginInput"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <a
            className="loginLink"
            onClick={() => {
              navigate(RoutePaths.ResetPassword);
            }}
          >
            ¿Olvidate tu contraseña?
          </a>
          <Button
            className="loginButton"
            buttonType="secondary"
            onClick={onLogin}
          >
            Iniciar Sesión
          </Button>
        </section>
      </Card>
    </AuthLayout>
  );
};

export default Login;
