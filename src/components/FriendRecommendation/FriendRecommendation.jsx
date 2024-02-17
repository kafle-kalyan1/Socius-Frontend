import React, { useContext, useState } from 'react';
import Button from '../Button/Button';
import { showModal } from '../Alert/Alert';
import { firstLetterCapital } from '../../Library/Others/Others';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import APICall from '../../Library/API/APICall';
import { WebSocketContext } from '../../Socket/SocketContext';
import { w3cwebsocket } from 'websocket';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';

const UNFRIEND_MESSAGE = "Are you sure you want to unfriend";
const CANCEL_REQUEST_MESSAGE = "Are you sure you want to cancel the request to";

const FriendRecommendation = ({ profile_pic, fullname, username, isfriend = false, isrequested = false, isrequestedByMe = false,load_data }) => {
  const [isRequested, setIsRequested] = useState(isrequested);
  const [isFriend, setIsFriend] = useState(isfriend);
  const [isRequestedByMe, setIsRequestedByMe] = useState(isrequestedByMe);
  const navigate = useNavigate();
  const {profile} = useContext(ProfileContext);



  const sendRequestTo = async (username) => {

      let response = await APICall("/api/user/sendFriendRequest/","POST",{"friend": username})
      if(response.status == 200){

      toast.success(`Request sent to ${username}`);

      const newSocket = new w3cwebsocket(`ws://localhost:8000/notifications/${profile.username}/`);
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

      let response = await APICall("/api/user/removeFriend/","POST",{"friend": username})
      if(response.status == 200){
      toast.success(`Unfriended ${username}`);
      load_data()
      }
  };

  const acceptRequest = async (username) => {

      let response = await APICall("/api/user/acceptFriendRequest/","POST",{"friend": username})
      if(response.status == 200){
      toast.success(`Accepted request from ${username}`);
      const newSocket = new w3cwebsocket(`ws://localhost:8000/notifications/${profile.username}/`);
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
    <div className="bg-cardBg dark:bg-indigo_bg  border-cardBorder dark:border-darkcardBorder text-text1 dark:text-text2 rounded-lg shadow-md p-4 transition-colors duration-200 " key={username}>
      <img onClick={()=>
      navigate('/u/'+username)
    } className="w-24 h-24 rounded-full cursor-pointer mx-auto mb-4" src={profile_pic} alt={fullname} />
      <div onClick={()=>
      navigate('/u/'+username)
    } className="text-center cursor-pointer">
        <h4 className="text-xl font-semibold">{firstLetterCapital(fullname)}</h4>
        <p className="text-text1 dark:text-text2">@{username}</p>
      </div>
      <div className="flex justify-center mt-4">
        {actionButton}
      </div>
    </div>
  );
};

export default FriendRecommendation;