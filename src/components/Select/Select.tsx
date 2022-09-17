import React from 'react';
import Select from 'react-select';
import cx from 'classnames';
import './select.scss';

const customStyles = {
  control: (values: any) => ({
    ...values,
    borderColor: '#c5c8cd',
    borderRadius: '0.5rem',
    color: '#343a40',
    fontSize: '.875rem',
  }),
  option: (values: any) => ({
    ...values,
    color: '#575d62',
    fontSize: '.875rem',
    padding: '.375rem .625rem',
  }),
  placeholder: (values: any) => ({
    ...values,
    color: '#575d62',
    fontSize: '.875rem',
  }),
  indicatorSeparator: (values: any) => ({
    ...values,
    display: 'none',
  }),
};

export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps {
  options?: SelectOption[];
  placeholder?: string;
  value?: any;
  onChange?: (e: any) => void;
  className?: string;
  isClearable?: boolean;
  disabled?: boolean;
  onInputChange?: (e: any) => void;
  isLoading?: boolean;
  label?: string;
  error?: string | boolean;
}

const ReactSelect: React.FC<SelectProps> = ({
  placeholder = '',
  isClearable = true,
  disabled = false,
  label = '',
  error = '',
  isLoading = false,
  ...props
}: SelectProps) => {
  const { options, onChange, value, className, onInputChange } = props;
  const isErrorString = error && typeof error === 'string';

  return (
    <div
      className={cx('select', error && 'select--error', className && className)}
    >
      {label && <label className="select__label">{label}</label>}
      <Select
        {...props}
        isClearable={false}
        isDisabled={disabled && disabled}
        isLoading={isLoading && isLoading}
        styles={customStyles}
        onChange={(value: any) => onChange && onChange(value)}
        onInputChange={(value: any) => onInputChange && onInputChange(value)}
        options={options}
        placeholder={placeholder}
        value={value && value}
      />
      {isErrorString && <p className="select__errorMessage">{error}</p>}
    </div>
  );
};

export default ReactSelect;
