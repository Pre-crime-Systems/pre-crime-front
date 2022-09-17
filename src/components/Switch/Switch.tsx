import * as React from 'react';
import cx from 'classnames';
import './switch.scss';

export interface ISwitch
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  disabled?: boolean;
  label?: React.ReactNode | string;
  ref?: any;
}

const Switch: React.FC<ISwitch> = ({
  checked = false,
  disabled = false,
  label = '',
  ...props
}: ISwitch) => {
  const { className, ref } = props;
  const isLabelString = label && typeof label === 'string';
  return (
    <section className={cx('switch', className && className)}>
      {isLabelString && <label className={'switch__label'}>{label}</label>}
      <label className={'switch__field'}>
        <input
          {...props}
          className="switchInput"
          disabled={disabled}
          ref={ref}
          type="checkbox"
        />
        <span className="switchSlider"></span>
      </label>
    </section>
  );
};

export default Switch;
