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
      console.log(err);
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
    <div className={`flex mt-8`}>
      <div className={`block overflow-auto scroll-bar w-full h-max font-primary_font justify-center items-center max-lg:w-full m-auto max-sm:w-full`}>
        <div className="max-md:w-full max-sm:w-full mb-5">
        {loading ? (
          <OurProfileSkeleton />
        ) : (
          <>
        <OurProfile data={userData}/>
      <div className="flex flex-col mt-28 w-full gap-5 h-full m-auto">
          <h1 className="text-3xl font-bold text-center text-text1 dark:text-text2">My Posts</h1>
          <div className=" justify-items-center m-auto">

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
          </div>
      </div>
          </>
        )}
        
        </div>
      </div>
    </div>
  );
};

export default Profile;
