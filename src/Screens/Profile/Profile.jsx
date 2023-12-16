import OurProfile from "./OurProfile";
import ValidateUser from "/src/Library/Others/Others";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { Skeleton } from "antd";
import Post from "/src/components/Post/Post";
import FriendRecommendation from "../../components/FriendRecommendation/FriendRecommendation";
import Button from "../../components/Button/Button";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OurProfileSkeleton from "./OurProfileSkeleton";
import PostSkeleton from "../../components/Post/PostSkeleton";


const Profile = () => {
  const {open, setOpen} = useContext(MenuContext);  
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  ValidateUser();


  // useEffect to get user data from backend
  useEffect(() => {
    let accessToken = Cookies.get("access");
    console.log(accessToken)
    axios.get("api/auth/user/",{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => 
    {
      console.log(res.data)
      setUserData(res.data.data);
      setLoading(false);
        }
    ).catch((err) => {
      setLoading(false);
    })
  
  }, [])

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
    <div className={` block duration-300 ${open ? "w-1/5":" w-1/12"}`}>
        <Sidebar className=""/>
    </div>
        <div className={`block duration-300 ${open ? "w-4/5":" w-10/12"} ml-10 mt-5`}>
        {loading ? (
          <OurProfileSkeleton />
        ) : (
          <>
        <OurProfile data={userData}/>
        </>
        )}

        <div className="flex">
        <div className="block w-4/6 ml-10 mt-2">
        <h1 className=" text-3xl ml-10">Posts</h1>
        <Post {...post} />
        <Post {...post} />
        </div>
        <div className="block w-2/6 mr-5">
        <h1>Friends </h1>
          <FriendRecommendation />
        </div>
        </div>
        </div>


    </div>
  );
};

export default Profile;
