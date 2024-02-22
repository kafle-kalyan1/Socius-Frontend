import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { showModal } from '/src/components/Alert/Alert';
import { hideAlertModal } from '/src/components/Alert/Alert';
import { IoMdClose } from "react-icons/io";

const BigPopup = ({ id, onClose, children, ask = false, closeOnOutsideClick = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    const handleEsc = (event) => {
      if (!isOpen) {
        window.removeEventListener('keydown', handleEsc);
        return;
      }
  
      if (isOpen && event.keyCode === 27) {
        if (ask) {
          showModal({
            type: "info",
            title: "Close Without Saving",
            message: "Are you sure you want to close without saving",
            buttons: [
              {
                title: "Yes",
                onclick: () => {
                  document.getElementById(id).style.display = 'none';
                  setIsOpen(false);
                },
              },
              {
                title: "No",
                onclick: () => {
                  hideAlertModal();
                },
              },
            ],
            outSideAction: true,
          });
        } else {
          handleClose();
        }
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && closeOnOutsideClick) {
        if (!modalRef.current.contains(event.target)) {
          const isButtonDescendant = Array.from(modalRef.current.querySelectorAll('button')).some(button => button.contains(event.target));
          if (!isButtonDescendant) {
            handleClose();
          }
        }
      }
    };
  
    window.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    // Disable tab navigation on background elements
    const backgroundElements = document.querySelectorAll('body > :not(#' + id + ')');
    backgroundElements.forEach(element => {
      element.setAttribute('tabIndex', isOpen ? '-1' : '0');
    });
  
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);

      // Restore tab navigation on background elements when the modal is closed
      backgroundElements.forEach(element => {
        element.setAttribute('tabIndex', '0');
      });
    };
  }, [isOpen, ask, id, closeOnOutsideClick]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    else{
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <div className='fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70' id={id}>
      <div className="relative" ref={modalRef}>
        <button
          className='absolute top-4 -right-2 z-30 w-8 h-8 rounded-md text-text1  duration-200 dark:text-text2 hover:bg-red-500 dark:hover:bg-red-600 cursor-pointer bg-cardBorder dark:bg-darkcardBorder focus:outline-none focus:bg-red-600 dark:focus:bg-red-600'
          onClick={handleClose}
        >
          <IoMdClose className='w-8 h-8'/>
        </button>
        <div className='mt-6 p-0 w-auto min-w-md max-h-[90vh] bg-cardBg2 dark:bg-darkcardBg2 rounded-md shadow-md overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

let modals = [];

export function showBigPopup({ id, onClose, children, ask = false, closeOnOutsideClick = false }) {
  const modalContainer = document.getElementById(id);

  if (!modalContainer) {
    const newModalContainer = document.createElement('div');
    newModalContainer.id = id;
    document.body.appendChild(newModalContainer);
  }

  modals.push({ id, onClose, children, ask, closeOnOutsideClick });

  updateModalsState();
}

export function hideBigPopup(id, ask = false) {
  if (ask) {
    showModal({
      type: "info",
      title: "Close Without Saving",
      message: "Are you sure you want to close without saving",
      buttons: [
        {
          title: "Yes",
          onclick: () => {
            modals = modals.filter((modal) => modal.id !== id);
            updateModalsState();
          },
        },
        {
          title: "No",
          onclick: () => {
            hideAlertModal();
          },
        },
      ],
      outSideAction: true,
    });
  } else {
    // Remove the modal from the modals array
    modals = modals.filter((modal) => modal.id !== id);

    // Update the state to trigger a re-render
    updateModalsState();
  }
}

// Function to update the state and trigger a re-render
const updateModalsState = () => {
  ReactDOM.createRoot(document.getElementById('modals-container')).render(
    <div id="modals-container">
      {modals.map((modal) => (
        <BigPopup
          key={modal.id}
          id={modal.id}
          onClose={modal.onClose}
          ask={modal.ask}
          closeOnOutsideClick={modal.closeOnOutsideClick}
        >
          {modal.children}
        </BigPopup>
      ))}
    </div>
  );
};

export default BigPopup;
