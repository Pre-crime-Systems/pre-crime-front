import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { forgotPassword } from '../../../../services/auth.service';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import './resetPassword.scss';

const ResetPassword: React.FC<any> = () => {
  const [email, setEmail] = useState<string>('');
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

  const validFields = () => {
    if (email.length > 0) {
      return true;
    } else {
      if (email.length === 0) {
        setEmailInvalid(true);
      }
      return false;
    }
  };

  const onReset = (event: any) => {
    event.preventDefault();
    if (validFields()) {
      setLoading(true);
      callEndpoint(forgotPassword(email));
    }
  };

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      const data = responseEndpoint?.data;
      setLoading(false);
      setSuccess(true);
    }
  }, [responseEndpoint]);

  return (
    <>
      {loading && <Loading />}
      <AuthLayout>
        <Card className="resetPasswordCard">
          <section className="resetPasswordCard__header">
            <h1 className="resetPasswordTitle">
              Restablecimiento de contraseña
            </h1>
            <p className="resetPasswordDescription">
              Ingresa el usuario con el que accedes a tu cuenta. Te enviaremos
              un mensaje con un enlace para reestablecer tu contraseña.
            </p>
          </section>
          {success && (
            <section className="resetPasswordCard__successCard">
              <p className="successMessage">
                Se envió el correo satisfactoriamente. Por favor, revisa tu
                bandeja.
              </p>
            </section>
          )}
          {success === null && (
            <form className="resetPasswordCard__content" onSubmit={onReset}>
              <Input
                className="resetPasswordInput"
                error={emailInvalid && 'Usuario inválido'}
                label="Usuario"
                placeholder="ABCD1234"
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Button
                className="resetPasswordButton"
                buttonType="primary"
                type="submit"
              >
                Enviar
              </Button>
            </form>
          )}
        </Card>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
