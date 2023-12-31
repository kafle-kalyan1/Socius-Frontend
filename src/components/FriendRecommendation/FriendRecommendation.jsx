import React, { useState } from 'react';
import Button from '../Button/Button';
import { showModal } from '../Alert/Alert';
import { firstLetterCapital } from '../../Library/Others/Others';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const UNFRIEND_MESSAGE = "Are you sure you want to unfriend";
const CANCEL_REQUEST_MESSAGE = "Are you sure you want to cancel the request to";

const FriendRecommendation = ({ profile_pic, fullname, username, isfriend = false, isrequested = false, isrequestedByMe = false }) => {
  const [isRequested, setIsRequested] = useState(isrequested);
  const [isFriend, setIsFriend] = useState(isfriend);
  const [isRequestedByMe, setIsRequestedByMe] = useState(isrequestedByMe);
  const navigate = useNavigate();
  let access = Cookies.get("access");
  console.log(username, isfriend , isrequested , isrequestedByMe )

  const sendRequestTo = (e, username) => {
    e.stopPropagation();
    axios.post(`/api/user/sendFriendRequest/`, {
      friend: username
    }, {
      headers: {
        Authorization: `Bearer ${access}`
      }
    }).then((res) => {
      console.log(res.data);
      setIsRequested(true);
      setIsRequestedByMe(true);
      toast.success(`Request sent to ${username}`);
    }).catch((err) => {
      console.log(err);
    });
  };

  const cancelRequest = (e, username) => {
    e.stopPropagation();
    axios.post(`/api/user/cancelFriendRequest/`, {
      friend: username
    }, {
      headers: { Authorization: `Bearer ${access}` }
    }).then((res) => {
      setIsRequested(false);
      setIsRequestedByMe(false);
      toast.success(`Cancelled request to ${username}`);
    }).catch((err) => {
      console.log(err);
    });
  };

  const unfriend = (e, username) => {
    e.stopPropagation();
    axios.post(`/api/user/unfriend/`, {
      friend: username
    }, {
      headers: { Authorization: `Bearer ${access}` }
    }).then((res) => {
      setIsFriend(false);
      toast.success(`Unfriended ${username}`);
    }).catch((err) => {
      console.log(err);
    });
  };

  const acceptRequest = (e, username) => {
    e.stopPropagation();
    axios.post(`/api/user/acceptFriendRequest/`, {
      friend: username
    }, {
      headers: { Authorization: `Bearer ${access}` }
    }).then((res) => {
      setIsFriend(true);
      setIsRequested(false);
      toast.success(`Accepted request from ${username}`);
    }).catch((err) => {
      console.log(err);
    });
  };

  const actionButton = isFriend ? (
    <Button
      text="Unfriend"
      type="danger"
      width={1 / 2}
      onClick={(e) => {
        unfriend(e, username);
      }}
    />
  ) : isRequested ? isRequestedByMe ? (
    <Button
      text="Cancel Request"
      type="txtDanger"
      width={1 / 2}
      onClick={(e) => {
        cancelRequest(e, username);
      }}
    />
  ) : (
    <Button
      text="Accept Request"
      type="primary"
      width={1 / 2}
      onClick={(e) => {
        acceptRequest(e, username);
      }}
    />
  ) : (
    <Button
      text="Add Friend"
      type="primary"
      width={1 / 2}
      onClick={(e) => {
        sendRequestTo(e, username);
      }}
    />
  );

  return (
    <div className="bg-white dark:bg-cardBg rounded-lg shadow-md p-4 transition-colors duration-200 cursor-pointer" key={username} onClick={()=> navigate(`/u/${username}`)}>
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