import React, { useContext } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import CrimeDetailModal from '../../components/CrimeDetailModal/CrimeDetailModal';
import CrimeModal from '../../components/CrimeModal/CrimeModal';
import CrimesTable from '../../components/CrimesTable/CrimesTable';
import { ContextCrime } from '../../context/ContextCrime';
import { Types } from '../../context/crime.reducer';
import './crimes.scss';

const Crimes: React.FC = () => {
  const { dispatch } = useContext(ContextCrime);

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
    <MainLayout className="crimesPage">
      <CrimeModal />
      <CrimeDetailModal />
      <section className="crimesPage__header">
        <h1>Lista de crímenes</h1>
        <Button buttonType="primary" onClick={onOpen}>
          Registrar crímen
        </Button>
      </section>
      <CrimesTable />
    </MainLayout>
  );
};

export default Crimes;
