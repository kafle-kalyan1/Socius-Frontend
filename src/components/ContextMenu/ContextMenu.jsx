import React from 'react';

const ContextMenu = ({ anchorPoint, children, handleClose }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleClick = () => handleClose();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClose]);

  React.useEffect(() => {
    setPosition({ x: anchorPoint.x, y: anchorPoint.y });
  }, [anchorPoint]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};

export default ContextMenu;