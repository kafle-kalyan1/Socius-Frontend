import React, { useState, useEffect, useContext } from "react";
import Sidebar from "/src/components/Sidebar/Sidebar";
import ValidateUser, {
  EncryptString,
  DecryptString,
} from "/src/Library/Others/Others";
import Post from "/src/components/Post/Post";
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import  Button  from '/src/components/Button/Button.jsx';
import { showBigPopup } from './../../components/BigPopup/BigPopup';
import CreatePost from "/src/components/CreatePost/CreatePost";

const Home = () => {
  const {open, setOpen} = useContext(MenuContext);
  ValidateUser();
  function createPost2(){
    showBigPopup({
      children:(
        <CreatePost/>
      )
    })
  }
  const post = {
    profileImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1',
    username: 'John_doe',
    timestamp: '22h ago',
    fullname: 'John Doe',
    postText: 'Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship.Processors experiment with paralysis!  Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship. Processors experiment with paralysis! Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship. Processors experiment with paralysis! Hypnosis at the parallel universe was the advice of alarm, commanded to a conscious ship. Processors experiment with paralysis!',
    images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1', 'https://media.istockphoto.com/id/1181218567/photo/close-up-top-view-of-young-people-putting-their-hands-together-indian-friends-with-stack-of.jpg?s=2048x2048&w=is&k=20&c=p_rtPy46oLQZRKvYfRpS2cwgMZhFIex0MGwq4ihWizQ='],
    likes: 12,
    comments: 8,
    is_verified: true,
    is_suspicious: false,
    shares: 4,
  };
  return (
    <div className="flex h-screen">
<div className={` block duration-300 z-20 ${open ? "w-1/5":" w-1/12"}`}>
        <Sidebar className=""/>
    </div>
          <div className={`block duration-300 ${open ? "w-4/5":" w-10/12"} ml-10 mt-5`}>
          <div className="w-3/4">
          <span className="text-3xl">Home</span>
          <Button  type="primary" text="Create Post"  onClick={createPost2} width={"4px"}/>
          </div>
      </div>
    </div>
  );
};

export default Home;
