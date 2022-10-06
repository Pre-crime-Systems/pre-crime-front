import React, { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCrimesWithPagination } from '../../../../services/crime.service';
import { ContextCrime } from '../../context/ContextCrime';
import { Types } from '../../context/crime.reducer';
import './crimesTable.scss';

const CrimesTable: React.FC = () => {
  const { state, dispatch } = useContext(ContextCrime);
  const { data: crimesResponse, loading } = state?.list?.table;
  const [responseEndpoint, callEndpoint] = useApi();

  const renderDate = (data: any) => {
    const date = data?.cell?.row?.original?.date;
    return <p>{dayjs(date).format('DD/MM/YYYY')}</p>;
  };

  const columns = [
    {
      Header: 'Fecha',
      id: 'date',
      Cell: (data: any) => renderDate(data),
      minWidth: 50,
    },
    {
      Header: 'Dirección',
      accessor: 'address',
      minWidth: 100,
    },
    {
      Header: 'Latitud',
      accessor: 'latitude',
      minWidth: 100,
    },
    {
      Header: 'Longitud',
      accessor: 'longitude',
      minWidth: 120,
    },
    {
      Header: '',
      id: 'detailButton',
      Cell: (data: any) => (
        <Button
          buttonType="secondary"
          outline
          onClick={() => {
            dispatch({
              type: Types.SetModal,
              payload: {
                active: true,
                mode: 'detail',
                data: data?.cell?.row?.original,
              },
            });
          }}
        >
          Ver detalle
        </Button>
      ),
      maxWidth: 140,
      minWidth: 140,
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
    if (!loading && crimesResponse === null) {
      dispatch({
        type: Types.SetTable,
        payload: {
          data: null,
          loading: true,
        },
      });
      callEndpoint(getCrimesWithPagination());
    }
  }, [crimesResponse]);

  return (
    <Card className="crimesTable">
      {loading && <Loading />}
      {crimesResponse && (
        <Table columns={columns} data={crimesResponse?.content} />
      )}
      {crimesResponse && (
        <Pagination
          page={crimesResponse?.number}
          size={crimesResponse?.size}
          total={crimesResponse?.totalElements}
          onPageChange={(current: number) => {
            dispatch({
              type: Types.SetTable,
              payload: {
                data: null,
                loading: true,
              },
            });
            callEndpoint(getCrimesWithPagination(current));
          }}
        />
      )}
    </Card>
  );
};

export default CrimesTable;
