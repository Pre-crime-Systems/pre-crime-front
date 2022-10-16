import React, { useContext, useEffect } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getReportsWithPagination } from '../../../../services/report.service';
import { formatDate } from '../../../../utils/date.util';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reportsTable.scss';

const ReportsTable: React.FC = () => {
  const { state, dispatch } = useContext(ContextReport);
  const { data: reportsResponse, loading } = state?.list?.table;
  const [responseEndpoint, callEndpoint] = useApi();

  const columns = [
    {
      Header: 'Fecha de registro',
      id: 'date',
      Cell: (data: any) => {
        const date = formatDate(data?.cell?.row?.original?.registerDate);
        return <p>{date}</p>;
      },
      minWidth: 100,
    },
    {
      Header: 'Nombre',
      accessor: 'fileName',
      minWidth: 100,
    },
    {
      Header: '',
      id: 'downloadButton',
      Cell: (data: any) => (
        <Button
          buttonType="secondary"
          outline
          onClick={() => {
            window.open(data?.cell?.row?.original?.fileUrl, '_blank');
          }}
        >
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
          page={reportsResponse?.number + 1}
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
            callEndpoint(getReportsWithPagination(current - 1));
          }}
        />
      )}
    </Card>
  );
};

export default ReportsTable;
