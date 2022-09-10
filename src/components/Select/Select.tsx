import React from 'react';
import Select from 'react-select';
import cx from 'classnames';
import './select.scss';

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
      className={cx(
        'select',
        error && 'select--error',

        className && className
      )}
    >
      {label && <label className="select__label">{label}</label>}
      <Select
        {...props}
        value={value && value}
        placeholder={placeholder}
        isDisabled={disabled && disabled}
        options={options}
        isClearable={isClearable}
        onChange={(value: any) => onChange && onChange(value)}
        onInputChange={(value: any) => onInputChange && onInputChange(value)}
        isLoading={isLoading && isLoading}
      />
      {isErrorString && <p className="select_errorMessage">{error}</p>}
    </div>
  );
};

export default ReactSelect;
