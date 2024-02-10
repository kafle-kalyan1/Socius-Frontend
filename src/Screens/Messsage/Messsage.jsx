import React, { useContext, useEffect, useState } from "react";
import TextArea from "/src/components/Input/TextArea";
import { useFormik } from "formik";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import axios from "axios";
import Cookies from "js-cookie";
import { dateFormat, defaultProfilePic } from "../../Library/Others/Others";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import APICall from "../../Library/API/APICall";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (state?.currentChatUser) setCurrentChatUser(state?.currentChatUser);
    else if (username) setCurrentChatUser(username);
  }, [state, username]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var a = await APICall("/api/chat/getUserList/", "get");
    setUserList(a.data);
    setUser(a.user);
  };

  useEffect(() => {
    if (currentChatUser && user) {
      if (!socket) {
        const newSocket = new W3CWebSocket(
          `ws://localhost:8000/chat/${user}/${currentChatUser}/`
        );
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
            var index = userList.findIndex(
              (user) => user.username === currentChatUser
            );
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
    if (currentChatUser) {
      fetchMessages();
    }
  }, [currentChatUser, page]);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await APICall(
        `/api/chat/getMessages/?username=${currentChatUser}&page=${page}`,
        "GET"
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        const reversedMessages = response.data.reverse();
        setMessages((prevMessages) => [...reversedMessages, ...prevMessages]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
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

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div
      className={`block overflow-auto scroll-bar w-full h-screen font-primary_font justify-center items-center max-lg:w-full m-auto max-sm:ml-0 max-sm:w-full max-lg:h-[100%]`}
    >
      <div className="max-md:w-full max-sm:w-full">
        <div className={`flex h-screen`}>
          <div
            className={` bg-cardBg dark:bg-darkcardBg gap-2 flex flex-col overflow-auto w-2/5 border-r-2 border-cardBorder z-20 shadow-md `}
          >
            {userList.length > 0 &&
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
                      <p className="text-xs text-text4 dark:text-text3">
                        {dateFormat(user.timestamp)}
                      </p>
                    </div>
                    <p className="text-text4 dark:text-text3 mt-1 text-sm">
                      {user.last_message
                        ? user.last_message
                        : "Click to start a chat"}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div
            className={`flex flex-col ${open ? "w-3/4" : "w-full"} ${
              !currentChatUser
                ? "max-sm:hidden"
                : open
                ? "max-sm:block"
                : "max-sm:block ml-[10%]"
            } `}
          >
            {currentChatUser && (
              <div className="flex items-center justify-between bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 p-4 border-b border-gray-300">
                <div className="flex items-center space-x-2">
                  {currentChatUser && (
                    <>
                      <div className="hidden max-sm:block">
                        <ArrowLeft
                          className="h-6 w-6 text-text1 dark:text-text2 cursor-pointer"
                          onClick={() => {
                            navigate("/message");
                            setCurrentChatUser(null);
                            setMessages([]);
                          }}
                        />
                      </div>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.profile_picture
                          ? user.profile_picture
                          : defaultProfilePic}
                        alt={`Profile of ${currentChatUser}`}
                      />
                    </>
                  )}
                  {currentChatUser && (
                    <span className="font-semibold text-lg">
                      {currentChatUser}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600">
                  {/* Add online status or last seen time here */}
                </span>
              </div>
            )}
            <div
              className="flex-1 overflow-auto bg-cardBg  dark:bg-darkcardBg p-4 scroll-bar"
              id="chatContainer"
            >
              <InfiniteScroll
                dataLength={messages.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="chatContainer"
              >
                {!currentChatUser && (
                  <p className="text-center text-text1 dark:text-text2">
                    Please Select any User to message
                  </p>
                )}
                {messages.reverse().map(
                  (
                    msg,
                    index // Reverse the order of the messages
                  ) => (
                    <div
                      key={index}
                      className={`mb-2 flex w-full gap-4 ${
                        msg?.sender?.username == currentChatUser
                          ? "justify-start"
                          : "justify-end"
                      } `}
                    >
                      {msg?.sender?.username == currentChatUser ? (
                        <img
                          src={
                            msg.sender.userprofile.profile_picture
                              ? msg.sender.userprofile.profile_picture
                              : defaultProfilePic
                          }
                          alt=""
                          className=" block h-6 w-6 sm:h-12 sm:w-12 rounded-full"
                        />
                      ) : null}
                      <div
                        className={`relative float-right mx-3 inline-block rounded-md ${
                          msg?.sender?.username == currentChatUser
                            ? "  bg-cyan_text"
                            : " bg-blue_text"
                        }  py-3 px-4 text-white`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      {msg?.sender?.username != currentChatUser ? (
                        <img
                          src={
                            msg.sender.userprofile.profile_picture
                              ? msg.sender.userprofile.profile_picture
                              : defaultProfilePic
                          }
                          alt=""
                          className=" inline-block h-6 w-6 sm:h-12 sm:w-12 rounded-full"
                        />
                      ) : null}
                    </div>
                  )
                )}
              </InfiniteScroll>
            </div>
            {currentChatUser && (
              <div className="p-4 bg-cardBg dark:bg-darkcardBg border-t border-gray-300">
                <>
                  <TextArea
                    formik={formik}
                    name="message"
                    title="Enter a message"
                    rows={1}
                    cols={6}
                  />
                  <div className="mt-2">
                    <Button
                      onClick={formik.handleSubmit}
                      type={"primary"}
                      text={"Send"}
                      width={40}
                    />
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
