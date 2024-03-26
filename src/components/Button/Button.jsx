import React, { useEffect, useState } from 'react';
import { ShortcutKey, sanitizeHtml } from '../../Library/Others/Others';
import { FaSpinner } from 'react-icons/fa'; // Assuming you're using react-icons for icons

const Button = ({ width, text, type, onClick, shortCutKey, icon, disabled=false,className }) => {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error('Error during button click:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const buttonClasses = `flex cursor-pointer text-center px-4 py-1 tracking-wide text-textPrimary dark:text-textPrimary transition-colors duration-200 transform rounded-md`;

  const typeClasses = {
    primary: 'bg-primary_btn_dark hover:bg-primary_btn_dark_hover text-white focus:outline-none focus:bg-primary_btn_dark_hover',
    secondary: 'bg-secondary_btn hover:bg-secondary_btn_hover text-white focus:outline-none focus:bg-secondary_btn_hover',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:bg-red-600',
    txtPrimary: 'bg-indigo_bg hover:bg-primary_btn_dark text-indigo_text hover:text-white  focus:outline-none focus:bg-primary_btn_dark focus:text-white',
    txtSecondary: 'bg-green_bg hover:bg-secondary_btn_hover text-secondary_text hover:text-white focus:outline-none focus:bg-secondary_btn_hover focus:text-white',
    txtDanger: 'bg-red_bg hover:bg-red_text hover:text-white focus:outline-none text-red-600 focus:bg-red_text focus:text-white',
  };

  const typeClass = typeClasses[type] || typeClasses.primary;

  return (
    <button
      onClick={(e)=>handleClick(e)}
      type="submit"
      className={`transition focus:ring-2  focus:border-main_text  disabled:cursor-not-allowed disabled:opacity-50 ease-linear duration-100 shadow-md ${buttonClasses} ${typeClass} hover:shadow-lg justify-center text-text1 dark:text-text2 ${className}`}
      disabled={disabled}
    >
          {icon && <span className="mt-1 mr-3">{icon}</span>}
      {isLoading ? (
        <FaSpinner className="animate-spin mr-2" />
      ) : (
        <>
          {isAltPressed ? <span dangerouslySetInnerHTML={{ __html: text }} /> : sanitizeHtml(text)}

        </>
      )}
    </button>
  );
};

export default Button;
