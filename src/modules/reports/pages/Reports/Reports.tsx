import React from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import './reports.scss';

const Reports: React.FC = () => {
  const columns = [
    {
      Header: 'Nombre',
      accessor: 'name',
      minWidth: 100,
    },
    {
      Header: 'Fecha',
      accessor: 'date',
      minWidth: 100,
    },
    {
      Header: '',
      id: 'detailButton',
      Cell: () => <Button buttonType="secondary">Ver detalle</Button>,
      maxWidth: 140,
      minWidth: 140,
    },
    {
      Header: '',
      id: 'downloadButton',
      Cell: () => <Button buttonType="secondary">Descargar</Button>,
      maxWidth: 140,
    },
  ];
  const data = [
    { name: 'Nombre 1', date: '25/08/2022' },
    { name: 'Nombre 2', date: '25/08/2022' },
    { name: 'Nombre 3', date: '25/08/2022' },
    { name: 'Nombre 4', date: '25/08/2022' },
    { name: 'Nombre 5', date: '25/08/2022' },
  ];

  return (
    <MainLayout className="reportsPage">
      <>
        <Card className="reportsPage__header">
          <h1>Reports</h1>
          <Button buttonType="secondary">Subir reporte</Button>
        </Card>
        <Card className="reportsPage__content">
          <Table columns={columns} data={data}></Table>
        </Card>
      </>
    </MainLayout>
  );
};

export default Reports;
