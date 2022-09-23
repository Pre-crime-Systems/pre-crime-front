import React from 'react';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import CrimeDetailModal from '../../components/CrimeDetailModal/CrimeDetailModal';
import CrimeHeader from '../../components/CrimeHeader/CrimeHeader';
import CrimeModal from '../../components/CrimeModal/CrimeModal';
import CrimesTable from '../../components/CrimesTable/CrimesTable';
import { ContextCrimeProvider } from '../../context/ContextCrime';
import './crimes.scss';

const Crimes: React.FC = () => {
  return (
    <ContextCrimeProvider>
      <MainLayout className="crimesPage">
        <>
          <CrimeModal />
          <CrimeDetailModal />
        </>
        <>
          <CrimeHeader />
          <CrimesTable />
        </>
      </MainLayout>
    </ContextCrimeProvider>
  );
};

export default Crimes;
