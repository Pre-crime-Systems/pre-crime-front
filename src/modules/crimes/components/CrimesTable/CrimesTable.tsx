import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCrimesWithPagination } from '../../../../services/crime.service';
import { ContextCrime } from '../../context/ContextCrime';
import { Types } from '../../context/crime.reducer';
import { formatDate } from '../../../../utils/date.util';
import './crimesTable.scss';

const CrimesTable: React.FC = () => {
  const [responseEndpoint, callEndpoint] = useApi();
  const { state, dispatch } = useContext(ContextCrime);
  const [initDate, setInitDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const { data: crimesResponse, loading } = state?.list?.table;

  const columns = [
    {
      Header: 'Fecha',
      id: 'date',
      Cell: (data: any) => {
        const date = formatDate(data?.cell?.row?.original?.date);
        return <p>{date}</p>;
      },
      minWidth: 50,
    },
    {
      Header: 'Dirección',
      accessor: 'address',
      minWidth: 100,
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
      <section className="crimesTable__filters">
        <p className="filterTitle">Filtros</p>
        <div className="filterOptions">
          <Input
            className="filterOptions__input"
            label="Desde"
            type="date"
            value={initDate}
            onChange={(event) => {
              const value = event.target.value;
              setInitDate(value);
            }}
          />
          <Input
            className="filterOptions__input"
            label="Hasta"
            type="date"
            value={endDate}
            onChange={(event) => {
              const value = event.target.value;
              setEndDate(value);
            }}
          />
          <Button
            className="filterOptions__button"
            buttonType="secondary"
            onClick={() => {
              // dispatch({
              //   type: Types.SetTable,
              //   payload: {
              //     data: null,
              //     loading: true,
              //   },
              // });
              // callEndpoint(getCrimesWithPagination(0, endDate, initDate));
            }}
          >
            Filtrar
          </Button>
        </div>
      </section>
      {crimesResponse && crimesResponse?.content.length === 0 && (
        <p className="crimesTable__noData">No hay registros</p>
      )}
      {crimesResponse && crimesResponse?.content.length > 0 && (
        <>
          <Table columns={columns} data={crimesResponse?.content} />
          <Pagination
            page={crimesResponse?.number + 1}
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
              callEndpoint(getCrimesWithPagination(current - 1));
            }}
          />
        </>
      )}
    </Card>
  );
};

export default CrimesTable;
