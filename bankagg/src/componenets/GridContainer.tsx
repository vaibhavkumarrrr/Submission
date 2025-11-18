import React from 'react';

const GridContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className="container">
      <div className={`grid ${className || ''}`.trim()}>{children}</div>
    </div>
  );
};

export default GridContainer;