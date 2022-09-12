import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/Select/Select';
import Switch from '../../../../components/Switch/Switch';
import { useApi } from '../../../../hooks/useApi';
import {
  getDistricts,
  getZonesByDistrict,
} from '../../../../services/location.service';
import './crimeFilters.scss';

interface CrimeFiltersProps {
  className?: string;
  mode: boolean;
  setMode: (value: boolean) => void;
}

const CrimeFilters: React.FC<CrimeFiltersProps> = (
  props: CrimeFiltersProps
) => {
  const { className, mode, setMode } = props;
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
    <Card className={cx('crimeFilters', className && className)}>
      <h3 className="crimeFilters__title">Filtros</h3>
      <div>
        <label>Modo predicciones</label>
        <input type="checkbox" onClick={() => setMode(!mode)} />
      </div>
      {/* <section className="crimeFilters__fields">
        <Select
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
          label="Código postal"
          placeholder="Código postal"
          options={zones}
          value={selectedZone}
          onChange={(newValue) => {
            setSelectedZone(newValue);
          }}
        />
        <Input label="Fecha" placeholder="Fecha" disabled={true}></Input>
        <Input label="Hora" placeholder="Hora" disabled={true}></Input>
        <Button buttonType="secondary">Filtrar</Button>
      </section> */}
    </Card>
  );
};

export default CrimeFilters;
