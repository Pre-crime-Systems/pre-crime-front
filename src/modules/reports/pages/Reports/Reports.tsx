import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import { setLoadingBox } from '../../../../redux/states/loadingBox.state';
import ReportsTable from '../../components/ReportsTable/ReportsTable';
import ReportUploadModal from '../../components/ReportUploadModal/ReportUploadModal';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reports.scss';

const Reports: React.FC = () => {
  const { dispatch } = useContext(ContextReport);
  const reduxDispatch = useDispatch();

  const onOpen = () => {
    // dispatch({
    //   type: Types.SetModal,
    //   payload: {
    //     active: true,
    //     mode: 'add',
    //     data: null,
    //   },
    // });
    reduxDispatch(
      setLoadingBox({
        open: true,
        label: 'Subiendoo reporte...',
        loading: true,
      })
    );
    setTimeout(() => {
      reduxDispatch(
        setLoadingBox({
          open: true,
          label: 'Subiendoo reporte...',
          loading: true,
          response: {
            success: true,
            error: false,
          },
        })
      );
    }, 3000);
    setTimeout(() => {
      reduxDispatch(
        setLoadingBox({
          open: false,
          label: '',
          loading: false,
          response: null,
        })
      );
    }, 5000);
  };

  return (
    <MainLayout className="reportsPage">
      <>
        <ReportUploadModal />
      </>
      <Card className="reportsPage__header">
        <h1>Reportes</h1>
        <Button buttonType="secondary" onClick={onOpen}>
          Subir reporte
        </Button>
      </Card>
      <ReportsTable />
    </MainLayout>
  );
};

export default Reports;
