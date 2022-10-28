import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import { RoutePaths } from '../../../../routes/routePaths';
import * as localStorage from '../../../../utils/localStorage.util';
import UserModal from '../../components/UserModal/UserModal';
import UsersTable from '../../components/UsersTable/UsersTable';
import { ContextUser } from '../../context/ContextUser';
import { Types } from '../../context/user.reducer';
import './users.scss';

const Users: React.FC = () => {
  const { dispatch } = useContext(ContextUser);
  const navigate = useNavigate();

  const onOpen = () => {
    dispatch({
      type: Types.SetModal,
      payload: {
        active: true,
        mode: 'add',
        data: null,
      },
    });
  };

  useEffect(() => {
    const token = localStorage.getToken() || '';
    if (token.length > 0) {
      const tokenDecoded: any = jwt_decode(token);
      const isAdmin = tokenDecoded?.isAdmin || false;

      if (!isAdmin) {
        navigate(RoutePaths.Dashboard);
      }
    }
  }, []);

  return (
    <MainLayout className="usersPage">
      <UserModal />
      <section className="usersPage__header">
        <h1>Lista de usuarios</h1>
        <Button buttonType="primary" onClick={onOpen}>
          Registrar usuario
        </Button>
      </section>
      <UsersTable />
    </MainLayout>
  );
};

export default Users;
