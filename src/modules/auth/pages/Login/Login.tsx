import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { RoutePaths } from '../../../../routes/routePaths';
import { login } from '../../../../services/auth.service';
import * as localStorage from '../../../../utils/localStorage.util';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import './login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<boolean>(false);
  const [responseEndpoint, callEndpoint] = useApi();
  localStorage.setToken(null);

  const validFields = () => {
    if (email.length > 0 && password.length > 4) {
      return true;
    } else {
      if (email.length === 0) {
        setEmailInvalid(true);
      }
      if (password.length <= 4) {
        setPasswordInvalid(true);
      }
      return false;
    }
  };

  const onLogin = () => {
    if (validFields()) {
      setLoading(true);
      callEndpoint(login({ email, password }));
    }
  };

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      const data = responseEndpoint?.data;
      setLoading(false);
      if (data?.error) {
        setErrorResponse(true);
      } else {
        const token = data?.token;
        localStorage.setToken(token);
        navigate(RoutePaths.Dashboard);
      }
    }
  }, [responseEndpoint]);

  return (
    <>
      {loading && <Loading />}
      <AuthLayout>
        <Card className="loginCard">
          <section className="loginCard__header">
            <h1 className="loginTitle">Inicio de sesión</h1>
            <p className="loginDescription">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </section>
          {errorResponse && (
            <section className="loginCard__errorCard">
              <p className="loginError">
                No podemos encontrar una cuenta con estas credenciales.
                Reinténtalo nuevamente.
              </p>
            </section>
          )}
          <form className="loginCard__content">
            <Input
              className="loginInput"
              error={emailInvalid && 'Correo electrónico inválido'}
              label="Correo electrónico"
              placeholder="correo@dominio.com"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Input
              className="loginInput"
              error={
                passwordInvalid &&
                'La contraseña debe tener más de 4 caracteres'
              }
              label="Contraseña"
              placeholder="*********"
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
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </form>
        </Card>
      </AuthLayout>
    </>
  );
};

export default Login;
