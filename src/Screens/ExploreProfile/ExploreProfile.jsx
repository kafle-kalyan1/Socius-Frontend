import React, { useContext, useEffect, useState } from "react";
import { Segmented } from "antd";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import FriendRecommendation from "../../components/FriendRecommendation/FriendRecommendation";
import axios from "axios";
import Cookies from "js-cookie";
import { defaultProfilePic } from "../../Library/Others/Others";
import APICall from "../../Library/API/APICall";
import CustomSegmentedControl from '../../components/Tabs/Tabs';
import { useLocation } from "react-router-dom";

const ExploreProfile = () => {
  const [userList, setUserList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [recommendedList, setRecommendedList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [sentRequestList, setSentRequestList] = useState([]); 
  const [activeSection, setActiveSection] = useState("requests");

  const location = useLocation();

  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
    load_data();
  }, []);

  async function load_data(){
    let response = await APICall("/api/user/friends/","GET",{})
    if(response.status == 200){
      setUserList(response.data);

    }
  } 

  useEffect(() => {
    setFriendList(userList.filter((user) => user.is_friend));
    setRecommendedList(userList.filter((user) => !user.is_friend && !user.is_requested && !user.is_requested_by_me));
    setRequestList(userList.filter((user) => !user.is_friend && user.is_requested && !user.is_requested_by_me));
    setSentRequestList(userList.filter((user) => !user.is_friend && user.is_requested && user.is_requested_by_me)); 

  }, [userList]);

  const handleSectionChange = (value) => {
    setActiveSection(value);
  };

  const getFriendListBySection = () => {
    if (activeSection == "recommended") {
      return recommendedList;
    } else if (activeSection == "friends") {
      return friendList;
    } else if (activeSection == "requests") {
      return requestList;
    } else if (activeSection == "sentRequests") { 
      return sentRequestList; 
    }
  };

  return (
    <div className="flex mt-8">
      <div
        className={`block w-5/6 h-screen font-primary_font text-text1 dark:text-text2 justify-center items-center max-lg:w-full m-auto ml-[5%] max-sm:ml-5 max-sm:w-full`}
      >
        <span className="w-full flex justify-center text-3xl text-center ">Explore Profiles</span>
      <div className="w-full gap-2 flex align-center justify-center z-10"> 
      <CustomSegmentedControl
  options={[
    { label: "Recommended Friends", value: "recommended" },
    { label: "Friends", value: "friends" },
    { label: "Friend Requests", value: "requests" },
    { label: "Sent Requests", value: "sentRequests" }

  ]}
  value={activeSection}
  onChange={handleSectionChange}
/>

        </div>
       
        <div className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-4 gap-4`}>
        {getFriendListBySection().map((user, index) => (
  <FriendRecommendation
    key={`${index}-${activeSection}`}
    profile_pic={user.profile_pic ? user.profile_pic : defaultProfilePic}
    fullname={user.fullname}
    username={user.username}
    date_of_birth = {user.date_of_birth}
            bio= {user.bio}
            gender= {user.gender}
            location= {user.location}
            number_of_friends= {user.number_of_friends}
    isfriend={user.is_friend}
    isrequested={user.is_requested}
    isrequestedByMe={user.is_requested_by_me}
    load_data={load_data}
  />
))}
        </div>
      </div>
    </div>
  );
};

export default ExploreProfile;