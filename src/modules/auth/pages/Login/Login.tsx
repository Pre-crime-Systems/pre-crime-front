import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import './login.scss';

const Login: React.FC<any> = (props: any) => {
  const navigate = useNavigate();

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
          />
          <Input className="loginInput" label="Contraseña" type="password" />
          <a
            className="loginLink"
            onClick={() => {
              navigate('/auth/reset-password');
            }}
          >
            ¿Olvidate tu contraseña?
          </a>
          <Button className="loginButton" buttonType="secondary">
            Iniciar Sesión
          </Button>
        </section>
      </Card>
    </AuthLayout>
  );
};

export default Login;
