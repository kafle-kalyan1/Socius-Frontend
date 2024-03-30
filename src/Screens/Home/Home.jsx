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
import {defaultProfilePic, urltoBase64} from './../../Library/Others/Others';
import { hideBigPopup } from "../../components/BigPopup/BigPopup";
import InfiniteScroll from 'react-infinite-scroll-component';


const Home = () => {
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  const createPost2 = () => {
    showBigPopup({
      id: "createPost",
      children: <CreatePost profile={profile} />,
      ask: true,
      onClose: ()=>hideBigPopup('createPost',true)
  });
  }

  useEffect(() => {
  
    getPosts();

  }, [sort, page]);

  const getPosts = async () => {
    try {
      const response = await APICall(`/api/posts/getPosts/?sort=${sort}&page=${page}`, "GET", {});
      setPosts(prevPosts => [...prevPosts, ...response]); 
      setHasMore(true);
      const setting_response = await APICall("/api/utils/getSettings/", "GET", {});
      if(setting_response.status === 200){
        if(setting_response.data.sync_post_for_offline == true){
          storePostsInIndexedDB(response);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const imageUrlToBase64 = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  function storePostsInIndexedDB(posts) {
    const request = indexedDB.open('postsDB', 6);
  
    request.onerror = function(event) {
      console.error('Database error:', event.target.error);
    };
  
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('posts')) { 
        const objectStore = db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('id', 'id', { unique: false });
      }
    };
  
    request.onsuccess = async function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['posts'], 'readwrite');
      const objectStore = transaction.objectStore('posts');
  
      objectStore.clear();
  
      for (const post of posts) {
        if (post.images && post.images.length > 0) {
          const base64 = await imageUrlToBase64(post.images[0]);
          post.image = base64;
        }
        objectStore.add(post);
      }
    }
  }
  
  
  
  

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
          onChange={(value) => {setSort(value); setPosts([]); setPage(1);}}
          />
        </div>
      </div>
        <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage(prevPage => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        >

          {posts.length > 0 && posts.map((post, i) => (
            <Post
              key={post.id+i}
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
              afterDelete={()=>getPosts()}
              is_post_saved={post.is_post_saved}
              is_deep_fake={post.is_deep_fake}
            />
          ))}
      </InfiniteScroll>

          
        

        </div>
      </div>

      <div className={`block w-[33%] max-xl:hidden h-full overflow-auto sticky right-2 scrollbar  top-0`}>
    <NotificationPannel/>
  </div>
    </div>
  );
};

export default Home;
