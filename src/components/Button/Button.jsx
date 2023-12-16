/**
 * Button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number|string} props.width - The width of the button. Can be a number or a string representing a CSS value.
 * @param {string} props.text - The text content of the button.
 * @param {string} props.type - The type of the button. Can be "primary", "secondary", or "danger".
 * @param {function} props.onClick - The click event handler for the button.
 * @returns {JSX.Element} The rendered button component.
 */
import React, { useEffect } from 'react'


const Button = ({width, text, type, onClick}) => {
   const getWidthClass = () => {
      if (typeof width === 'number') {
        return `w-${width}`;
      } else if (typeof width === 'string') {
        return `w-[${width}]`;
      } else {
        return 'w-full';
      }
    };
  
    const widthClass = getWidthClass();
  
 if(type === "primary"){
   return (
         <button
         onClick={onClick}
            type="submit"
             className={`${widthClass}  px-4 py-2 tracking-wide text-dark_textPrimary dark:text-dark_textPrimary transition-colors  cursor-pointer duration-200 transform bg-primary rounded-md hover:bg-primary_hover focus:outline-black focus:bg-primary_hover`}>
              {text}
            </button>
   )
 }
   if(type === "secondary"){
     
      return (
            <button
            onClick={onClick}
               type="submit"
               className={`${widthClass} cursor-pointer  px-4 py-2 tracking-wide text-dark_textPrimary dark:text-dark_textPrimary transition-colors duration-200 transform bg-secondary rounded-md hover:bg-secondary_hover focus:outline-black focus:bg-secondary_hover`}>
               {text}
               </button>
      )
   }
   //now case for danger 
   if(type === "danger"){

      return (
            <button
            onClick={onClick}
               type="submit"
               className={`${widthClass} cursor-pointer  px-4 py-2 tracking-wide text-dark_textPrimary dark:text-dark_textPrimary transition-colors duration-200 transform bg-danger rounded-md hover:bg-danger_hover focus:outline-black focus:bg-danger_hover`}>
               {text}
               </button>
      )
   }
   //if type == txtPrimary then use white bg and primary as text color
   if(type === "txtPrimary"){

      return (
            <button
            onClick={onClick}
               type="submit"
               className={`${widthClass} cursor-pointer  px-4 py-2 tracking-wide text-primary dark:text-primary transition-colors duration-200 transform bg-white rounded-md hover:bg-primary_hover hover:text-white focus:outline-black focus:bg-primary_hover`}>
               {text}
               </button>
      )
   }
   //if type == txtSecondary then use white bg and secondary as text color
   if(type === "txtSecondary"){

      return (
            <button
            onClick={onClick}
               type="submit"
               className={`${widthClass} cursor-pointer  px-1 py-1 tracking-wide text-secondary dark:text-secondary transition-colors duration-200 transform bg-white rounded-md hover:bg-secondary_hover hover:text-white focus:outline-black focus:bg-secondary_hover`}>
               {text}
               </button>
      )
   }
   //if type == txtDanger then use white bg and danger as text color
   if(type === "txtDanger"){

      return (
            <button
            onClick={onClick}
               type="submit"
               className={`${widthClass}  cursor-pointer  px-1 py-2 tracking-wide text-danger dark:text-danger transition-colors duration-200 transform bg-white rounded-md hover:bg-danger_hover hover:text-white focus:outline-black focus:bg-danger_hover`}>
               {text}
               </button>
      )
   }
}

export default Button

//      <Button type={"danger"} text={"click me"} width={"4px"}/>
