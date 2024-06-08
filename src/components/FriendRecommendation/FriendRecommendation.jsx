import React, { useContext, useState } from 'react';
import Button from '../Button/Button';
import { showModal } from '../Alert/Alert';
import { defaultProfilePic, firstLetterCapital, socketLink } from '../../Library/Others/Others';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import APICall from '../../Library/API/APICall';
import { WebSocketContext } from '../../Socket/SocketContext';
import { w3cwebsocket } from 'websocket';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';
import { FaCheckCircle, FaExclamationCircle, FaFemale, FaLocationArrow, FaMale, FaUserFriends } from 'react-icons/fa';
import { Tooltip } from 'antd';
import { GoLocation } from "react-icons/go";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";

const UNFRIEND_MESSAGE = "Are you sure you want to unfriend";
const CANCEL_REQUEST_MESSAGE = "Are you sure you want to cancel the request to";

const FriendRecommendation = ({ profile_pic, fullname, username, isfriend = false, isrequested = false, isrequestedByMe = false,load_data, verified=true,bio, joined_date, location, friends,gender,number_of_friends }) => {
  const [isRequested, setIsRequested] = useState(isrequested);
  const [isFriend, setIsFriend] = useState(isfriend);
  const [isRequestedByMe, setIsRequestedByMe] = useState(isrequestedByMe);
  const navigate = useNavigate();
  const {profile} = useContext(ProfileContext);



  const sendRequestTo = async (username) => {

      let response = await APICall("/api/user/sendFriendRequest/","POST",{"friend": username})
      if(response.status == 200){

      toast.success(`Request sent to ${username}`);

      const newSocket = new w3cwebsocket(`${socketLink}/notifications/${profile.username}/`);
    newSocket.onopen = () => {
      newSocket.send(
        JSON.stringify({
          "type":"friend_request",
          "data":{
            "sender_username":profile.username,
            "receiver_username": username
          },
        })
      );
    };
      load_data()
      }

  };

  const cancelRequest = async (username) => {
      let response = await APICall("/api/user/cancelFriendRequest/","POST",{"friend": username})
      if(response.status == 200){
      toast.success(`Cancelled request to ${username}`);
      load_data()
      }
  };

  const unfriend = async (username) => {
    showModal({
      title: "Unfriend",
      type : "error",
      message: `${UNFRIEND_MESSAGE} ${username}?`,
      buttons: [

        {
          title: "Unfriend",
          onclick: () => {
            APICall("/api/user/removeFriend/","POST",{"friend": username}).then(response => {
            if(response.status == 200){
            toast.success(`Unfriended ${username}`);
            load_data()
            }
          }).catch(error => {
            console.log(error)
          })
        } 
        },
        {
          text: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const acceptRequest = async (username) => {

      let response = await APICall("/api/user/acceptFriendRequest/","POST",{"friend": username})
      if(response.status == 200){
      toast.success(`Accepted request from ${username}`);
      const newSocket = new w3cwebsocket(`${socketLink}/notifications/${profile.username}/`);
      newSocket.onopen = () => {
        newSocket.send(
          JSON.stringify({
            "type":"accept_request",
            "data":{
              "sender_username":profile.username,
              "receiver_username": username
            },
          })
        );
      };
      load_data()
      }
  };

  const actionButton = isFriend ? (
    <Button
      text="Unfriend"
      type="danger"
      width={1 / 2}
      onClick={() => {   
        unfriend(username);
      }}
    />
  ) : isRequested ? isRequestedByMe ? (
    <Button
      text="Cancel Request"
      type="txtDanger"
      width={1 / 2}
      onClick={() => {
        cancelRequest(username);
      }}
    />
  ) : (
    <Button
      text="Accept Request"
      type="primary"
      width={1 / 2}
      onClick={() => {
        acceptRequest(username);
      }}
    />
  ) : (
    <Button
      text="Add Friend"
      type="primary"
      width={1 / 2}
      onClick={() => {
        sendRequestTo(username);
      }}
    />
  );

  return (
    <>
    {/*
  // v0 by Vercel.
  // https://v0.dev/t/qKtlLMRcy6a
  */}
    <div
      className="rounded-lg border bg-cardBg dark:bg-darkcardBg w-full max-w-2xl mx-auto shadow-lg dark:bg-darkcard2"
      data-v0-t="card"
    >
      <div className="p-6 grid gap-2">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profile_pic || defaultProfilePic} 
              width={48}
              height={48}
              alt="User avatar"
              className="rounded-full shadow-lg"
              style={{ aspectRatio: "48/48", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 right-0 bg-white dark:bg-black rounded-full p-1">
            <Tooltip title={verified ? "Verified" : "Not Verified"}
             placement="top">
            {
              !verified ? 
              <FaExclamationCircle className="text-red_text" />
              :<FaCheckCircle className="text-main_text" />
            }
            </Tooltip>
            </div>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold leading-none text-black">
              {firstLetterCapital(fullname)}
            </h3>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-sm">
              @{username}
            </button>
          </div>
        </div>
        <div className="grid gap-0.5">
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {bio}
          </p>
          <div className="flex items-center space-x-2 text-sm">
            {
              gender == 'male' ? <FaMale className="text-blue-500" /> : <FaFemale className="text-pink-500" />
            }
            <span>{firstLetterCapital(gender)}</span>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          {actionButton}
        </div>
        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <LiaUserFriendsSolid className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {number_of_friends} Friends
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <GoLocation className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {location}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <SlCalender className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Joined: {joined_date}
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default FriendRecommendation;