import React, { useContext } from 'react';
import dayjs from 'dayjs';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import { ContextUser } from '../../context/ContextUser';
import { Types } from '../../context/user.reducer';
import './userDetailModal.scss';

const UserDetailModal: React.FC = () => {
  const { state, dispatch } = useContext(ContextUser);
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
      title="Detalle de un usuario"
      onClose={onClose}
    >
      <section className="userDetailModal">
        <div className="userDetailModal__data">
          <div className="userData">
            <label className="userData__label">Fecha y hora</label>
            <p className="userData__value">
              {dayjs(modal?.data?.date).format('DD/MM/YYYY HH:MM A')}
            </p>
          </div>
          <div className="userData">
            <label className="userData__label">Dirección</label>
            <p className="userData__value">{modal?.data?.address}</p>
          </div>
          <div className="userData">
            <label className="userData__label">Descripción</label>
            <p className="userData__value">{modal?.data?.detail}</p>
          </div>
        </div>
        <div className="userDetailModal__buttons">
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

export default UserDetailModal;
