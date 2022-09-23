import React, { useContext } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import UserModal from '../../components/UserModal/UserModal';
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

  const columns = [
    {
      Header: 'Nombre',
      accessor: 'name',
      minWidth: 100,
    },
    {
      Header: 'Apellido',
      accessor: 'lastName',
      minWidth: 100,
    },
    {
      Header: 'Correo',
      accessor: 'email',
      minWidth: 100,
    },
    {
      Header: 'Rol',
      accessor: 'role',
      minWidth: 100,
    },
    {
      Header: '',
      id: 'detailButton',
      Cell: () => (
        <Button buttonType="secondary" outline>
          Editar
        </Button>
      ),
      maxWidth: 140,
      minWidth: 140,
    },
  ];
  const data = [
    {
      name: 'Nombre 1',
      lastName: 'Apellido',
      email: 'correo@dominio.com',
      role: 'police',
    },
    {
      name: 'Nombre 2',
      lastName: 'Apellido',
      email: 'correo@dominio.com',
      role: 'police',
    },
    {
      name: 'Nombre 3',
      lastName: 'Apellido',
      email: 'correo@dominio.com',
      role: 'police',
    },
    {
      name: 'Nombre 4',
      lastName: 'Apellido',
      email: 'correo@dominio.com',
      role: 'police',
    },
    {
      name: 'Nombre 5',
      lastName: 'Apellido',
      email: 'correo@dominio.com',
      role: 'police',
    },
  ];

  return (
    <MainLayout className="usersPage">
      <UserModal />
      <Card className="usersPage__header">
        <h1>Usuarios</h1>
        <Button buttonType="secondary" onClick={onOpen}>
          Registrar usuario
        </Button>
      </Card>
      <Card className="usersPage__content">
        <Table columns={columns} data={data}></Table>
      </Card>
    </MainLayout>
  );
};

export default Users;
