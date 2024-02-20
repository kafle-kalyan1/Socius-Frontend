import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ bgColor = '#e0f9ed', title, description, textColor = '#39c983', onClick, Icon, width='30%' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/staff");
    }
  };

  return (
    <div
      className={`w-1/3 bg-[${bgColor}] border-[1px] border-[${bgColor} p-6 rounded-md flex flex-col gap-y-4 shadow-md cursor-pointer h-max max-sm:w-5/6 hover:shadow-xl transition-all duration-300 ease-in-out`}
      style={{ backgroundColor: bgColor, borderColor: bgColor}}
      onClick={handleClick}
    >
      <div className="flex items-center text-center justify-start gap-x-4">
        {Icon && <Icon size={25} style={{color:textColor}} className={`text-[${textColor}]`} />}
        <span className={`capitalize text-center font-poppins font-bold text-[${textColor}]`} style={{ color: textColor}}>
          {title}
        </span>
      </div>
      <span className="font-opensans text-sm tracking-wide leading-relaxed">
        {description}
      </span>
    </div>
  );
};

export default Card;