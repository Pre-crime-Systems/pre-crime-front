import React, { useState } from 'react';
import cx from 'classnames';
import Card from '../../../../components/Card/Card';
import Select from '../../../../components/Select/Select';
import './crimeFilters.scss';
import Button from '../../../../components/Button/Button';

interface CrimeFiltersProps {
  className?: string;
  predictionMode: boolean;
  setFilters: (value: any) => void;
  setPredictionMode: (value: boolean) => void;
}

const CrimeFilters: React.FC<CrimeFiltersProps> = (
  props: CrimeFiltersProps
) => {
  const { className, predictionMode, setPredictionMode, setFilters } = props;
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);

  const onClean = () => {
    setDate(null);
    setTime(null);
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
          onClick={onClean}
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
      <div className="crimeFilters__switch">
        <label>Modo predicciones</label>
        <input
          type="checkbox"
          onClick={() => {
            onClean();
            setPredictionMode(!predictionMode);
          }}
        />
      </div>
      <section className="crimeFilters__options">
        {predictionMode ? FiltersPrediction() : FilterHistorical()}
        {FilterButtons()}
      </section>
    </Card>
  );
};

export default CrimeFilters;
