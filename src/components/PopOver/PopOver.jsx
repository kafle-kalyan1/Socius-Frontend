import React from 'react';
import { Popover, Button } from 'antd';

const CustomPopover = ({ content, buttons, mainButton, placement='right' }) => {
  const popoverContent = (
    <div className='z-100'>
      <div className='z-30'>
        <p>{content}</p>
      </div>
      <hr color='red' />
      <div style={{ marginTop: '10px', display:'flex', flexDirection:"column" }}>
        {buttons.map((button, index) => (
          <buttons className="cursor-pointer hover:text-primary z-30 bg-cardBg" key={index} onClick={button.onClick}>
            {button.label}
          </buttons>
        ))}
      </div>
    </div>
  );

  return (
    <Popover content={popoverContent} title={null} trigger="click" placement={placement}  >
    {mainButton}
    </Popover>
  );
};

export default CustomPopover;
