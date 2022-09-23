import React from 'react';
import './loading.scss';

interface LoadingProps {
  title?: string;
}

const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const { title } = props;
  return (
    <div className="loadingWrapper">
      <div className="loadingWrapper__content">
        <div className="spinner" />
        {title && <p className="spinnerTitle">{title}</p>}
      </div>
    </div>
  );
};

export default Loading;
