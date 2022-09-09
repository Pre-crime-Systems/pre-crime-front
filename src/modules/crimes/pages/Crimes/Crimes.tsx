import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCrimes } from '../../../../services/crime.service';
import './crimes.scss';

const Crimes: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crimes, setCrimes] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

  const columns = [
    {
      Header: 'Fecha',
      accessor: 'date',
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
    <MainLayout className="crimesPage">
      {loading && <Loading />}
      <Card className="crimesPage__header">
        <h1>Crimes</h1>
        <Button buttonType="secondary">Subir crímen</Button>
      </Card>
      <Card className="crimesPage__content">
        {crimes && <Table columns={columns} data={crimes}></Table>}
      </Card>
    </MainLayout>
  );
};

export default Crimes;
