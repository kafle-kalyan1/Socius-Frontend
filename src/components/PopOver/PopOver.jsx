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
    <div className='z-100 cursor-pointer text-text1 dark:text-text2 bg-cardBg2 dark:bg-darkcardBg2 p-0 m-0'>
      <hr className='border-red-500' />
      <div className='text-text1 dark:text-text2' style={{ display: 'flex', flexDirection: 'column' }}>
        {buttons.map((button, index) => (
          button && <Button
            className=" cursor-pointer hover:shadow-lg text-text1 dark:text-text2"
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
    <Popover className='cursor-pointer text-text1 dark:text-text2 ' content={popoverContent} title={null} trigger="click" placement={placement} visible={visible} onVisibleChange={handleVisibleChange}>
      {mainButton}
    </Popover>
  );
};

export default CustomPopover;