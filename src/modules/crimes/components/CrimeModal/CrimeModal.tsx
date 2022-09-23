import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import Modal from '../../../../components/Modal/Modal';
import Select from '../../../../components/Select/Select';
import { useApi } from '../../../../hooks/useApi';
import { createCrime } from '../../../../services/crime.service';
import {
  getDistricts,
  getPoliceStationByDistrict,
  getZonesByDistrict,
} from '../../../../services/location.service';
import './crimeModal.scss';

interface CrimeModalProps {
  onClose: () => void;
}

const CrimeModal: React.FC<CrimeModalProps> = (props: CrimeModalProps) => {
  const { onClose } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [districts, setDistricts] = useState<any>(null);
  const [districtsLoading, setDistrictsLoading] = useState<any>(null);
  const [districtSelected, setDistrictSelected] = useState<any>(null);
  const [districtsResponse, callDistricts] = useApi();
  const [zones, setZones] = useState<any>(null);
  const [zonesLoading, setZonesLoading] = useState<any>(null);
  const [zoneSelected, setZoneSelected] = useState<any>(null);
  const [zonesResponse, callZones] = useApi();
  const [policeStations, setPoliceStations] = useState<any>(null);
  const [policeStationsLoading, setPoliceStationsLoading] = useState<any>(null);
  const [policeStationSelected, setPoliceStationSelected] = useState<any>(null);
  const [policeStationsResponse, callPoliceStations] = useApi();
  const [addressSelected, setAddressSelected] = useState<any>(null);
  const [dateSelected, setDateSelected] = useState<any>(null);
  const [timeSelected, setTimeSelected] = useState<any>(null);
  const [crimeResponse, callEndpoint] = useApi();

  const onSave = () => {
    const crime = {
      districtSelected,
      zoneSelected,
      policeStationSelected,
      address: addressSelected,
      dateSelected,
      timeSelected,
      date: dayjs(`${dateSelected} ${timeSelected}:00`).toISOString(),
    };
    setLoading(true);
    callEndpoint(createCrime(crime));
  };

  useEffect(() => {
    if (loading && crimeResponse?.data) {
      onClose();
    }
  }, [crimeResponse]);

  useEffect(() => {
    if (districtsLoading && districtsResponse?.data) {
      setDistrictsLoading(false);
      setDistricts(
        districtsResponse?.data?.map((district: any) => {
          return {
            label: district?.name,
            value: district?.id,
          };
        })
      );
    } else if (!districtsLoading && districtsResponse?.data === null) {
      setDistrictsLoading(true);
      callDistricts(getDistricts());
    }
  }, [districtsResponse]);

  useEffect(() => {
    if (zonesLoading && zonesResponse?.data) {
      setZonesLoading(false);
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

  useEffect(() => {
    if (policeStationsLoading && policeStationsResponse?.data) {
      setPoliceStationsLoading(false);
      setPoliceStations(
        policeStationsResponse?.data?.map((station: any) => {
          return {
            label: station?.name,
            value: station?.id,
          };
        })
      );
    }
  }, [policeStationsResponse]);

  return (
    <Modal active={true} title="Registrar un crímen" onClose={onClose}>
      {loading && <Loading />}
      <section className="crimeModal">
        <div className="crimeModal__groupFields">
          <Select
            className="crimeField"
            label="Distrito"
            placeholder="Distrito"
            options={districts}
            value={districtSelected}
            onChange={(newValue) => {
              setDistrictSelected(newValue);
              setZoneSelected(null);
              setPoliceStationSelected(null);
              if (newValue) {
                setZonesLoading(true);
                setPoliceStationsLoading(true);
                callZones(getZonesByDistrict(newValue?.value));
                callPoliceStations(getPoliceStationByDistrict(newValue?.value));
              }
            }}
          />
          <Select
            className="crimeField"
            label="Código postal"
            placeholder="Código postal"
            options={zones}
            value={zoneSelected}
            onChange={(newValue) => {
              setZoneSelected(newValue);
            }}
          />
        </div>
        <div className="crimeModal__groupFields">
          <Select
            className="crimeField"
            label="Comisaria"
            options={policeStations}
            value={policeStationSelected}
            onChange={(newValue) => {
              setPoliceStationSelected(newValue);
            }}
          />
          <Input
            className="crimeField"
            label="Dirección"
            type="text"
            value={addressSelected}
            onChange={(event) => {
              setAddressSelected(event.target.value);
            }}
          />
        </div>
        <div className="crimeModal__groupFields">
          <Input
            className="crimeField"
            label="Fecha"
            type="date"
            value={dateSelected}
            onChange={(event) => {
              setDateSelected(event.target.value);
            }}
          />
          <Input
            className="crimeField"
            label="Hora"
            type="time"
            value={timeSelected}
            onChange={(event) => {
              setTimeSelected(event.target.value);
            }}
          />
        </div>
        <div className="crimeModal__buttons">
          <Button
            buttonType="primary"
            className="itemButton"
            outline
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button buttonType="primary" className="itemButton" onClick={onSave}>
            Registrar
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default CrimeModal;
