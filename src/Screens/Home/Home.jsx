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

const Home = () => {
  const { isMobile } = useContext(MenuContext);
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);

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
        const response = await APICall("/api/posts/getPosts/", "GET", {});
        console.log(response);
        setPosts(response); 
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    getPosts();
  }, []);

  return (
    <div className={`flex ${!isMobile ? " ml-72" : "ml-0"} `}>
      <div className={` fixed lg:ml-[14%] overflow-x-scroll w-4/6 h-screen font-primary_font justify-center items-center max-lg:w-full max-lg:m-0 m-auto max-sm:w-full`}>
        <div className=" max-md:w-full  max-sm:w-full">
          <Button type="primary" text="Create Post" onClick={createPost2} width={"4px"} />
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
              is_verified={false} // You may need to fetch this information separately
              is_suspicious={false} // You may need to fetch this information separately
              shares={0} // You may need to fetch shares separately
            />
          ))}
          
        

        </div>
      </div>

      <div className={`fixed right-0 w-1/5 max-lg:hidden h-screen bg-slate-400 `}></div>
    </div>
  );
};

export default Home;
