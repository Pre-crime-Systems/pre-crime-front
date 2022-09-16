import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getReports } from '../../../../services/report.service';
import './reports.scss';

const Reports: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  return (
    <MainLayout className="reportsPage">
      {loading && <Loading />}
      <Card className="reportsPage__header">
        <h1>Reportes</h1>
        <Button buttonType="secondary">Subir reporte</Button>
      </Card>
      <Card className="reportsPage__content">
        {reports && <Table columns={columns} data={reports}></Table>}
        {reports && (
          <Pagination
            page={currentPage}
            size={2}
            total={10}
            onPageChange={(current: number) => {
              setCurrentPage(current);
            }}
          />
        )}
      </Card>
    </MainLayout>
  );
};

export default Reports;
