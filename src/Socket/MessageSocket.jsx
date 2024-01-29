// import React, { useContext, useEffect, useState } from 'react'
// import { w3cwebsocket } from "websocket";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { ProfileContext } from '/src/context/ProfileContext/ProfileContext';
// import { WebSocketContext } from './SocketContext';


// const MessageSocket = ({children}) => {
//    const {profile} = useContext(ProfileContext);
//    const [socket, setSocket] = useState(null);


//    useEffect(() => {
//       if(profile?.username){
//          if (!socket) {
//        const newSocket = new w3cwebsocket(`ws://localhost:8000/notifications/${profile.username}/`);
   
//        newSocket.onopen = () => {
//          console.log("WebSocket connected");
//        };
   
//        newSocket.onmessage = (event) => {
         
//          if(JSON.parse(event.data).type == "message"){
//            const message = JSON.parse(event.data).message;
//          const shortenedMessage = message.split(' ').slice(0, 100).join(' ');
   
//          toast((t) => (
//            <div className="flex items-center space-x-4">
//            <img className="w-8 h-8 rounded-full" src={JSON.parse(event.data).profile_picture} alt={JSON.parse(event.data).sender} />
//            <span>{JSON.parse(event.data).fullname}</span>
//            <div>
//              <p>{shortenedMessage}</p>
//              <button
//                className="bg-blue-500 text-white rounded px-2 py-1"
//                onClick={() => {
//                  toast.dismiss(t.id);
//                  window.location.href =`/message/${JSON.parse(event.data).sender}`;
//                }}
//              >
//                Check
//              </button>
//            </div>
//          </div>
//          ));
//          }
//        };
   
//        newSocket.onclose = () => {
//          console.log("WebSocket closed");
//        };
   
//        newSocket.onerror = (error) => {  
//          console.log(error);
//        };
   
//        return () => {
//          if (newSocket) {
//            newSocket.close();
//            newSocket.onclose = () => {
//              console.log("WebSocket closed");
//            }
   
//          }
//        };
//       }
//       }
   
//    }, [socket, profile]);

//      return (
//       <WebSocketContext.Provider value={socket}>
//         {children}
//       </WebSocketContext.Provider>
//     );
// }

// export default MessageSocket