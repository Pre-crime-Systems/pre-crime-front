import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCrimes } from '../../../../services/crime.service';
import { ContextCrime } from '../../context/ContextCrime';
import { Types } from '../../context/crime.reducer';
import './crimesTable.scss';

const CrimesTable: React.FC = () => {
  const { state, dispatch } = useContext(ContextCrime);
  const [crimes, setCrimes] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
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
          onClick={() => {
            console.log('open detail', data);
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
      setLoading(false);
      setCrimes(responseEndpoint?.data);
    } else if (!loading && responseEndpoint?.data === null) {
      setLoading(true);
      callEndpoint(getCrimes());
    }
  }, [responseEndpoint]);

  return (
    <Card className="crimesTable">
      {loading && <Loading />}
      {crimes && <Table columns={columns} data={crimes} />}
      {crimes && (
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
  );
};

export default CrimesTable;
