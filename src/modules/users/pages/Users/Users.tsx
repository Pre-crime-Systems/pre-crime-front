import React, { useContext } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import UserModal from '../../components/UserModal/UserModal';
import UsersTable from '../../components/UsersTable/UsersTable';
import { ContextUser } from '../../context/ContextUser';
import { Types } from '../../context/user.reducer';
import './users.scss';

const Users: React.FC = () => {
  const { dispatch } = useContext(ContextUser);

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

  return (
    <MainLayout className="usersPage">
      <UserModal />
      <Card className="usersPage__header">
        <h1>Usuarios</h1>
        <Button buttonType="secondary" onClick={onOpen}>
          Registrar usuario
        </Button>
      </Card>
      <UsersTable />
    </MainLayout>
  );
};

export default Users;
