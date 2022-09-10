import React, { useContext, useState } from 'react';
import Input from '../../../../components/Input/Input';
import Modal from '../../../../components/Modal/Modal';
import Select from '../../../../components/Select/Select';
import { ContextCrime } from '../../context/ContextCrime';
import './crimeModal.scss';

interface CrimeModalProps {
  onClose: () => void;
}

const CrimeModal: React.FC<CrimeModalProps> = (props: CrimeModalProps) => {
  const { onClose } = props;
  const { state, dispatch } = useContext(ContextCrime);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  return (
    <Modal active={true} title="Registrar un crímen" onClose={onClose}>
      <section className="crimeModal">
        <div className="crimeModal__groupFields">
          <Select
            className="crimeField"
            label="Comisaria"
            options={[{ label: 'Comisaria del sol', value: 1 }]}
          />
          <Input
            className="crimeField"
            label="Fecha"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
          <Input
            className="crimeField"
            label="Hora"
            value={date}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />
        </div>
        <div className="crimeModal__groupFields">
          <Select
            className="crimeField"
            label="Tipo de delito"
            options={[{ label: 'Un tipo', value: 1 }]}
          />
          <Select
            className="crimeField"
            label="Subtipo de delito"
            options={[{ label: 'Un subtipo', value: 1 }]}
          />
          <Select
            className="crimeField"
            label="Modalidad"
            options={[{ label: 'Una modalidad', value: 1 }]}
          />
        </div>
        <div className="crimeModal__groupFields">
          <Select
            className="crimeField"
            label="Distrito"
            options={[{ label: 'Un distrito', value: 1 }]}
          />
          <Select
            className="crimeField"
            label="Zona"
            options={[{ label: 'Una zona', value: 1 }]}
          />
          <Input className="crimeField" label="Dirección" />
        </div>
      </section>
    </Modal>
  );
};

export default CrimeModal;
