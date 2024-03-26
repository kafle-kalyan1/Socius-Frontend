import React, { useContext, useEffect } from 'react'
import { NotificationContext } from '../../../context/NotificationContext/NotificationContext';
import { Notification } from '../../../Screens/Notification/Notification';
import toast from 'react-hot-toast';
import APICall from '../../../Library/API/APICall';
import { dateFormat, firstLetterCapital } from '../../../Library/Others/Others';
import comment_icon from '/src/assets/Post/comment.jpg' 
import heart_icon from '/src/assets/Post/heart.jpg'
import friend_icon from '/src/assets/Post/friend.jpg'
import { useNavigate } from 'react-router-dom';

const NotificationPannel = () => {
  const { notificationList,setNotificationList } = useContext(NotificationContext);
  const navigate = useNavigate();

  const clearNotifications = async () => {
      const response = await APICall('/api/notifications/markallnotificationasread/', 'GET', {});
      if(response.status == 200){
        setNotificationList([]);
        toast.success(response.message);
      }

    }

  const findIcon = (type) => {
    switch (type) {
      case "like":
        return heart_icon;
      case "comment":
        return comment_icon;
      case "friend_request":
        return friend_icon;
      case "post":
        return "/assets/icons/post.svg";
      default:
        return heart_icon;
    }
  }
  return (
<>

    <div
      className=" w-full pt-5 block r-0 z-30 m-0  overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700 bg-cardBg  scroll-bar overflow-y-hidden dark:bg-darkcardBg h-screen foucs:overflow-y-auto hover:overflow-y-auto p-4 text-text1 dark:text-text2"
      id="notification"

    >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center justify-between w-full">
        <h3 className="font-bold text-xl sm:text-2xl text-gray-800  dark:text-white">Notifications</h3>
        <button className="inline-flex text-sm bg-white justify-center px-4 py-2 w-2/5 text-red-500 items-center rounded font-medium shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:scale-110 dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800"
        onClick={() => clearNotifications()}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 sm:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Clear all notifications
      </button>
      </div>
        </div>
        <div className="w-full p-1 m-0 mt-8 rounded flex-wrap">
        
        {
        notificationList ?
        notificationList.map((notification, index) => (
          <Notification
            key={index}
            iconSrc={findIcon(notification?.notification_type)}
            title={firstLetterCapital(notification?.notification_type)}
            time={dateFormat(notification?.timestamp, true)}
            message={notification?.notification_message}
            onClick={()=>navigate(notification?.action_on_view)}
          />
        ))
        :
        (<p className="mt-4 text-gray-500 dark:text-white">No new notifications</p>)

      }
        </div>

    </div>
</>
  )
}

export default NotificationPannel