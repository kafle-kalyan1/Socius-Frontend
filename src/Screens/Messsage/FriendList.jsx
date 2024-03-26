import React, { useContext, useEffect } from 'react'
import { DecryptString, dateFormat, defaultProfilePic } from '../../Library/Others/Others';
import { useNavigate } from 'react-router-dom';
import imgSrc from './Utils/no.gif'
import Button from '../../components/Button/Button';
import { TbFriends } from 'react-icons/tb';
import imgSrc2 from './Utils/no2.gif'
import { ThemeContext } from '../../context/ThemeContext/Index';


const FriendList = ({userList, open, setOpen, setCurrentChatUser, setMessages,currentChatUserDetails}) => {
   const navigate = useNavigate();
   const {isDarkTheme} = useContext(ThemeContext);

  return (
   <div
   className={` bg-cardBg dark:bg-darkcardBg gap-2 flex flex-col overflow-auto w-full  max-md:w-full max-md:h-full border-r-2 border-cardBorder z-10 shadow-md `}
 >
   {userList.length > 0 ?
     userList.map((user) => (
       <div
         key={user.username}
         onClick={() => {
           navigate(`/message/${user.username}/`, {
             state: {
               currentChatUser: user.username,
               profile_picture: user.profile_picture,
             },
           });
           setCurrentChatUser(user.username);
           setMessages([]);
           if (open) setOpen(false);
         }}
         className="bg-cardBg dark:bg-darkcardBg px-3 flex items-center hover:bg-cardBg2 dark:hover:bg-darkcardBg2 cursor-pointer border-b border-gray-300 text-text1 dark:text-text2"
       >
         <div>
           <img
             className="h-12 w-12 rounded-full"
             src={
               user.profile_picture
                 ? user.profile_picture
                 : defaultProfilePic
             }
             alt={`Profile of ${user.username}`}
           />
         </div>
         <div className="ml-4 flex-1 py-4">
           <div className="flex items-bottom justify-between">
             <p className="text-text1 dark:text-text2 font-semibold">
               {user.username}
             </p>
             <p className="text-xs text-text4 max-lg:hidden dark:text-text3">
               {dateFormat(user.timestamp)}
             </p>
           </div>
           <p className="text-text4 dark:text-text3 mt-1 text-sm">
             {user.last_message
               ? DecryptString(user.last_message)
               : "Click to start a chat"}
           </p>
         </div>
       </div>
     ))
     :
     <div className='max-h-[70%]'>
              <img
                src={isDarkTheme ? imgSrc2 : imgSrc}
                alt="No messages"
                className="w-full  m-auto my-20 "
              />
              
              <div className="text-text1 dark:text-text2 text-center text-lg font-primary_font mx-4 tracking-normal">
                <p>
                No friends to Message
                </p>
                <br />
                <p>
                  Start a chat with someone by becoming friends with them
                </p>
                <Button
                type={"primary"}
                onClick={() => navigate('/friends', { state: { activeSection: 'recommended' } })}
                text={"Find Friends"}
                icon={<TbFriends/>}
                />
              </div>
     </div>
   }
 </div>
   )
}

export default FriendList