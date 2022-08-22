import React from 'react';
import './button.scss';

export type ButtonType = 'primary' | 'secondary';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode | string;
  className?: string;
  buttonType?: ButtonType;
}

const Button: React.FunctionComponent<ButtonProps> = (
  props
): React.ReactElement<ButtonProps> => {
  const {
    children,
    className,
    buttonType = 'primary',
    ...otherButtonProps
  } = props;
  return (
    <button
      {...otherButtonProps}
      className={`button ${className && className} ${`button--${buttonType}`}`}
    >
      {children}
    </button>
  );
};

export default Button;
