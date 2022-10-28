import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { ILoadingBox } from '../../../../redux/models/LoadingBox.model';
import { setLoadingBox } from '../../../../redux/states/loadingBox.state';
import { AppStore } from '../../../../redux/Store';
import { getReportsWithPagination } from '../../../../services/report.service';
import { formatDate } from '../../../../utils/date.util';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reportsTable.scss';

const ReportsTable: React.FC = () => {
  const [responseEndpoint, callEndpoint] = useApi();
  const { state, dispatch } = useContext(ContextReport);
  const reduxDispatch = useDispatch();
  const loadingBoxState: ILoadingBox = useSelector(
    (store: AppStore) => store.loadingBox
  );
  const [initDate, setInitDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const { data: reportsResponse, loading } = state?.list?.table;

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
      id: 'detailButton',
      Cell: (data: any) => (
        <Button
          buttonType="secondary"
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
    {
      Header: '',
      id: 'downloadButton',
      Cell: (data: any) => (
        <Button
          buttonType="secondary"
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
    if (
      loadingBoxState?.module === 'Reports' &&
      loadingBoxState?.response &&
      loadingBoxState?.response?.success
    ) {
      setTimeout(() => {
        dispatch({
          type: Types.SetTable,
          payload: {
            data: null,
            loading: false,
          },
        });
      }, 1000);
      reduxDispatch(
        setLoadingBox({
          module: null,
          endpoint: null,
          response: null,
        })
      );
    }
  }, [loadingBoxState]);

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
      <section className="reportsTable__filters">
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
            buttonType="primary"
            outline
            onClick={() => {
              dispatch({
                type: Types.SetTable,
                payload: {
                  data: null,
                  loading: true,
                },
              });
              callEndpoint(getReportsWithPagination(0, endDate, initDate));
            }}
          >
            Filtrar
          </Button>
        </div>
      </section>
      {reportsResponse && reportsResponse?.content.length === 0 && (
        <p className="reportsTable__noData">No hay registros</p>
      )}
      {reportsResponse && reportsResponse?.content.length > 0 && (
        <>
          <Table columns={columns} data={reportsResponse?.content} />
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
              callEndpoint(
                getReportsWithPagination(current - 1, endDate, initDate)
              );
            }}
          />
        </>
      )}
    </Card>
  );
};

export default ReportsTable;
