import NotificationPannel from '@/components/Notification/NotificationPannel/NotificationPannel'
import Post from '/src/components/Post/Post'
import APICall from '/src/Library/API/APICall'
import React, { useEffect, useState } from 'react'

const Saved = () => {
   const [post, setPosts] = useState([])
   useEffect(()=>{
      getSavedPost()
   },[])

   const getSavedPost = async () => {
      const response = await APICall('/api/posts/getSavedPosts/','GET',{})
      if(response.status == 200){
         setPosts(response.data)
      }
      else{
         alert("aayena")
      }
   }

  return (
<div className={`flex ml-0 w-full overflow-auto scrollbar  bg-cardBg2 dark:bg-darkcardBg2 `}>



      <div className={`block p-10 max-sm:p-1 w-[60%]  h-screen font-primary_font justify-center items-center max-lg:w-full m-auto max-sm:m-0 max-sm:w-full `}>
      <h1 className="text-2xl font-bold text-center mt-10">Saved Posts</h1>
            {
         post && post.map((post, index) => (
            <Post key={post.id+index}
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
               afterDelete={() => {setPosts(post.filter((item, i) => i !== index))}}
               is_post_saved={post.is_post_saved}
            />
         ))
      }
      </div>

<div className={`block w-[33%] max-xl:hidden h-full overflow-auto sticky right-2 scrollbar  top-0`}>
<NotificationPannel/>
</div>
    </div>
  )
}

export default Saved
