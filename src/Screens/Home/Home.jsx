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

const Home = () => {
  const { isMobile } = useContext(MenuContext);
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("default");

  function createPost2() {
    showBigPopup({
      id: "createPost",
      children: <CreatePost profile={profile} />,
      ask: true,
    });
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await APICall("/api/posts/getPosts/?sort="+sort, "GET", {});
        console.log(response);
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
<div className={`flex ml-0 w-full overflow-auto scroll-bar scroll-bar bg-cardBg2 dark:bg-darkcardBg2 `}>
      <div className={`block p-10 w-auto  h-screen font-primary_font justify-center items-center max-lg:w-full m-auto max-sm:ml-0 max-sm:w-full `}>
        <div className=" max-md:w-full  max-sm:w-full">
          <Button type="primary" text="Create Post" onClick={createPost2} width={"4px"} />
          <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search"
          defaultValue={sort}
          optionFilterProp="children"
          options={filters}
          onChange={(value) => setSort(value)}
          />
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

      <div className={`block w-[33%] max-lg:hidden h-full overflow-auto sticky top-0`}>
    <NotificationPannel/>
  </div>
    </div>
  );
};

export default Home;
