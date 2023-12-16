import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

/**
 * @param {Object} props
 * @param {Function} props.onClose - Function to be called when the popup is closed
 * @param {React.ReactNode} props.children - Content of the popup
 * @returns {React.ReactNode}
 * @example 
 * <BigPopup onClose={handleClose}>
 *   <div>Content</div>
 * </BigPopup>
 */
const BigPopup = ({ onClose, children }) => {
   const [isOpen, setIsOpen] = useState(true);

   //shortcut key esc to close popup in useEffect
   useEffect(() => {
      const handleEsc = (event) => {
         if (event.keyCode === 27) {
            handleClose();
         }
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
         window.removeEventListener('keydown', handleEsc);
      };
   });
   

   const handleClose = () => {
      setIsOpen(false); // Set isOpen to false to hide the popup
      if (onClose) {
         onClose(); // Call the onClose function if provided
      }
   };


   return (
      <>
         {isOpen && (
            <div
            className='fixed scroll-smooth overflow-y-scroll scroll-bar  inset-0 bg-cardBorder   backdrop-filter backdrop-blur-md flex justify-center items-center z-40  mx-auto bg-opacity-5'
            >
               <button className='fixed block top-2 right-2 w-8 h-8 rounded-md text-white hover:bg-error_red hover:opacity-100  duration-200  bg-black opacity-50 cursor-pointer'
                  onClick={handleClose}
               >
                  X
               </button>
               <div className='mt-32 p-1 w-full '>
               <div className=' '>

               {children}
               </div>
               </div>
            </div>
         )}
      </>
   );
};

// write jsdox comments for the functions
/**
 * @param {Object} props
 * @param {Function} props.onClose - Function to be called when the popup is closed
 * @param {React.ReactNode} props.children - Content of the popup
 * @returns {React.ReactNode}
 * @example 
 * <BigPopup onClose={handleClose}>
 *   <div>Content</div>
 * </BigPopup>
 */
export function showBigPopup({ onClose, children }) {
   const modalContainer = document.getElementById('modal');
console.log(onClose)
   ReactDOM.createRoot(modalContainer).render(
      <BigPopup onClose={onClose}>{children}</BigPopup>
   );
   document.getElementById('modal').style.display = 'block';
}

export function hideBigPopup() {
   document.getElementById('modal').style.display = 'none';
}

export default BigPopup;

