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
    <div className={`flex ml-0 `}>
      <div className={` block w-3/4 h-screen font-primary_font overflow-auto scroll-bar justify-center items-center max-lg:w-full m-auto ml-[5%] max-sm:ml-0 max-sm:w-full `}>
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

      <div className={`block right-0 w-1/4 max-lg:hidden h-screen bg-slate-400 `}></div>
    </div>
  );
};

export default Home;
