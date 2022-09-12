import React from 'react';
import cx from 'classnames';
import Card from '../../../../components/Card/Card';
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

  return (
    <Card className={cx('crimeFilters', className && className)}>
      <h3 className="crimeFilters__title">Filtros</h3>
      <div className="crimeFilters__switch">
        <label>Modo predicciones</label>
        <input type="checkbox" onClick={() => setMode(!mode)} />
      </div>
    </Card>
  );
};

export default CrimeFilters;
