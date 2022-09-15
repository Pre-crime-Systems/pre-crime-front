import React, { useState } from 'react';
import cx from 'classnames';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Select from '../../../../components/Select/Select';
import './crimeFilters.scss';
import Switch from '../../../../components/Switch/Switch';

interface CrimeFiltersProps {
  className?: string;
  predictionMode: boolean;
  onClearFilters: (value: any) => void;
  setFilters: (value: any) => void;
  setPredictionMode: (value: boolean) => void;
}

const CrimeFilters: React.FC<CrimeFiltersProps> = (
  props: CrimeFiltersProps
) => {
  const {
    className,
    predictionMode,
    onClearFilters,
    setPredictionMode,
    setFilters,
  } = props;
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);

  const onClear = () => {
    setDate(null);
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
        date,
        time,
      });
    }
  };

  const FilterHistorical = () => {
    return (
      <section className="filterItems">
        <Select
          className="filterItems__field"
          label="Fecha"
          options={[
            { label: '25/08/97', value: '25/08/97' },
            { label: '26/08/97', value: '26/08/97' },
          ]}
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            setTime(null);
          }}
        />
        <Select
          className="filterItems__field"
          label="Hora"
          options={[
            { label: '08:00', value: 'Upc San isidro' },
            { label: '09:00', value: 'Upc San Miguel' },
          ]}
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
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
          options={[
            { label: '10:00', value: 'L' },
            { label: '11:00', value: 'S' },
          ]}
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
      <Switch
        checked={predictionMode}
        className="crimeFilters__switch"
        label="Modo predicciones"
        onChange={() => {
          onClear();
          setPredictionMode(!predictionMode);
        }}
      />
      <section className="crimeFilters__options">
        {predictionMode ? FiltersPrediction() : FilterHistorical()}
        {FilterButtons()}
      </section>
    </Card>
  );
};

export default CrimeFilters;
