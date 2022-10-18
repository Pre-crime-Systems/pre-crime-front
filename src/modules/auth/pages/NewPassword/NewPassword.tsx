import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { RoutePaths } from '../../../../routes/routePaths';
import {
  validateToken,
  resetUserPassword,
} from '../../../../services/auth.service';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import './newPassword.scss';

const NewPassword: React.FC<any> = () => {
  const navigate = useNavigate();
  let [searchParams, _] = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordInvalid, setNewPasswordInvalid] = useState<string | null>(
    null
  );
  const [resetPassword, setResetPassword] = useState<string>('');
  const [resetPasswordInvalid, setResetPasswordInvalid] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseEndpoint, callEndpoint] = useApi();
  const [responseResetEndpoint, callResetEndpoint] = useApi();

  const validFields = () => {
    if (
      newPassword.length > 0 &&
      resetPassword.length > 0 &&
      newPassword === resetPassword
    ) {
      return true;
    } else {
      if (newPassword.length === 0) {
        setNewPasswordInvalid('Ingrese una nueva contraseña');
      }
      if (resetPassword.length === 0) {
        setResetPasswordInvalid('Repita la nueva contraseña');
      }
      if (
        newPassword.length > 0 &&
        resetPassword.length > 0 &&
        newPassword !== resetPassword
      ) {
        setResetPasswordInvalid('Las contraseñas no coinciden');
      }
      return false;
    }
  };

  const onSetPassword = (event: any) => {
    event.preventDefault();
    if (validFields()) {
      setLoading(true);
      callResetEndpoint(resetUserPassword(newPassword, token));
    }
  };

  useEffect(() => {
    const tokenParam = searchParams.get('token') || '';
    setToken(tokenParam);
    setLoading(true);
    callEndpoint(validateToken(tokenParam));
  }, []);

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      setLoading(false);
    }
  }, [responseEndpoint]);

  useEffect(() => {
    if (loading && responseResetEndpoint?.data) {
      setLoading(false);
      navigate(RoutePaths.Login);
    }
  }, [responseResetEndpoint]);

  return (
    <>
      {loading && <Loading />}
      <AuthLayout>
        <Card className="newPasswordCard">
          <section className="newPasswordCard__header">
            <h1 className="newPasswordTitle">Establecer contraseña</h1>
            <p className="newPasswordDescription">
              Ingresa una nueva contraseña
            </p>
          </section>
          <form className="newPasswordCard__content" onSubmit={onSetPassword}>
            <Input
              className="newPasswordInput"
              error={newPasswordInvalid !== null && newPasswordInvalid}
              label="Nueva contraseña"
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
            <Input
              className="newPasswordInput"
              error={resetPasswordInvalid !== null && resetPasswordInvalid}
              label="Repetir nueva contraseña"
              type="password"
              value={resetPassword}
              onChange={(event) => {
                setResetPassword(event.target.value);
              }}
            />
            <Button
              className="newPasswordButton"
              buttonType="primary"
              type="submit"
            >
              Establecer
            </Button>
          </form>
        </Card>
      </AuthLayout>
    </>
  );
};

export default NewPassword;
