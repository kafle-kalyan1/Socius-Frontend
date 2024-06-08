import { Link } from 'react-router-dom';
import { showBigPopup,hideBigPopup } from '/src/components/BigPopup/BigPopup';
import React, { useState } from 'react';

const CookieConsent = ({setIsTermsShown}) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleAcceptAll = () => {
    setShowPopup(false);
  };

  const handleCustomPermissions = () => {
    showBigPopup({
      id: 'cookie-permissions',
      children: 
      <div className='p-4 min-w-[300px] min-h-[300px] dark:bg-darkcardBg bg-cardBg'>
      <h2 className='text-lg font-semibold mb-4'>Custom Cookie Permissions</h2>
      <div className='flex flex-col gap-4'>
        
      </div>
    </div>
      ,
      onClose: hideBigPopup('cookie-permissions')
    })
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-10 right-10 max-w-sm px-4 py-2 shadow-md bg-white text-black font-inter rounded-lg transition-all duration-500 ease-in-out">
          <div className="flex flex-col px-0 ltr:lg:pl-10 rtl:lg:pr-10">
            <div className="w-full flex justify-between items-center">
              <p className="text-md md:text-lg font-semibold m-0 text-indigo-600">
                Your Cookie Preferences
              </p>
            </div>
            <div className="flex flex-col gap-2 items-stretch ltr:lg:pr-10 rtl:lg:pl-10">
              <div className="flex-1">
                <p className="my-1 text-xs md:text-sm">
                  By clicking "Accept all," you agree to the storing of cookies on your device for
                  functional, analytics, and advertising purposes.
                </p>
                <div className="flex text-center text-[9px] mt-2 gap-2">
                  <span className="ltr:mr-4 ltr:last:mr-0 rtl:ml-4 rtl:last:ml-0">
                    <h1
                      onClick={() => setIsTermsShown((p) => !p)}
                      className="no-underline cursor-pointer shrink-0 text-indigo-600 border-b border-indigo-600"
                    >
                      Privacy policy
                    </h1>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-around mt-4 lg:mt-0 ltr:lg:pl-14 rtl:lg:pr-14">
                <div className="flex-1 gap-2 items-center flex my-0">
                  <button
                    onClick={handleCustomPermissions}
                    disabled
                    className="flex-1 lg:flex-none ltr:mr-2 rtl:ml-2 flex justify-center items-center text-center cursor-pointer px-2 md:px-4 py-2 border border-transparent text-xs leading-4 font-black bg-indigo-100 text-indigo-600 rounded-md
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Custom permissions
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 lg:flex-none flex justify-center items-center text-center cursor-pointer px-2 md:px-4 py-2 border border-transparent text-xs leading-4 font-black bg-indigo-600 text-white rounded-md
                    disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;