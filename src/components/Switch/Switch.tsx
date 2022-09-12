import * as React from 'react';
import cx from 'classnames';
import './switch.scss';

export interface ISwitch
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  label: string;
  disabled?: boolean;
}

const Switch: React.FC<ISwitch> = ({
  label = '',
  disabled = false,
  ...props
}: ISwitch) => {
  const { className } = props;
  return (
    <div className={cx(className && className)}>
      {label && <label htmlFor="switch">{label}</label>}
      <input type="checkbox" id="switch" />
    </div>
  );
};

export default Switch;
