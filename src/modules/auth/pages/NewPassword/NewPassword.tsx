import React from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import './newPassword.scss';

const NewPassword: React.FC<any> = (props: any) => {
  return (
    <AuthLayout>
      <Card className="newPasswordCard">
        <section className="newPasswordCard__header">
          <h1 className="newPasswordTitle">Establecer contraseña</h1>
          <p className="newPasswordDescription">Ingresa una nueva contraseña</p>
        </section>
        <section className="newPasswordCard__content">
          <Input
            className="newPasswordInput"
            label="Nueva contraseña"
            type="password"
          />
          <Input
            className="newPasswordInput"
            label="Repetir nueva contraseña"
            type="password"
          />
          <Button className="newPasswordButton" buttonType="primary">
            Establecer
          </Button>
        </section>
      </Card>
    </AuthLayout>
  );
};

export default NewPassword;
