import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCrimes } from '../../../../services/crime.service';
import CrimeModal from '../../components/CrimeModal/CrimeModal';
import { ContextCrime, ContextCrimeProvider } from '../../context/ContextCrime';
import { Types as CrimeTypes } from '../../context/crime.reducer';
import './crimes.scss';

const Crimes: React.FC = () => {
  const { state, dispatch } = useContext(ContextCrime);
  const [crimes, setCrimes] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
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
    <ContextCrimeProvider>
      <MainLayout className="crimesPage">
        {loading && <Loading />}
        {openModal && (
          <CrimeModal
            onClose={() => {
              setOpenModal(false);
            }}
          />
        )}
        <Card className="crimesPage__header">
          <h1>Lista de crímenes</h1>
          <Button
            buttonType="secondary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Registrar crímen
          </Button>
        </Card>
        <Card className="crimesPage__content">
          {crimes && <Table columns={columns} data={crimes}></Table>}
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
      </MainLayout>
    </ContextCrimeProvider>
  );
};

export default Crimes;
