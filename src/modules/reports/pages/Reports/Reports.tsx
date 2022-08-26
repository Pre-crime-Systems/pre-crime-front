import React from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import './reports.scss';

const Reports: React.FC = () => {
  const columns = [
    {
      name: 'Nombre',
    },
    {
      name: 'Fecha',
    },
    {
      name: '',
    },
    { name: '' },
  ];
  return (
    <MainLayout className="reportsPage">
      <>
        <Card className="reportsPage__header">
          <h1>Reports</h1>
          <Button buttonType="secondary">Subir reporte</Button>
        </Card>
        <Card className="reportsPage__content">
          <Table columns={columns} data={[1, 2, 3, 4, 5, 6]}></Table>
        </Card>
      </>
    </MainLayout>
  );
};

export default Reports;
