import React, { useEffect, useState } from 'react'
import Sidebar  from '/src/components/Sidebar/Sidebar';
import OurProfile from '../Profile/OurProfile';
import OtherUserProfile from './UserProfileComponent';
import APICall from '../../Library/API/APICall';
import Post  from '/src/components/Post/Post';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const username = window.location.pathname.split("/")[2];

    useEffect(() => {
        getProfile();
      }, []);
    
      const getProfile = async () => {
        if (!username) {
          return;
        }
        var res = await APICall(`/api/user/getProfile/${username}/`,'get');
        setProfile(res.data);
        setPosts(res.data.posts);
        setIsLoaded(true);
      };
    
  return (
<div className="flex h-screen">
        <div className={`block duration-300 w-full scroll-bar`}>
     
        <OtherUserProfile profile={profile} getProfile={getProfile} isLoaded={isLoaded} username={username}/>
  

        <div className="flex flex-col">
        <h1 className=" text-3xl mx-auto text-text1 dark:text-text2 justify-items-center text-center">Posts</h1>
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
              afterDelete={getProfile}
            />
          ))}
          </div>
        </div>
        </div>


    </div>  )
}

export default UserProfile