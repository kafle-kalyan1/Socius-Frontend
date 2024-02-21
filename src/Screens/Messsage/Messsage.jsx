import React, { useContext, useEffect, useState } from "react";
import TextArea from "/src/components/Input/TextArea";
import { useFormik } from "formik";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import axios from "axios";
import Cookies from "js-cookie";
import { DecryptString, EncryptString, dateFormat, defaultProfilePic, socketLink } from "../../Library/Others/Others";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, SendIcon } from "lucide-react";
import APICall from "../../Library/API/APICall";
import InfiniteScroll from "react-infinite-scroll-component";
import FriendList from "./FriendList";
import ThinkingSVG from "./Utils/ThinkingSVG";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import ImageSrc from "./Utils/Texting.gif";


const Message = () => {
  const { open, setOpen } = useContext(MenuContext);
  const [userList, setUserList] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [currentChatUserDetails, setCurrentChatUserDetails] = useState({});
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  const { username } = useParams();
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const {isMobile} = useContext(MenuContext);
  const {profile} = useContext(ProfileContext)
  const [isFriend, setIsFriend] = useState(true)

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
          `${socketLink}/chat/${user}/${currentChatUser}/`
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
                userprofile :{
                  profile_picture: new_message.profile_picture
                }
              },
            },
          ]);

          setUserList((userList) => {
            var index = userList.findIndex(
              (user) => user.username === currentChatUser
            );
            userList[index].last_message = (new_message.message);
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
   setPage(1);
  }, [currentChatUser]);

  useEffect(() => {
    if (currentChatUser) {
      fetchMessages();
    }
    else{
      setMessages([]);
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
        const reversedMessages = response.data;
        setMessages((prevMessages) => [...reversedMessages, ...prevMessages]);
        setPage((prevPage) => prevPage + 1);
        setCurrentChatUserDetails(response.user);
        setIsFriend(response.is_friend)
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
            message: EncryptString(values.message),
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
      className={`block overflow-auto scroll-bar w-full h-screen font-primary_font justify-center items-center max-lg:w-full m-auto ml-0 max-sm:w-full max-lg:h-[100%]`}
    >
      <div className="max-md:w-full max-sm:w-full">
        <div className={`flex h-screen`}>
          <div className={`flex h-full w-fit xl:w-[30%] md:w-[40%] ${
              currentChatUser
                ? "max-sm:hidden"
                : "max-sm:block"
            }
             `}>
          <FriendList
            userList={userList}
            open={open}
            setOpen={setOpen}
            setCurrentChatUser={setCurrentChatUser}
            setMessages={setMessages}
            currentChatUserDetails={currentChatUserDetails}
          />
          </div>
          <div
            className={`flex flex-col w-full max-md:h-[90%] max-sm:w-full ${
              !currentChatUser
                ? "max-sm:hidden"
                : "max-sm:block"
            } `}
          >
            {currentChatUser && (
              <div className="flex items-center justify-between bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 p-4 border-b border-gray-300">
                <div className="flex items-center w-full space-x-2">
                  {currentChatUser && (
                    <span className="flex w-full">
                        <ArrowLeft
                          className="h-6 w-6 text-text1 dark:text-text2 cursor-pointer"
                          onClick={() => {
                            navigate("/message");
                            setCurrentChatUser(null);
                            setMessages([]);
                            setCurrentChatUserDetails({});
                          }}
                        />
                      <span className="flex gap-4 justify-center items-center w-full m-auto justify-items-center align-middle text-center font-semibold"
                      >
                     <img
                        className="h-8 w-8 rounded-full cursor-pointer"
                        src={currentChatUserDetails?.profile_picture
                          ? currentChatUserDetails.profile_picture
                          : defaultProfilePic}
                        alt={`Profile of ${currentChatUser}`}
                        onClick={() => {
                        navigate(`/u/${currentChatUser}`);
                      }}
                      />
                      <span className="block  cursor-pointer" onClick={() => {
                        navigate(`/u/${currentChatUser}`);
                      }}>
                      <p>{currentChatUserDetails?.fullname}</p>
                      <p className="text-sm">{currentChatUser}</p>
                      </span>
                    </span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600">
                </span>
              </div>
            )}
            <div
              className="flex-1 overflow-auto bg-cardBg max-md:h-[90%] dark:bg-darkcardBg p-4 scroll-bar"
              id="chatContainer"
            >
                {!currentChatUser && (
                  <div className="block  w-full h-full place-content-center text-text1 dark:text-text2">
                   
                    <img
                      src={ImageSrc}
                      alt="No messages"
                      className="w-auto  m-auto "
                    />
                     <span className="text-text1 dark:text-text2 flex justify-center items-center text-2xl font-primary_font mx-4 tracking-normal">
                    Please Select any User to message
                    </span>
                  </div>
                )}
              <InfiniteScroll
                dataLength={messages.length}
                next={handleLoadMore}
                hasMore={hasMore}
                scrollableTarget="chatContainer"
              >
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
                        <p className="text-sm">{DecryptString(msg.message)}</p>
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
              <div className=" flex justify-between gap-2 py-0 p-4 bg-cardBg dark:bg-darkcardBg border-t border-gray-300 max-md:fixed max-md:bottom-14">
                <>
                  <TextArea
                    formik={formik}
                    name="message"
                    title="Enter a message"
                    disabled={!isFriend}
                    rows={1}
                    cols={100}
                    showTitle={false}
                  />
                  <div className="mt-2">
                    <Button
                      icon={<SendIcon size={20} />}
                      onClick={formik.handleSubmit}
                      type={"primary"}
                      disabled={!isFriend}
                      text={isMobile ? "" : "Send"}
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
