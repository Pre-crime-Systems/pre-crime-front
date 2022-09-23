import React from 'react';
import { ContextCrimeProvider } from '../context/ContextCrime';
import Crimes from './Crimes/Crimes';

const CrimesInit: React.FC = () => {
  return (
    <ContextCrimeProvider>
      <Crimes />
    </ContextCrimeProvider>
  );
};

export default CrimesInit;
