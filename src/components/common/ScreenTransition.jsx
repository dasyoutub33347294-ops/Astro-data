import React from 'react';
import './ScreenTransition.css';

const ScreenTransition = ({ children, animation = 'fade' }) => {
  return (
    <div className={`screen-transition ${animation}`}>
      {children}
    </div>
  );
};

export default ScreenTransition;
