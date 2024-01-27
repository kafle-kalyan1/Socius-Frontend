import React, { useState } from 'react';
import { Popover, Button } from 'antd';

const CustomPopover = ({ content, buttons, mainButton, placement = 'right' }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handleClick = (onClick) => {
    onClick();
    setVisible(false);
  };

  const popoverContent = (
    <div className='z-100 cursor-pointer'>
      <div className='z-30'>
        <p>{content}</p>
      </div>
      <hr className='border-red-500' />
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
        {buttons.map((button, index) => (
          button && <Button
            className=" cursor-pointer hover:shadow-lg"
            key={index}
            onClick={() => handleClick(button.onClick)}
          >
            <div className="flex items-center">
              {button.icon}
              {button.label}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <Popover className='cursor-pointer' content={popoverContent} title={null} trigger="click" placement={placement} visible={visible} onVisibleChange={handleVisibleChange}>
      {mainButton}
    </Popover>
  );
};

export default CustomPopover;