import React, { createContext, useEffect, useState } from 'react';

export const MessageNotificationContext = createContext();

export const MessageNotificationProvider = ({ children }) => {
   // State to track the theme
   const [totalNotification, setTotalNotification] = useState(2);

   const contextValue = {
      totalNotification,
      setTotalNotification
   }
  
   return (
      <MessageNotificationContext.Provider value={contextValue}>
         {children}
      </MessageNotificationContext.Provider>
   );
};