import React, { useState } from 'react';
import cx from 'classnames';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Select from '../../../../components/Select/Select';
import {
  HOURS,
  MODALITIES_CRIME,
  SUBTYPES_CRIME,
  TYPES_CRIME,
} from '../../../../constants/data.constant';
import './crimeFilters.scss';

interface CrimeFiltersProps {
  className?: string;
  filters: any;
  predictionMode: boolean;
  onClearFilters: (value: any) => void;
  setFilters: (value: any) => void;
}

const CrimeFilters: React.FC<CrimeFiltersProps> = (
  props: CrimeFiltersProps
) => {
  const { className, filters, predictionMode, onClearFilters, setFilters } =
    props;
  //historical
  const [typeCrime, setTypeCrime] = useState<any>(filters?.typeCrime || null);
  const [subtypeCrime, setSubtypeCrime] = useState<any>(
    filters?.subtypeCrime || null
  );
  const [modalityCrime, setModalityCrime] = useState<any>(
    filters?.modalityCrime || null
  );
  //prediction
  const [time, setTime] = useState<any>(filters?.time || null);

  const onClear = () => {
    setTypeCrime(null);
    setSubtypeCrime(null);
    setModalityCrime(null);
    setTime(null);
    onClearFilters(Math.random());
  };

  const onApply = () => {
    if (predictionMode) {
      setFilters({
        time,
      });
    } else {
      setFilters({
        typeCrime,
        subtypeCrime,
        modalityCrime,
      });
    }
  };

  const FilterHistorical = () => {
    return (
      <section className="filterItems">
        <Select
          className="filterItems__field"
          label="Tipo de crimen"
          options={TYPES_CRIME}
          value={typeCrime}
          onChange={(newValue) => {
            setTypeCrime(newValue);
          }}
        />
        <Select
          className="filterItems__field"
          label="Subtipo de crimen"
          options={SUBTYPES_CRIME}
          value={subtypeCrime}
          onChange={(newValue) => {
            setSubtypeCrime(newValue);
          }}
        />
        <Select
          className="filterItems__field"
          label="Modalidad de crimen"
          options={MODALITIES_CRIME}
          value={modalityCrime}
          onChange={(newValue) => {
            setModalityCrime(newValue);
          }}
        />
      </section>
    );
  };

  const FiltersPrediction = () => {
    return (
      <section className="filterItems">
        <Select
          className="filterItems__field"
          label="Hora"
          options={HOURS}
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
          }}
        />
      </section>
    );
  };

  const FilterButtons = () => {
    return (
      <section className="filterButtons">
        <Button
          buttonType="primary"
          className="filterButtons__item"
          outline
          onClick={onClear}
        >
          Limpiar
        </Button>
        <Button
          buttonType="primary"
          className="filterButtons__item"
          onClick={onApply}
        >
          Aplicar
        </Button>
      </section>
    );
  };

  return (
    <Card className={cx('crimeFilters', className && className)}>
      <h3 className="crimeFilters__title">Filtros</h3>
      <section className="crimeFilters__options">
        {predictionMode ? FiltersPrediction() : FilterHistorical()}
        {FilterButtons()}
      </section>
    </Card>
  );
};

export default CrimeFilters;
