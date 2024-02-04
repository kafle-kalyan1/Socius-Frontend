import React, { useContext, useEffect, useState } from "react";
import {
  HeartOutlined,
  CommentOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  CheckCircleOutlined,
  EllipsisOutlined,
  WarningOutlined,
  SendOutlined // for share
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomPopover from "../PopOver/PopOver";
import '/src/index.css'
import { defaultProfilePic, timeAgo } from "../../Library/Others/Others";
import { FaThumbsUp } from "react-icons/fa";
import { ThumbsUp, ThumbsUpIcon } from "lucide-react";
import APICall from "../../Library/API/APICall";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";

const Post = ({
  id,
  profileImage,
  username,
  timestamp,
  postText,
  images,
  likes,
  user_has_liked,
  comments,
  shares,
  fullname,
  afterDelete
}) => {
  
  const [showFullText, setShowFullText] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [userHasLiked, setUserHasLiked] = useState(user_has_liked);

  const {profile} = useContext(ProfileContext)


  const [count, setCount] = useState(
    {likes: 0, comments: 0}
  );

  
  const navigate = useNavigate();

  useEffect(() => {
    setCount({likes: likes, comments: comments})
  }, [likes, comments])

  function openImageinNewTab(e) {
    
    window.open(e.target.src, "_blank");
  }

  function toggleShowFullText(e) {
    e.stopPropagation();
    setShowFullText(!showFullText);
  }

  function showNextImage(e) {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function showPreviousImage(e) {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }

  function viewProfile(username) {
    navigate(`u/${username}`);
  }

  const truncatedText = showFullText ? postText : postText.slice(0, 200);


  const  handleLike = async (e,id) => {
    e.stopPropagation();
   let res =  await APICall('/api/posts/likePost/','POST',{'post_id':id})
    if(res.status == 200){
   console.log(res.status)
   setUserHasLiked((p)=>!p)
   setCount((prevCount) => ({ ...prevCount, likes: res.data }));
   
    
  }

}

const DeletePost = async (e,id) =>{
  console.log(id)
  let res =  await APICall('/api/posts/deletePost/','POST',{'post_id':id})
  if(res.status == 200){
      afterDelete()
      // navigate('/')

  }
}
  
  const buttons = [
    { label: 'Report', onClick: ()=> console.log("Button 1 Clicked") },
    { label: 'Print', onClick: ()=> console.log("Button 2 Clicked") },
     username == profile.username && { label: 'Delete', onClick: (e)=> DeletePost(e,id) }
  ];

  function viewPost(id){
    navigate
  }

  return (
    <div
  className="bg-white text-gray-800 rounded-lg flex flex-col min-h-[300px] h-auto min-w-[250px] max-w-[650px] 3xl:max-w-[850px] 3xl:w-[800px]  space-y-6 p-5 py-7 mb-4 shadow-lg"
  onMouseEnter={() => setIsMouseOver(true)}
  onMouseLeave={() => setIsMouseOver(false)}
>
  <div className="flex space-x-4 items-center w-full ">
    <div className="w-12 h-12">
      <img
        onClick={(e) =>{ e.stopPropagation(); viewProfile(username)}}
        alt="avatar"
        src={profileImage ? profileImage : defaultProfilePic}
        className="rounded-full w-full h-full object-cover cursor-pointer"
      />
    </div>
    <div className="space-y-2">
      <div className="flex space-x-2 items-center w-full">
        <h2
          onClick={(e) =>{ e.stopPropagation(); viewProfile(username)}}
          className="text-base font-bold cursor-pointer"
        >
          {fullname}
        </h2>
        <CheckCircleOutlined
          className=" text-green-500"
          title="This Profile is verified"
        />
        <div className="text-xs text-gray-600">posted an update</div>
        <CustomPopover
          content={"Options"}
          buttons={buttons}
          mainButton={<EllipsisOutlined />}
        />
      </div>
      <p className="text-xs text-gray-600">{timeAgo(timestamp)}</p>
    </div>
  </div>
  <div>
    <p
      className="post_text text-sm leading-6 text-gray-800"
      dangerouslySetInnerHTML={{ __html: truncatedText }}
    ></p>
    {postText.length > 3 && (
      <span
        className="text-blue-500 cursor-pointer"
        onClick={(e)=>toggleShowFullText(e)}
      >
        {showFullText ? " Show less" : " Show more"}
      </span>
    )}
  </div>
  <div className="relative cursor-pointer"   onClick={(e)=>{
    e.stopPropagation();
  navigate('/post/'+id);}}
  >
    {images?.length > 1 ? (
      <div
        onClick={(e)=>showPreviousImage(e)}
        title="Show Previous"
        className="cursor-pointer absolute left-1 top-1/2 transition-opacity duration-300 "
        style={{ opacity: isMouseOver ? 0.8 : 0 }}
      >
        <LeftCircleOutlined style={{ fontSize: "40px" }} />
      </div>
    ) : null}
    {images?.length > 1 ? (
      <div
        onClick={(e)=>showNextImage(e)}
        title="Show Next"
        className="cursor-pointer absolute right-1 top-1/2 transition-opacity duration-300"
        style={{ opacity: isMouseOver ? 0.8 : 0 }}
      >
        <RightCircleOutlined style={{ fontSize: "40px" }} />
      </div>
    ) : null}
    {images?.length > 0 ? (
      <img
        onClick={(e) => openImageinNewTab(e)}
        src={images[currentImageIndex]}
        alt="post"
        style={{ pointerEvents: "none" }}
        title="Click to open in new tab"
        className="h-auto w-full cursor-alias object-cover rounded-lg"
      />
    ) : (
      <></>
    )}
  </div>
  <div className="flex justify-between pt-1">
    <div className="flex gap-2">
      <button onClick={(e)=> handleLike(e,id)} className="flex gap-1 items-center">
        <ThumbsUpIcon className={userHasLiked ? " fill-secondary_btn text-secondary_btn_hover" : ""}/>
        <p>{count.likes} Likes</p>
      </button>
    </div>
    <button onClick={() => console.log("comment")} className="flex gap-1 items-center">
      <CommentOutlined style={{ fontSize: "20px" }} />
      <p>{count.comments} Comments</p>
    </button>
    <button onClick={() => console.log("share")} className="flex gap-1 items-center ">
      <SendOutlined style={{ fontSize: "20px" }} />
    </button>
  </div>
</div>

  );
};

export default Post;

