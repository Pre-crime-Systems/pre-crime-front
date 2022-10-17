import React, { useContext } from 'react';
import dayjs from 'dayjs';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reportDetailModal.scss';

const ReportDetailModal: React.FC = () => {
  const { state, dispatch } = useContext(ContextReport);
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
      title="Detalle de un reporte"
      onClose={onClose}
    >
      <section className="reportDetailModal">
        <div className="reportDetailModal__data">
          <div className="reportData">
            <label className="reportData__label">Fecha de reporte</label>
            <p className="reportData__value">
              {dayjs(modal?.data?.registerDate).format('DD/MM/YYYY HH:MM A')}
            </p>
          </div>
          <div className="reportData">
            <label className="reportData__label">Subido por</label>
            <p className="reportData__value">{modal?.data?.username}</p>
          </div>
          <div className="reportData">
            <label className="reportData__label">Nombre de reporte</label>
            <p className="reportData__value">{modal?.data?.fileName}</p>
          </div>
        </div>
        <div className="reportDetailModal__buttons">
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

export default ReportDetailModal;
