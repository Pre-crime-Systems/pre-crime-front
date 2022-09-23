import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import Modal from '../../../../components/Modal/Modal';
import Select from '../../../../components/Select/Select';
import Textarea from '../../../../components/Textarea/Textarea';
import { useApi } from '../../../../hooks/useApi';
import { createCrime } from '../../../../services/crime.service';
import {
  getDistricts,
  getPoliceStationByDistrict,
  getZonesByDistrict,
} from '../../../../services/location.service';
import { ContextCrime } from '../../context/ContextCrime';
import { Types } from '../../context/crime.reducer';
import {
  getModalities,
  getSubtypes,
  getTypes,
} from '../../../../services/type.service';
import './crimeModal.scss';

const CrimeModal: React.FC = () => {
  const { state, dispatch } = useContext(ContextCrime);
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
  const [typesCrime, setTypesCrime] = useState<any>([]);
  const [typesCrimeLoading, setTypesCrimeLoading] = useState<any>(null);
  const [typeCrimeSelected, setTypeCrimeSelected] = useState<any>(null);
  const [typesCrimeResponse, callTypesCrime] = useApi();
  const [subtypesCrime, setSubtypesCrime] = useState<any>([]);
  const [subtypesCrimeLoading, setSubtypesCrimeLoading] = useState<any>(null);
  const [subtypeCrimeSelected, setSubtypeCrimeSelected] = useState<any>(null);
  const [subtypesCrimeResponse, callSubtypesCrime] = useApi();
  const [modalities, setModalities] = useState<any>([]);
  const [modalitiesLoading, setModalitiesLoading] = useState<any>(null);
  const [modalitySelected, setModalitySelected] = useState<any>(null);
  const [modalitiesResponse, callModalities] = useApi();
  const [addressSelected, setAddressSelected] = useState<any>(null);
  const [dateSelected, setDateSelected] = useState<any>(null);
  const [timeSelected, setTimeSelected] = useState<any>(null);
  const [descriptionSelected, setDescriptionSelected] = useState<any>(null);
  const [crimeResponse, callEndpoint] = useApi();

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

  const onSave = () => {
    const crime = {
      address: addressSelected,
      date: dayjs(`${dateSelected} ${timeSelected}:00`).toISOString(),
      detail: descriptionSelected,
      modalityCrimeId: modalitySelected?.value,
      policeStationId: policeStationSelected?.value,
      subtypeCrimeId: subtypeCrimeSelected?.value,
      typeCrimeId: typeCrimeSelected?.value,
      zoneId: zoneSelected?.value,
    };
    setLoading(true);
    callEndpoint(createCrime(crime));
  };

  useEffect(() => {
    if (loading && crimeResponse?.data) {
      onClose();
      dispatch({
        type: Types.SetTable,
        payload: {
          data: null,
          loading: false,
        },
      });
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

  useEffect(() => {
    if (typesCrimeLoading && typesCrimeResponse?.data) {
      setTypesCrimeLoading(false);
      setTypesCrime(
        typesCrimeResponse?.data?.map((typeCrime: any) => {
          return {
            label: typeCrime?.name,
            value: typeCrime?.id,
          };
        })
      );
    } else if (!typesCrimeLoading && typesCrimeResponse?.data === null) {
      setTypesCrimeLoading(true);
      callTypesCrime(getTypes());
    }
  }, [typesCrimeResponse]);

  useEffect(() => {
    if (subtypesCrimeLoading && subtypesCrimeResponse?.data) {
      setSubtypesCrimeLoading(false);
      setSubtypesCrime(
        subtypesCrimeResponse?.data?.map((subtype: any) => {
          return {
            label: subtype?.name,
            value: subtype?.id,
          };
        })
      );
    }
  }, [subtypesCrimeResponse]);

  useEffect(() => {
    if (modalitiesLoading && modalitiesResponse?.data) {
      setModalitiesLoading(false);
      setModalities(
        modalitiesResponse?.data?.map((modality: any) => {
          return {
            label: modality?.name,
            value: modality?.id,
          };
        })
      );
    }
  }, [modalitiesResponse]);

  return (
    <Modal
      active={modal?.active && modal?.mode === 'add'}
      title="Registrar un crímen"
      onClose={onClose}
    >
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
        <div className="crimeModal__groupFields crimeModal__groupFields--three">
          <Select
            className="crimeField"
            label="Tipo de crimen"
            options={typesCrime}
            value={typeCrimeSelected}
            onChange={(newValue) => {
              setTypeCrimeSelected(newValue);
              setSubtypeCrimeSelected(null);
              setModalitySelected(null);
              if (newValue) {
                setSubtypesCrimeLoading(true);
                callSubtypesCrime(getSubtypes(newValue?.value));
              }
            }}
          />
          <Select
            className="crimeField"
            label="Subtipo de crimen"
            options={subtypesCrime}
            value={subtypeCrimeSelected}
            onChange={(newValue) => {
              setSubtypeCrimeSelected(newValue);
              setModalitySelected(null);
              if (newValue) {
                setModalitiesLoading(true);
                callModalities(getModalities(newValue?.value));
              }
            }}
          />
          <Select
            className="crimeField"
            label="Modalidad de crimen"
            options={modalities}
            value={modalitySelected}
            onChange={(newValue) => {
              setModalitySelected(newValue);
            }}
          />
        </div>
        <div className="crimeModal__groupFields crimeModal__groupFields--one">
          <Textarea
            className="crimeField"
            label="Descripción"
            value={descriptionSelected}
            onChange={(event) => {
              setDescriptionSelected(event.target.value);
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
