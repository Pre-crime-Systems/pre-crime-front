import React, { useContext } from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import { ContextCrime } from '../../context/ContextCrime';
import { Types } from '../../context/crime.reducer';
import './crimeHeader.scss';

const CrimeHeader: React.FC = () => {
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
    <Card className="crimeHeader">
      <h1>Lista de crímenes</h1>
      <Button buttonType="secondary" onClick={onOpen}>
        Registrar crímen
      </Button>
    </Card>
  );
};

export default CrimeHeader;
