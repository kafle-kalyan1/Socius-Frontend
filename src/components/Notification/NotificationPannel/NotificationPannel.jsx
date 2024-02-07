import React from 'react'

const NotificationPannel = () => {
  return (
<>

    <div
      className="h-screen w-full block scroll-bar2 r-0 z-30 m-0  overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700 "
      id="notification"
    >
      <div className="bg-cardBg dark:bg-darkcardBg h-screen overflow-y-auto p-8 text-text1 dark:text-text2">
        <div className="flex items-center justify-between">
          <p
            tabIndex={0}
            className="focus:outline-none text-2xl font-semibold leading-6 text-text1 dark:text-text2"
          >
            Notifications
          </p>
        </div>
        <div className="w-full p-3 mt-8 bg-cardBg2 dark:bg-darkcardBg2 rounded flex">
          <div
            tabIndex={0}
            aria-label="heart icon"
            role="img"
            className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z"
                fill="#EF4444"
              />
            </svg>
          </div>
          <div className="pl-3">
            <p tabIndex={0} className="focus:outline-none text-sm leading-none">
              <span className=" text-main_text">James Doe</span> favourited an{" "}
              <span className=" text-main_text">item</span>
            </p>
            <p
              tabIndex={0}
              className="focus:outline-none text-xs leading-3 pt-1 text-text1 dark:text-text2"
            >
              2 hours ago
            </p>
          </div>
        </div>

      </div>
    </div>
</>
  )
}

export default NotificationPannel