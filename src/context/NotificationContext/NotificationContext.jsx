import React, { createContext, useEffect, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
   // State to track the theme
   const [numOfNotification, setNumOfNotification] = useState(2);
   const [notificationList, setNotificationList] = useState([
    {iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
    title:"Training",
    time:"2 min ago",
    message:"Hey! Do you remember about choosing your training regime?",
    onClick: () => console.log("Training notification clicked!")
    },
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
    ,
    {
      iconSrc:"https://cdn-icons-png.flaticon.com/128/763/763812.png",
        title:"Training",
        time:"2 min ago",
        message:"Hey! Do you remember about choosing your training regime?",
        onClick:() => console.log("Training notification clicked!")
    }
   ]);

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