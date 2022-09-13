import React from 'react';
import cx from 'classnames';
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
  outline?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = (
  props
): React.ReactElement<ButtonProps> => {
  const {
    buttonType = 'primary',
    children,
    className,
    outline = false,
    ...otherButtonProps
  } = props;
  return (
    <button
      {...otherButtonProps}
      className={cx(
        'button',
        buttonType && `button--${buttonType}`,
        outline && `button--outline`,
        className && className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
