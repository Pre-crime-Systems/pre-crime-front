import React, { useContext, useEffect } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getReportsWithPagination } from '../../../../services/report.service';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reportsTable.scss';

const ReportsTable: React.FC = () => {
  const { state, dispatch } = useContext(ContextReport);
  const { data: reportsResponse, loading } = state?.list?.table;
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
      Cell: () => (
        <Button buttonType="secondary" outline>
          Ver detalle
        </Button>
      ),
      maxWidth: 140,
      minWidth: 140,
    },
    {
      Header: '',
      id: 'downloadButton',
      Cell: () => (
        <Button buttonType="secondary" outline>
          Descargar
        </Button>
      ),
      maxWidth: 140,
    },
  ];

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      dispatch({
        type: Types.SetTable,
        payload: {
          data: responseEndpoint?.data,
          loading: false,
        },
      });
    }
  }, [responseEndpoint]);

  useEffect(() => {
    if (!loading && reportsResponse === null) {
      dispatch({
        type: Types.SetTable,
        payload: {
          data: null,
          loading: true,
        },
      });
      callEndpoint(getReportsWithPagination());
    }
  }, [reportsResponse]);

  return (
    <Card className="reportsTable">
      {loading && <Loading />}
      {reportsResponse && (
        <Table columns={columns} data={reportsResponse?.content} />
      )}
      {reportsResponse && (
        <Pagination
          page={reportsResponse?.number}
          size={reportsResponse?.size}
          total={reportsResponse?.totalElements}
          onPageChange={(current: number) => {
            dispatch({
              type: Types.SetTable,
              payload: {
                data: null,
                loading: true,
              },
            });
            callEndpoint(getReportsWithPagination(current));
          }}
        />
      )}
    </Card>
  );
};

export default ReportsTable;
