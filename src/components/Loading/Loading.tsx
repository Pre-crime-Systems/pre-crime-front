import React from 'react';
import './loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="loadingWrapper">
      <div className="loadingWrapper__spinner" />
    </div>
  );
};

export default Loading;
