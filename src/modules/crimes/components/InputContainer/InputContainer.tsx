import React from 'react';
import './inputcontainer.scss';

interface InputContainerProps {
  children: any;
  className?: string;
}

const InputContainer: React.FC<InputContainerProps> = (props: InputContainerProps) => {
  const { children, className } = props;
  return (
    <section className={`inputcontainer ${className && className}`}>{children}</section>
  );
};

export default InputContainer;