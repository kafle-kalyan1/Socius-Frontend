import React from 'react';
import toast from 'react-hot-toast';

// Reusable Notification component
const Notification = ({ iconSrc, title, time, message, onClick }) => (
  <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full" onClick={onClick}>
    <div className="inline-flex items-center justify-between w-full">
      <div className="inline-flex items-center">
        <img src={iconSrc} alt="Icon" className="w-6 h-6 mr-3" />
        <h3 className="font-bold text-base text-gray-800">{title}</h3>
      </div>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
    <p className="mt-1 text-sm">{message}</p>
  </div>
);

const clearNotifications = () => {
   // Clear all notifications
   toast.success("All notifications cleared!");
   }

// Notifications component
const Notifications = () => (
  <div className="h-screen grid place-items-center my-8">
    <div className="lg:w-3/5 sm:w-4/5 w-full bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10 shadow-sm">
      <div className="inline-flex items-center justify-between w-full">
        <h3 className="font-bold text-xl sm:text-2xl text-gray-800  dark:text-white">Notifications</h3>
        <button className="inline-flex text-sm bg-white justify-center px-4 py-2 w-auto text-red-500 items-center rounded font-medium shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:scale-110 dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800"
        onClick={() => clearNotifications()}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 sm:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Clear all notifications
      </button>
      </div>
      <p className="mt-8 font-medium text-gray-500 text-sm sm:text-base dark:text-white">Today</p>
      {/* Example notifications */}
      <Notification
        iconSrc="https://cdn-icons-png.flaticon.com/128/763/763812.png"
        title="Training"
        time="2 min ago"
        message="Hey! Do you remember about choosing your training regime?"
        onClick={() => console.log("Training notification clicked!")}
      />
      <Notification
        iconSrc="https://cdn-icons-png.flaticon.com/512/893/893257.png"
        title="Messages"
        time="1 hour ago"
        message="You have a new message"
        onClick={() => toast.success("Training notification clicked!")}

      />
      <p className="mt-8 font-medium text-gray-500 dark:text-white text-sm sm:text-base">Yesterday</p>
      {/* Example notifications */}
      <Notification
        iconSrc="https://cdn-icons-png.flaticon.com/512/6863/6863272.png"
        title="Forms"
        time="12:47"
        message="Remember about filling out the COVID-19 from before the next appointment tomorrow"
        onClick={() => toast.success("Training notification clicked!")}

      />
      <Notification
        iconSrc="https://cdn-icons-png.flaticon.com/128/763/763812.png"
        title="Training"
        time="12:43"
        message="We're glad you've decided to use our training system! Let's now set a complete of things"
        onClick={() => toast.success("Training notification clicked!")}

      />
      {/* Clear all notifications button */}
      
    </div>
  </div>
);

export default Notifications;
