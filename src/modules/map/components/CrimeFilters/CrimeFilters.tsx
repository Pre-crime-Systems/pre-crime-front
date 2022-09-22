import React, { useState } from 'react';
import cx from 'classnames';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MultiRangeSlider from '../../../../components/MultiRangeSlider/MultiRangeSlider';
import Select from '../../../../components/Select/Select';
import {
  MODALITIES_CRIME,
  SUBTYPES_CRIME,
  TYPES_CRIME,
} from '../../../../constants/data.constant';
import { CrimeTimeRange } from '../../../../models/crime.model';
import {
  crimePredictionTimeRange,
  crimeSelectDefaultOption,
} from '../../../../constants/crime.constant';
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
  const [typeCrime, setTypeCrime] = useState<any>(filters?.typeCrime);
  const [subtypeCrime, setSubtypeCrime] = useState<any>(filters?.subtypeCrime);
  const [modalityCrime, setModalityCrime] = useState<any>(
    filters?.modalityCrime
  );
  //prediction
  const [timeRange, setTimeRange] = useState<CrimeTimeRange>(
    filters?.timeRange
  );
  const [timeRangeModified, setRangeTimeModified] = useState<CrimeTimeRange>(
    crimePredictionTimeRange
  );

  const onClear = () => {
    setTypeCrime(null);
    setSubtypeCrime(null);
    setModalityCrime(null);
    onClearFilters(Math.random());
  };

  const onApply = () => {
    if (predictionMode) {
      setFilters({
        timeRange: timeRangeModified,
      });
    } else {
      setFilters({
        typeCrime,
        subtypeCrime,
        modalityCrime,
      });
    }
  };

  const HistoricalFilters = () => {
    return (
      <section className="filterItems">
        <Select
          className="filterItems__field"
          label="Tipo de crimen"
          options={[crimeSelectDefaultOption, ...TYPES_CRIME]}
          value={typeCrime}
          onChange={(newValue) => {
            setTypeCrime(newValue);
          }}
        />
        <Select
          className="filterItems__field"
          label="Subtipo de crimen"
          options={[crimeSelectDefaultOption, ...SUBTYPES_CRIME]}
          value={subtypeCrime}
          onChange={(newValue) => {
            setSubtypeCrime(newValue);
          }}
        />
        <Select
          className="filterItems__field"
          label="Modalidad de crimen"
          options={[crimeSelectDefaultOption, ...MODALITIES_CRIME]}
          value={modalityCrime}
          onChange={(newValue) => {
            setModalityCrime(newValue);
          }}
        />
      </section>
    );
  };

  const PredictionFilters = () => {
    return (
      <section className="filterItems">
        <MultiRangeSlider
          className="filterItems__field"
          label="Hora"
          max={timeRange?.max || 23}
          min={timeRange?.min || 0}
          onChange={({ min, max }: { min: number; max: number }) => {
            setRangeTimeModified({
              max,
              min,
            });
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
        {predictionMode ? PredictionFilters() : HistoricalFilters()}
        {FilterButtons()}
      </section>
    </Card>
  );
};

export default CrimeFilters;
