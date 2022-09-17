import * as React from 'react';
import './input.scss';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  error?: string | boolean;
  label?: string;
  type?: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  disabled = false,
  error = '',
  label = '',
  type = 'text',
  ...props
}: InputProps) => {
  const { className, ...otherInputProps } = props;
  const isErrorString = error && typeof error === 'string';
  return (
    <div
      className={`input ${className && className} ${error && `input--error`}`}
    >
      {label && <label className={`input__label`}>{label}</label>}
      <input {...otherInputProps} className="input__field" type={type} />
      {isErrorString && <p className="input__errorMessage">{error}</p>}
    </div>
  );
};

export default Input;
