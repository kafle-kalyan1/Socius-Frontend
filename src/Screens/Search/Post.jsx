import React, { useEffect, useState } from 'react'
import APICall from '../../Library/API/APICall';
import toast from 'react-hot-toast';
import Post  from '/src/components/Post/Post';


const RecPost = ({data}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, [data]);
  const getPosts = async () => {
    debugger
    console.log(data);
    if(data == null || data == undefined){
      try {
        const response = await APICall("/api/utils/trendingPosts/", "GET");
        // console.log(response);
        setPosts(response.data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    else{
      setPosts(data);
    }
  }

  return (
    <div className='flex-1 w-full h-full mt-5 justify-center text-text1 dark:text-text2'>
    <div className='flex flex-col justify-center text-center'>
      <h1 className="text-2xl font-bold">Recomanded Post</h1>
    </div>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 text-text1 dark:text-text2 mt-4 gap-4"> 
     {
      posts && posts.length > 0 ? posts.map((post) => {
        return (
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
              shares={0} 
            />
        )
      }
      ): 
      <p>No Posts Found</p>
     }
     </div>
    </div>
    )
}

export default RecPost