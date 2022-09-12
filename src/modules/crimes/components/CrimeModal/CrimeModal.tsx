import React, { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import Modal from '../../../../components/Modal/Modal';
import Select from '../../../../components/Select/Select';
import { useApi } from '../../../../hooks/useApi';
import {
  getDistricts,
  getZonesByDistrict,
} from '../../../../services/location.service';
import './crimeModal.scss';

interface CrimeModalProps {
  onClose: () => void;
}

const CrimeModal: React.FC<CrimeModalProps> = (props: CrimeModalProps) => {
  const { onClose } = props;
  const [districts, setDistricts] = useState<any>(null);
  const [loadingDistricts, setLoadingDistricts] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [zones, setZones] = useState<any>(null);
  const [loadingZones, setLoadingZones] = useState<any>(null);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [districtsResponse, callDistricts] = useApi();
  const [zonesResponse, callZones] = useApi();

  useEffect(() => {
    if (loadingDistricts && districtsResponse?.data) {
      setLoadingDistricts(false);
      setDistricts(
        districtsResponse?.data?.map((district: any) => {
          return {
            label: district?.name,
            value: district?.id,
          };
        })
      );
    } else if (!loadingDistricts && districtsResponse?.data === null) {
      setLoadingDistricts(true);
      callDistricts(getDistricts());
    }
  }, [districtsResponse]);

  useEffect(() => {
    if (loadingZones && zonesResponse?.data) {
      setLoadingZones(false);
      setZones(
        zonesResponse?.data?.map((zone: any) => {
          return {
            label: zone?.code,
            value: zone?.id,
          };
        })
      );
    }
  }, [zonesResponse]);

  return (
    <Modal active={true} title="Registrar un crímen" onClose={onClose}>
      <section className="crimeModal">
        <div className="crimeModal__groupFields">
          <Select
            className="crimeField"
            label="Comisaria"
            options={[{ label: 'Comisaria del sol', value: 1 }]}
          />
          <Input className="crimeField" label="Fecha" value={''} />
          <Input className="crimeField" label="Hora" value={''} />
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
            placeholder="Distrito"
            options={districts}
            value={selectedDistrict}
            onChange={(newValue) => {
              setSelectedDistrict(newValue);
              setSelectedZone(null);
              if (newValue) {
                setLoadingZones(true);
                callZones(getZonesByDistrict(newValue?.value));
              }
            }}
          />
          <Select
            className="crimeField"
            label="Código postal"
            placeholder="Código postal"
            options={zones}
            value={selectedZone}
            onChange={(newValue) => {
              setSelectedZone(newValue);
            }}
          />
          <Input className="crimeField" label="Dirección" />
        </div>
      </section>
    </Modal>
  );
};

export default CrimeModal;
