import React, { useContext } from 'react';
import Modal from '../../../../components/Modal/Modal';
import { ContextCrime } from '../../context/ContextCrime';
import './crimeModal.scss';

interface CrimeModalProps {
  onClose: () => void;
}

const CrimeModal: React.FC<CrimeModalProps> = (props: CrimeModalProps) => {
  const { onClose } = props;
  const { state, dispatch } = useContext(ContextCrime);

  return (
    <Modal active={true}>
      <section className="crimeModal">modal de crimen</section>
      <button onClick={onClose}>close</button>
    </Modal>
  );
};

export default CrimeModal;
