import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import { RoutePaths } from '../../../../routes/routePaths';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import './resetPassword.scss';

const ResetPassword: React.FC<any> = (props: any) => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Card className="resetPasswordCard">
        <section className="resetPasswordCard__header">
          <h1 className="resetPasswordTitle">Restablecimiento de contraseña</h1>
          <p className="resetPasswordDescription">
            Ingresa el correo electrónico con el que accedes a tu cuenta. Te
            enviaremos un mensaje con un enlace para reestablecer tu conrtaseña.
          </p>
        </section>
        <section className="resetPasswordCard__content">
          <Input
            className="resetPasswordInput"
            label="Correo electrónico"
            placeholder="correo@dominio.com"
          />
          <Button
            className="resetPasswordButton"
            buttonType="secondary"
            onClick={() => {
              navigate(RoutePaths.NewPassword);
            }}
          >
            Enviar
          </Button>
        </section>
      </Card>
    </AuthLayout>
  );
};

export default ResetPassword;
