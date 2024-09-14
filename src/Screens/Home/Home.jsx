import React, { useState, useEffect, useContext } from "react";
import Sidebar from "/src/components/Sidebar/Sidebar";
import Post from "/src/components/Post/Post";
import { ProfileContext } from "/src/context/ProfileContext/ProfileContext";
import { showBigPopup, hideBigPopup } from "/src/components/BigPopup/BigPopup";
import CreatePost from "/src/components/CreatePost/CreatePost";
import APICall from "../../Library/API/APICall";
import toast from "react-hot-toast";
import { Select } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationPannel from "../../components/Notification/NotificationPannel/NotificationPannel";
import { defaultProfilePic } from './../../Library/Others/Others';

const Home = () => {
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const createPost2 = () => {
    showBigPopup({
      id: "createPost",
      children: <CreatePost profile={profile} getNewPost={()=>getPosts(true)} />,
      onClose: () => hideBigPopup('createPost', false),
    });
  };

  const getPosts = async (getNew) => {
    if (loading) return;
    setLoading(true);
    if (getNew) {
      setPage(1);
      setPosts([]);
    }

    try {
      const response = await APICall(`/api/posts/getPosts/?sort=${sort}&page=${page}`, "GET", {});
      if(response.status === 200){

      if (page === 1) {
        setPosts(response || []);
      } else {
        setPosts(() => [...response]);
      }
      setHasMore(response.length > 0);

      const setting_response = await APICall("/api/utils/getSettings/", "GET", {});
      if (setting_response.status === 200 && setting_response.data.sync_post_for_offline) {
        storePostsInIndexedDB(response);
      }
    }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [sort, page]);

  const storePostsInIndexedDB = (posts) => {
    const request = indexedDB.open('postsDB', 8);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('posts')) {
        const objectStore = db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('id', 'id', { unique: true });
      }
    };

    request.onsuccess = async (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['posts'], 'readwrite');
      const objectStore = transaction.objectStore('posts');

      objectStore.clear().onsuccess = () => {
        posts.forEach((post) => {
          objectStore.add(post).onerror = (event) => {
            console.error('Error adding post to IndexedDB', event.target.error);
          };
        });
      };

      transaction.oncomplete = () => {
        console.log('All posts have been stored in IndexedDB.');
      };

      transaction.onerror = (event) => {
        console.error('Transaction error:', event.target.error);
      };
    };
  };

  const filters = [
    { value: "default", label: "Default" },
    { value: "new", label: "New" },
    { value: "friend", label: "Friend's Post" },
  ];

  return (
    <div className="flex bg-cardBg2 dark:bg-darkcardBg2 min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-1/5 bg-gray-100 dark:bg-gray-900 overflow-y-auto hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col items-center w-2/4 p-4  md:p-10 ml-0 ">
        <div className="w-full max-w-4xl mb-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 w-2/4">
              <img
                src={profile?.profile_picture || defaultProfilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div
                className="w-full flex items-center border border-gray-300 bg-gray-100 dark:bg-darkgray rounded-2xl py-2 px-4 cursor-pointer"
                onClick={createPost2}
              >
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  What&apos;s on your mind? <span className="hidden sm:inline">{profile?.username}</span>
                </span>
              </div>
            </div>
            <Select
              defaultValue={sort}
              onChange={(value) => {
                setSort(value);
                setPosts([]);
                setPage(1);
              }}
              options={filters}
              className="sort-dropdown w-1/4 md:w-1/6"
            />
          </div>
        </div>

        <div className="w-full max-w-4xl flex-1 overflow-auto">
          <InfiniteScroll
            dataLength={posts.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<h4>No more posts</h4>}
          >
            {posts && posts.length > 0 && posts.map((post, i) => (
              <Post
                key={post.id + i}
                id={post.id}
                profileImage={post.user_profile.profile_picture}
                username={post.user.username}
                timestamp={post.timestamp}
                fullname={post.user_profile.fullname}
                postText={post.text_content}
                images={post.images}
                likes_count={post.likes_count}
                user_has_liked={post.user_has_liked}
                comments_count={post.comments_count}
                is_verified={false}
                is_suspicious={false}
                shares={0}
                afterDelete={getPosts}
                is_post_saved={post.is_post_saved}
                is_deep_fake={post.is_deep_fake}
                comments={post.comments}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>

      {/* Notification Panel */}
      <div className="fixed top-0 right-0 h-full w-1/4 bg-gray-100 dark:bg-gray-900 overflow-y-auto hidden md:block">
        <NotificationPannel />
      </div>
    </div>
  );
};

export default Home;
