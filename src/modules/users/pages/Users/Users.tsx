import React from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import './users.scss';

const Users: React.FC = () => {
  const columns = [
    {
      name: 'Nombre',
    },
    {
      name: 'Apellido',
    },
    {
      name: 'Correo',
    },
    { name: 'Rol' },
  ];
  return (
    <MainLayout className="usersPage">
      <>
        <Card className="usersPage__header">
          <h1>Usuarios</h1>
        </Card>
        <Card className="usersPage__content">
          <Table columns={columns} data={[1, 2, 3, 4, 5, 6]}></Table>
        </Card>
      </>
    </MainLayout>
  );
};

export default Users;
