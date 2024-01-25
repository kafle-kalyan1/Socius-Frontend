import React, { useContext, useEffect, useState } from "react";
import { Segmented } from "antd";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import FriendRecommendation from "../../components/FriendRecommendation/FriendRecommendation";
import axios from "axios";
import Cookies from "js-cookie";
import { defaultProfilePic } from "../../Library/Others/Others";

const ExploreProfile = () => {
  const { open, setOpen } = useContext(MenuContext);
  const [userList, setUserList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [recommendedList, setRecommendedList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [activeSection, setActiveSection] = useState("requests");

  useEffect(() => {
    let access = Cookies.get("access");
    axios
      .get("/api/user/friends/", {
        headers: {
          Authorization: `Bearer ${access}`
        }
      })
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFriendList(userList.filter((user) => user.is_friend));
    setRecommendedList(userList.filter((user) => !user.is_friend && !user.is_requested && !user.is_requested_by_me));
    setRequestList(userList.filter((user) => !user.is_friend && user.is_requested && !user.is_requested_by_me));
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
    }
  };

  return (
    <div className="flex h-screen">
      <div className={`block duration-300 z-20 ${open ? "w-1/5" : "w-1/12"}`}>
        <Sidebar />
      </div>
      <div
        className={`block duration-300 ${
          open ? "w-4/5" : "w-10/12"
        } ml-10 mt-5`}
      >
        <span className="text-3xl">Explore Profiles</span>
      <div className="w-full gap-2 flex align-center justify-center z-10"> <Segmented className="align-center" 
          options={[
            { label: "Recommended Friends", value: "recommended", },
            { label: "Friends", value: "friends" },
            { label: "Friend Requests", value: "requests" }
          ]}
          value={activeSection}
          onChange={handleSectionChange}
          size="large"         
        />
        </div>
       
        <div className={`grid ${open ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} mt-4 gap-4`}>
          {getFriendListBySection().map((user, index) => (
            <FriendRecommendation
              key={index}
              profile_pic={user.profile_pic ? "data:image/png;base64," + user.profile_pic : defaultProfilePic}
              fullname={user.fullname}
              username={user.username}
              isfriend={user.is_friend}
              isrequested={user.is_requested}
              isrequestedByMe={user.is_requested_by_me}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreProfile;