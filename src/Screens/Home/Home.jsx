import React, { useState, useEffect, useContext } from "react";
import Sidebar from "/src/components/Sidebar/Sidebar";
import Post from "/src/components/Post/Post";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import Button from "/src/components/Button/Button.jsx";
import { showBigPopup } from "/src/components/BigPopup/BigPopup";
import CreatePost from "/src/components/CreatePost/CreatePost";
import { ProfileContext } from "/src/context/ProfileContext/ProfileContext";

const Home = () => {
  const { isMobile } = useContext(MenuContext);
  const { profile } = useContext(ProfileContext);

  function createPost2() {
    showBigPopup({
      id: "createPost",
      children: <CreatePost profile={profile} />,
      ask: true,
    });
  }
  const post = {
    profileImage:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1",
    username: "John_doe",
    timestamp: "22h ago",
    fullname: "John Doe",
    postText:
      "Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship.Processors experiment with paralysis!  Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship. Processors experiment with paralysis! Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship. Processors experiment with paralysis! Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship. Processors experiment with paralysis!",
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1",
      "https://media.istockphoto.com/id/1181218567/photo/close-up-top-view-of-young-people-putting-their-hands-together-indian-friends-with-stack-of.jpg?s=2048x2048&w=is&k=20&c=p_rtPy46oLQZRKvYfRpS2cwgMZhFIex0MGwq4ihWizQ=",
    ],
    likes: 12,
    comments: 8,
    is_verified: true,
    is_suspicious: false,
    shares: 4,
  };
  return (
    <div className={`flex ${!isMobile ? " ml-72" : "ml-0"} `}>
    <div className={` flex w-3/5 font-primary_font justify-center max-lg:w-full max-lg:m-2 m-auto max-sm:w-full`}>
      <div className=" max-md:w-full max-sm:w-full">
        <Button
          type="primary"
          text="Create Post"
          onClick={createPost2}
          width={"4px"}
        />
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
      </div>
    </div>
      
    <div className={`flex w-2/5 max-lg:hidden bg-slate-400 `}>
    </div>
  </div>
  );
};

export default Home;
