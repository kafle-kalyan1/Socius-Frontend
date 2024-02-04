import React, { useContext, useEffect, useState } from "react";
import TextArea from "/src/components/Input/TextArea";
import { useFormik } from "formik";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import axios from "axios";
import Cookies from "js-cookie";
import { dateFormat, defaultProfilePic } from "../../Library/Others/Others";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Message = () => {
  const { open, setOpen, isMobile } = useContext(MenuContext);
  const [userList, setUserList] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.currentChatUser) setCurrentChatUser(state?.currentChatUser);
    else if (username) setCurrentChatUser(username);
  }, [state, username]);

  useEffect(() => {
    var access = Cookies.get("access");
    axios
      .get("/api/chat/getUserList/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        setUserList(res.data.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (currentChatUser && user) {
      if (!socket) {
        const newSocket = new W3CWebSocket(`ws://localhost:8000/chat/${user}/${currentChatUser}/`);
        setSocket(newSocket);

        newSocket.onopen = () => {
          console.log("WebSocket connected");
        };

        newSocket.onmessage = (event) => {
          let new_message = JSON.parse(event.data);
          setMessages((messages) => [
            ...messages,
            {
              message: new_message.message,
              timestamp: new_message.timestamp,
              sender: {
                username: new_message.username_from,
              },
            },
          ]);

          setUserList((userList) => {
            var index = userList.findIndex((user) => user.username === currentChatUser);
            userList[index].last_message = new_message.message;
            userList[index].timestamp = new_message.timestamp;
            return [...userList];
          });
        };
      }

      return () => {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      };
    }
  }, [currentChatUser, user, socket, state, username]);

  useEffect(() => {
    if(currentChatUser){
      fetchMessages();
    }
  }, [currentChatUser, page]);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);

  const fetchMessages = () => {
    var access = Cookies.get("access");
    axios
      .get(`/api/chat/getMessages/?username=${currentChatUser}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        const reversedMessages = res.data.data.reverse();
        setMessages((prevMessages) => [...reversedMessages, ...prevMessages]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            message: values.message,
            to: currentChatUser,
            from: user,
            timestamp: new Date(),
          })
        );
      } else {
        console.error("WebSocket not ready yet.");
      }
      formik.resetForm();
    },
  });

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const setThisUser = (username) => {
    var access = Cookies.get("access");
    axios
      .get(`/api/chat/getMessages/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setCurrentChatUser(username);
  };

  const scrollChatToBottom = () => {
    const chatContainer = document.getElementById("chatContainer");

    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  return (
    <div className={`flex`}>
      <div className={` block overflow-auto scroll-bar w-3/4 h-screen font-primary_font justify-center items-center max-lg:w-full m-auto ml-[5%] max-sm:ml-0 max-sm:w-fulll`}>
        <div className="max-md:w-full max-sm:w-full">
          <div className={`flex h-screen`}>
            <div className={`bg-grey-lighter gap-2 flex flex-col overflow-auto w-2/4 mr-2 border-r-2 border-cardBorder z-20 shadow-md `}>
              {userList.length > 0 && (
                userList.map((user) => (
                  <div
                    key={user.username}
                    onClick={() => {
                      navigate(`/message/${user.username}/`, {
                        state: {
                          currentChatUser: user.username,
                        },
                      });
                      setCurrentChatUser(user.username);
                      setMessages([]);
                      if (open) setOpen(false);
                    }}
                    className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer border-b border-gray-300"
                  >
                    <div>
                      <img
                        className="h-12 w-12 rounded-full"
                        src={
                          user.profile_picture
                            ?  user.profile_picture
                            : defaultProfilePic
                        }
                        alt={`Profile of ${user.username}`}
                      />
                    </div>
                    <div className="ml-4 flex-1 py-4">
                      <div className="flex items-bottom justify-between">
                        <p className="text-gray-700 font-semibold">{user.username}</p>
                        <p className="text-xs text-gray-600">{dateFormat(user.timestamp)}</p>
                      </div>
                      <p className="text-gray-600 mt-1 text-sm">{user.last_message ? user.last_message : "Click to start a chat"}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className={`flex flex-col ${open ? "w-3/4" : "w-full"} ${!currentChatUser ? "max-sm:hidden" : open ? "max-sm:block" : "max-sm:block ml-[10%]"} `}>
              {currentChatUser && (
                <div className="flex items-center justify-between bg-white p-4 border-b border-gray-300">
                  <div className="flex items-center space-x-2">
                    {currentChatUser && (
                      <>
                        <div className="hidden max-sm:block">
                          <ArrowLeft className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => { navigate("/message"); setCurrentChatUser(null); setMessages([]) }} />
                        </div>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png`}
                          alt={`Profile of ${currentChatUser}`}
                        />
                      </>
                    )}
                    {currentChatUser && <span className="font-semibold text-lg">{currentChatUser}</span>}
                  </div>
                  <span className="text-xs text-gray-600">{/* Add online status or last seen time here */}</span>
                </div>
              )}
              <div className="flex-1 overflow-auto bg-gray-100 p-4 scroll-bar" id="chatContainer">
                {!currentChatUser && (
                  <p className="text-center text-gray-600">Please Select any User to message</p>
                )}
                {messages.length > 0 && (
                  <div className="text-center mt-4">
                    <Button onClick={handleLoadMore} type="secondary" text="Load More" />
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2  flex w-full  ${msg?.sender?.username == currentChatUser ? "justify-start" : "justify-end"
                    } `}>
                    <div
                      className={`rounded-md p-2 break-words ${
                        msg?.sender?.username == currentChatUser ? "bg-gray-300 w-2/5 text-left " : "bg-blue-500 w-2/5 text-white text-right "
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-xs text-gray-600">
                        {msg?.sender?.username} - {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {currentChatUser && (
                <div className="p-4 bg-white border-t border-gray-300">
                  <>
                    <TextArea formik={formik} name="message" title="Enter a message" rows={4} cols={10} />
                    <div className="mt-2">
                      <Button onClick={formik.handleSubmit} type={"primary"} text={"Send"} width={40} />
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
