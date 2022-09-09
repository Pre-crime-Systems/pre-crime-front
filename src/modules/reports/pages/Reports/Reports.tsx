import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getReports } from '../../../../services/report.service';
import './reports.scss';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reports, setReports] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

  const columns = [
    {
      Header: 'Nombre',
      accessor: 'fileName',
      minWidth: 100,
    },
    {
      Header: 'Fecha',
      id: 'date',
      Cell: () => <p>25/08/2022</p>,
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

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      setLoading(false);
      setReports(responseEndpoint?.data);
    } else if (!loading && responseEndpoint?.data === null) {
      setLoading(true);
      callEndpoint(getReports());
    }
  }, [responseEndpoint]);

  if (loading) return <div>Loading...</div>;

  return (
    <MainLayout className="reportsPage">
      <Card className="reportsPage__header">
        <h1>Reports</h1>
        <Button buttonType="secondary">Subir reporte</Button>
      </Card>
      <Card className="reportsPage__content">
        {reports && <Table columns={columns} data={reports}></Table>}
      </Card>
    </MainLayout>
  );
};

export default Reports;
