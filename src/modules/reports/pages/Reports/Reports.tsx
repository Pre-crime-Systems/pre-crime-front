import React, { useContext } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import ReportDetailModal from '../../components/ReportDetailModal/ReportDetailModal';
import ReportsTable from '../../components/ReportsTable/ReportsTable';
import ReportUploadModal from '../../components/ReportUploadModal/ReportUploadModal';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reports.scss';

const Reports: React.FC = () => {
  const { dispatch } = useContext(ContextReport);

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
    <MainLayout className="reportsPage">
      <ReportUploadModal />
      <ReportDetailModal />
      <section className="reportsPage__header">
        <h1>Lista de reportes</h1>
        <Button buttonType="primary" onClick={onOpen}>
          Subir reporte
        </Button>
      </section>
      <ReportsTable />
    </MainLayout>
  );
};

export default Reports;
