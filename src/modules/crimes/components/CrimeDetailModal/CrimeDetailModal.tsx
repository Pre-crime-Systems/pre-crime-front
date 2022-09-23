import React, { useContext } from 'react';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import { ContextCrime } from '../../context/ContextCrime';
import { Types } from '../../context/crime.reducer';
import './crimeDetailModal.scss';

const CrimeDetailModal: React.FC = () => {
  const { state, dispatch } = useContext(ContextCrime);
  const { modal } = state?.list;

  const onClose = () => {
    dispatch({
      type: Types.SetModal,
      payload: {
        active: false,
        mode: 'detail',
        data: null,
      },
    });
  };

  return (
    <Modal
      active={modal?.active && modal?.mode === 'detail'}
      title="Detalle de un crímen"
      onClose={onClose}
    >
      <section className="crimeDetailModal">
        <div className="crimeDetailModal__data">
          <div className="crimeData">
            <label className="crimeData__label">Fecha</label>
            <p className="crimeData__value">{modal?.data?.date}</p>
          </div>
          <div className="crimeData">
            <label className="crimeData__label">Hora</label>
            <p className="crimeData__value">{modal?.data?.date}</p>
          </div>
          <div className="crimeData">
            <label className="crimeData__label">Dirección</label>
            <p className="crimeData__value">{modal?.data?.address}</p>
          </div>
        </div>
        <div className="crimeDetailModal__buttons">
          <Button
            buttonType="primary"
            className="itemButton"
            outline
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default CrimeDetailModal;
