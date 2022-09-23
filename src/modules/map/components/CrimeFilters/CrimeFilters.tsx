import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MultiRangeSlider from '../../../../components/MultiRangeSlider/MultiRangeSlider';
import Select from '../../../../components/Select/Select';
import { CrimeTimeRange } from '../../../../models/crime.model';
import {
  crimePredictionTimeRange,
  crimeSelectDefaultOption,
} from '../../../../constants/crime.constant';
import { useApi } from '../../../../hooks/useApi';
import {
  getModalities,
  getSubtypes,
  getTypes,
} from '../../../../services/type.service';
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
  const [typesCrime, setTypesCrime] = useState<any>([]);
  const [typesCrimeLoading, setTypesCrimeLoading] = useState<any>(null);
  const [typeCrimeSelected, setTypeCrimeSelected] = useState<any>(
    filters?.typeCrime
  );
  const [typesCrimeResponse, callTypesCrime] = useApi();
  const [subtypesCrime, setSubtypesCrime] = useState<any>([]);
  const [subtypesCrimeLoading, setSubtypesCrimeLoading] = useState<any>(null);
  const [subtypeCrimeSelected, setSubtypeCrimeSelected] = useState<any>(
    filters?.subtypeCrime
  );
  const [subtypesCrimeResponse, callSubtypesCrime] = useApi();
  const [modalities, setModalities] = useState<any>([]);
  const [modalitiesLoading, setModalitiesLoading] = useState<any>(null);
  const [modalitySelected, setModalitySelected] = useState<any>(
    filters?.modalityCrime
  );
  const [modalitiesResponse, callModalities] = useApi();

  //prediction
  const [timeRange, setTimeRange] = useState<CrimeTimeRange>(
    filters?.timeRange
  );
  const [timeRangeModified, setRangeTimeModified] = useState<CrimeTimeRange>(
    crimePredictionTimeRange
  );

  const onApply = () => {
    if (predictionMode) {
      setFilters({
        timeRange: timeRangeModified,
      });
    } else {
      setFilters({
        typeCrime: typeCrimeSelected,
        subtypeCrime: subtypeCrimeSelected,
        modalityCrime: modalitySelected,
      });
    }
  };

  const onClear = () => {
    setTypeCrimeSelected(null);
    setSubtypeCrimeSelected(null);
    setModalitySelected(null);
    onClearFilters(Math.random());
  };

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
    if (typeCrimeSelected?.value) {
      setSubtypesCrimeLoading(true);
      callSubtypesCrime(getSubtypes(typeCrimeSelected?.value));
    }
  }, [typeCrimeSelected]);

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
    if (subtypeCrimeSelected?.value) {
      setModalitiesLoading(true);
      callModalities(getModalities(subtypeCrimeSelected?.value));
    }
  }, [subtypeCrimeSelected]);

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

  const HistoricalFilters = () => {
    return (
      <section className="filterItems">
        <Select
          className="filterItems__field"
          label="Tipo de crimen"
          options={[crimeSelectDefaultOption, ...typesCrime]}
          value={typeCrimeSelected}
          onChange={(newValue) => {
            setTypeCrimeSelected(newValue);
            setSubtypeCrimeSelected(null);
            setModalitySelected(null);
          }}
        />
        <Select
          className="filterItems__field"
          label="Subtipo de crimen"
          options={[crimeSelectDefaultOption, ...subtypesCrime]}
          value={subtypeCrimeSelected}
          onChange={(newValue) => {
            setSubtypeCrimeSelected(newValue);
            setModalitySelected(null);
          }}
        />
        <Select
          className="filterItems__field"
          label="Modalidad de crimen"
          options={[crimeSelectDefaultOption, ...modalities]}
          value={modalitySelected}
          onChange={(newValue) => {
            setModalitySelected(newValue);
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
