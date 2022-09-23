import React from 'react';
import Select from 'react-select';
import cx from 'classnames';
import './select.scss';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: '#c5c8cd',
    borderRadius: '0.5rem',
    boxShadow: 'none',
    color: '#343a40',
    fontSize: '.875rem',
    '&:hover': {
      boxShadow: '0 0 0 1px #c5c8cd',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? '#343a40' : '#575d62',
    fontSize: '.875rem',
    padding: '.375rem .625rem',
    backgroundColor: state.isSelected || state.isFocused ? '#e5e8ec' : 'white',
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
  const { options, onChange, value, className, onInputChange, ...otherProps } =
    props;
  const isErrorString = error && typeof error === 'string';

  return (
    <div
      className={cx('select', error && 'select--error', className && className)}
    >
      {label && <label className="select__label">{label}</label>}
      <Select
        {...otherProps}
        isClearable={false}
        isDisabled={disabled && disabled}
        isLoading={isLoading && isLoading}
        onChange={(value: any) => onChange && onChange(value)}
        onInputChange={(value: any) => onInputChange && onInputChange(value)}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        value={value && value}
      />
      {isErrorString && <p className="select__errorMessage">{error}</p>}
    </div>
  );
};

export default ReactSelect;
