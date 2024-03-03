import React, { createContext, useEffect, useState } from 'react';
import APICall from '../../Library/API/APICall';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
   // State to track the theme
   const [numOfNotification, setNumOfNotification] = useState(2);
   const [notificationList, setNotificationList] = useState([]
   );
   useEffect(() => {
    getNotificationList();
  },[]);

  useEffect(() => {
    console.log(notificationList);
  },[notificationList]);

  const getNotificationList = async () => {
    var response = await APICall("/api/utils/notifications/", "GET", {});
    if(response.status == 200){
      setNotificationList(response.data.notifications);
    }
  }

   const contextValue = {
    numOfNotification,
    setNumOfNotification,
    notificationList,
    setNotificationList
   }
  
   return (
      <NotificationContext.Provider value={contextValue}>
         {children}
      </NotificationContext.Provider>
   );
};