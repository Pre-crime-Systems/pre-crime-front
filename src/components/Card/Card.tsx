import React from 'react';
import './card.scss';

interface CardProps {
  children: any;
  className?: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { children, className } = props;
  return (
    <section className={`card ${className && className}`}>{children}</section>
  );
};

export default Card;
