import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import './textarea.scss';

export interface ITextarea
  extends React.DetailedHTMLProps<
    React.TrackHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  max?: number;
  min?: number;
  value?: any;
  onChange?: (e: any) => void;
}

const Textarea: React.FC<ITextarea> = ({
  label = '',
  disabled = false,
  error = '',
  min = 0,
  value = '',
  onChange,
  ...props
}: ITextarea) => {
  const { className, max, ...otherTextareaProps } = props;

  return (
    <section
      className={cx(
        'textarea',
        error && 'textarea--error',
        className && className
      )}
    >
      {label && <label className="textarea__label">{label}</label>}
      <textarea
        {...otherTextareaProps}
        className={'textarea__field'}
        disabled={disabled}
        maxLength={max}
        minLength={min}
        rows={2}
        value={value}
        onChange={(event) => {
          onChange && onChange(event);
        }}
      />
      {error && <p className="textarea__errorMessage">{error}</p>}
    </section>
  );
};

export default Textarea;
