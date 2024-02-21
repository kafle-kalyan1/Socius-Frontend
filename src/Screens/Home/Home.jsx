import React, { useState, useEffect, useContext } from "react";
import Sidebar from "/src/components/Sidebar/Sidebar";
import Post from "/src/components/Post/Post";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import Button from "/src/components/Button/Button.jsx";
import { showBigPopup } from "/src/components/BigPopup/BigPopup";
import CreatePost from "/src/components/CreatePost/CreatePost";
import { ProfileContext } from "/src/context/ProfileContext/ProfileContext";
import APICall from "../../Library/API/APICall";
import toast from "react-hot-toast";
import { Select } from "antd";
import "/src/index.css";
import NotificationPannel from "../../components/Notification/NotificationPannel/NotificationPannel";
import {defaultProfilePic} from './../../Library/Others/Others';
import { hideBigPopup } from "../../components/BigPopup/BigPopup";

const Home = () => {
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("default");

  const createPost2 = () => {
    showBigPopup({
      id: "createPost",
      children: <CreatePost profile={profile} />,
      ask: true,
      onClose: ()=>hideBigPopup('createPost',true)
  });
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await APICall("/api/posts/getPosts/?sort="+sort, "GET", {});
        setPosts(response); 
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    getPosts();
  }, [sort]);

  const filters = [
    { value: "default", label: "Default" },
    { value: "new", label: "New" },
    { value: "friend", label: "Friend's Post" },
  ]

  return (
<div className={`flex ml-0 w-full overflow-auto scrollbar  bg-cardBg2 dark:bg-darkcardBg2 `}>
      <div className={`block p-10 max-sm:p-1 w-[60%]  h-screen font-primary_font justify-center items-center max-lg:w-full m-auto max-sm:m-0 max-sm:w-full `}>
        <div className=" max-md:w-full  max-sm:w-full">
        <div className="w-full p-4 ">
        <div className="w-[100%] md:w-[95%] h-6 flex items-center justify-center gap-x-3">
          <div className="w-[10%]">
              <img
                src={profile?.profile_picture ? profile.profile_picture : defaultProfilePic}
                alt="other-profile-pic"
                className="w-[2rem] h-[2rem] rounded-full"
              />
          </div>
          <div
            className="w-[100%] flex items-center justify-start px-4 border-solid border-2 border-gray-200 bg-gray-50 rounded-3xl py-2 cursor-pointer"
            onClick={createPost2}
          >
            <span className="font-poppins text-xs select-none">
              What&apos;s on your mind? <span className=" max-[400px]:hidden">
              {profile?.username}
              </span>
            </span>
          </div>
          <Select
          showSearch
          placeholder="Search"
          className="block max-sm:hidden"
          defaultValue={sort}
          optionFilterProp="children"
          options={filters}
          onChange={(value) => setSort(value)}
          />
        </div>
      </div>

          {posts && posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              profileImage={post.user_profile.profile_picture}
              username={post.user.username}
              timestamp={post.timestamp}
              fullname={post.user_profile.fullname}
              postText={post.text_content}
              images={post.images}
              likes={post.likes_count}
              user_has_liked={post.user_has_liked}
              comments={post.comments_count}
              is_verified={false} 
              is_suspicious={false} 
              shares={0}
            />
          ))}
          
        

        </div>
      </div>

      <div className={`block w-[33%] max-xl:hidden h-full overflow-auto sticky right-2 scrollbar  top-0`}>
    <NotificationPannel/>
  </div>
    </div>
  );
};

export default Home;
