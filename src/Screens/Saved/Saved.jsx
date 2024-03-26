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
    <div>
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
  )
}

export default Saved
