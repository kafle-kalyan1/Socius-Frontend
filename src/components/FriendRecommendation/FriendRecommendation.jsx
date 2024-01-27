import React, { useState } from 'react';
import Button from '../Button/Button';
import { showModal } from '../Alert/Alert';
import { firstLetterCapital } from '../../Library/Others/Others';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import APICall from '../../Library/API/APICall';

const UNFRIEND_MESSAGE = "Are you sure you want to unfriend";
const CANCEL_REQUEST_MESSAGE = "Are you sure you want to cancel the request to";

const FriendRecommendation = ({ profile_pic, fullname, username, isfriend = false, isrequested = false, isrequestedByMe = false,load_data }) => {
  const [isRequested, setIsRequested] = useState(isrequested);
  const [isFriend, setIsFriend] = useState(isfriend);
  const [isRequestedByMe, setIsRequestedByMe] = useState(isrequestedByMe);
  const navigate = useNavigate();

  const sendRequestTo = async (username) => {

      let response = await APICall("/api/user/sendFriendRequest/","POST",{"friend": username})
      
      if(response.status == 200){
      toast.success(`Request sent to ${username}`);
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
    <div className="bg-white dark:bg-cardBg rounded-lg shadow-md p-4 transition-colors duration-200 cursor-pointer" key={username}>
      <img className="w-24 h-24 rounded-full mx-auto mb-4" src={profile_pic} alt={fullname} />
      <div className="text-center">
        <h4 className="text-xl font-semibold">{firstLetterCapital(fullname)}</h4>
        <p className="text-gray-500">@{username}</p>
      </div>
      <div className="flex justify-center mt-4">
        {actionButton}
      </div>
    </div>
  );
};

export default FriendRecommendation;