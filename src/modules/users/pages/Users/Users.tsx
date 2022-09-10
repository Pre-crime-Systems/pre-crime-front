import React from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import './users.scss';

const Users: React.FC = () => {
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
      Cell: () => <Button buttonType="secondary">Editar</Button>,
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
      <Card className="usersPage__header">
        <h1>Usuarios</h1>
      </Card>
      <Card className="usersPage__content">
        <Table columns={columns} data={data}></Table>
      </Card>
    </MainLayout>
  );
};

export default Users;
