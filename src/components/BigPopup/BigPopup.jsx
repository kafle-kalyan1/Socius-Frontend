import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { showModal } from '/src/components/Alert/Alert';
import Cookies from 'js-cookie';
import { hideAlertModal } from '/src/components/Alert/Alert';

const BigPopup = ({ id, onClose, children, ask = false }) => {
  const [isOpen, setIsOpen] = useState(true);

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
  
    window.addEventListener('keydown', handleEsc);
  
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, ask, id]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    else{
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-40 mx-auto bg-opacity-50 bg-gray-800' id={id}>
          <button
            className='fixed block top-2 right-2 w-8 h-8 rounded-md text-white hover:bg-red-500 duration-200 bg-black opacity-50 cursor-pointer'
            onClick={handleClose}
          >
            X
          </button>
          <div className='mt-6 p-4 w-11/12 min-w-md bg-cardBg rounded-md shadow-md overflow-auto'>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

let modals = [];

export function showBigPopup({ id, onClose, children, ask = false }) {
  const modalContainer = document.getElementById(id);

  if (!modalContainer) {
    const newModalContainer = document.createElement('div');
    newModalContainer.id = id;
    document.body.appendChild(newModalContainer);
  }

  modals.push({ id, onClose, children, ask });

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
        >
          {modal.children}
        </BigPopup>
      ))}
    </div>
  );
};

export default BigPopup;