import React from 'react';
import cx from 'classnames';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Card from '../../../../components/Card/Card';
import './crimeFilters.scss';

interface CrimeFiltersProps {
  className?: string;
}

const CrimeFilters: React.FC<CrimeFiltersProps> = (
  props: CrimeFiltersProps
) => {
  const { className } = props;

  return (
    <Card className={cx('crimeFilters', className && className)}>
      <Input placeholder="Fecha"></Input>
      <Input placeholder="Hora"></Input>
      <Input placeholder="Dirección"></Input>
      <Button buttonType="secondary">Filtrar</Button>
    </Card>
  );
};

export default CrimeFilters;
