import React, { useContext } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Modal from '../../../../components/Modal/Modal';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reportUploadModal.scss';

const ReportUploadModal: React.FC = () => {
  const { state, dispatch } = useContext(ContextReport);
  const { modal } = state?.list;

  const onClose = () => {
    dispatch({
      type: Types.SetModal,
      payload: {
        active: false,
        mode: 'add',
        data: null,
      },
    });
  };

  const onSave = () => {};

  return (
    <Modal
      active={modal?.active && modal?.mode === 'add'}
      title="Subir un reporte"
      onClose={onClose}
    >
      <section className="reportUploadModal">
        <div className="reportUploadModal__data">
          <Input label="Reporte" type="file" />
        </div>
        <div className="reportUploadModal__buttons">
          <Button
            buttonType="primary"
            className="itemButton"
            outline
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button buttonType="primary" className="itemButton" onClick={onSave}>
            Subir
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default ReportUploadModal;
