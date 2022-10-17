import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Modal from '../../../../components/Modal/Modal';
import { setLoadingBox } from '../../../../redux/states/loadingBox.state';
import { createReport } from '../../../../services/report.service';
import { ContextReport } from '../../context/ContextReport';
import { Types } from '../../context/report.reducer';
import './reportUploadModal.scss';

const ReportUploadModal: React.FC = () => {
  const { state, dispatch } = useContext(ContextReport);
  const reduxDispatch = useDispatch();
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [fileBase64, setFileBase64] = useState<any>(null);
  const { modal } = state?.list;

  const handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setFileBase64(btoa(binaryString));
  };

  const onFileChange = (e: any) => {
    let file = e.target.files[0];
    if (file) {
      setFileInfo(file);
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

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

  const onSave = () => {
    const report = {
      fileData: fileBase64,
      fileName: fileInfo?.name,
    };
    reduxDispatch(
      setLoadingBox({
        module: 'Reports',
        call: true,
        open: true,
        label: 'Subiendoo reporte...',
        loading: true,
        endpoint: createReport(report),
      })
    );
    dispatch({
      type: Types.SetModal,
      payload: {
        active: false,
        mode: 'add',
        data: null,
      },
    });
  };

  return (
    <Modal
      active={modal?.active && modal?.mode === 'add'}
      title="Subir un reporte"
      onClose={onClose}
    >
      <section className="reportUploadModal">
        <div className="reportUploadModal__data">
          <Input
            label="Reporte"
            type="file"
            accept=".xlsx"
            onChange={onFileChange}
          />
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
