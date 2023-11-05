import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ title, description, icon, buttons, isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className={`fixed overflow-y-auto ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="p-4 sm:p-10 text-center overflow-y-auto">
              {/* Icon */}
              {icon && <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">{icon}</span>}
              {/* End Icon */}

              {title && <h3 className="mb-2 text-2xl font-bold text-gray-800">{title}</h3>}
              {description && <p className="text-gray-500">{description}</p>}

              <div className="mt-6 flex justify-center gap-x-4">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className={`py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border ${
                      button.isCancel
                        ? 'border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all'
                        : 'font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all'
                    } text-sm`}
                  >
                    {button.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.element,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      isCancel: PropTypes.bool,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
