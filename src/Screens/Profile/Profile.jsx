import OurProfile from "./OurProfile";
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
import APICall from "../../Library/API/APICall";
import toast from "react-hot-toast";


const Profile = () => {
  const {isMobile, setOpen} = useContext(MenuContext);  
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);



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

  
    getOwnPosts()
  
  }, [])
  
  async function getOwnPosts (){
    try {
      const response = await APICall("/api/posts/getOwnPost/", "GET", {});
      console.log(response);
      setPosts(response); 
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }
  
  return (
    <div className={`flex ${!isMobile ? " ml-72" : "ml-0"} `}>
      <div className={` fixed lg:ml-[14%] overflow-x-scroll w-4/6 h-screen font-primary_font justify-center items-center max-lg:w-full max-lg:m-0 m-auto max-sm:w-full`}>
        <div className=" max-md:w-full  max-sm:w-full">
        {loading ? (
          <OurProfileSkeleton />
        ) : (
          <>
        <OurProfile data={userData}/>
      
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
              shares={0} 
              afterDelete={getOwnPosts}
            />
          ))}
          </>
        )}
        
        </div>
      </div>

      <div className={`fixed right-0 w-1/5 max-lg:hidden h-screen bg-slate-400 `}></div>
    </div>
  );
};

export default Profile;
