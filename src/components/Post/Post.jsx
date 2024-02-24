/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { dateFormat, defaultProfilePic, socketLink, timeAgo } from "../../Library/Others/Others";
import { FaThumbsUp } from "react-icons/fa";
import { MoreHorizontalIcon, ThumbsUp, ThumbsUpIcon } from "lucide-react";
import APICall from "../../Library/API/APICall";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import { w3cwebsocket } from "websocket";
import {  Tooltip } from "antd";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const descriptionLength = 120;


  function viewProfile(username) {
    navigate(`/u/${username}`);
  }

  const truncatedText = showFullText ? postText : postText.slice(0, 200);


  const  handleLike = async (e,id) => {
    e.stopPropagation();
   let res =  await APICall('/api/posts/likePost/','POST',{'post_id':id})
    if(res.status == 200){
      
      if(!userHasLiked){
        const newSocket = new w3cwebsocket(`${socketLink}/notifications/${profile.username}/`);
      newSocket.onopen = () => {
        newSocket.send(
          JSON.stringify({
            "type":"post_like",
            "data":{
              "liker_username":profile.username,
              "post_id": id,
              "receiver":username
            },
          })
        );
      };
      }

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

const LikeButton = () => (
  <Tooltip title={userHasLiked ? "Unlike":"Like"}>
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1"  onClick={(e)=> handleLike(e,id)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="38"
    viewBox="0 0 24 24"
    fill={userHasLiked ? "red" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
  {count.likes}
  </button>
  </Tooltip>
)

const CommentButton = () => (
  <Tooltip title="Comments">
      <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10  px-4 py-2 gap-1`} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M17 6.1H3" />
          <path d="M21 12.1H3" />
          <path d="M15.1 18H3" />
        </svg>
        {count.comments}
      </button>
      </Tooltip>
)

const ShareButton = () => (
  <Tooltip title="Share">
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1={12} x2={12} y1={2} y2={15} />
    </svg>
  </button>
  </Tooltip>
)

const SaveButton = () => (
  <Tooltip title="Save">
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  </button>
    </Tooltip>
)

const ReportButton = () => (
  <Tooltip title="Report">
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" title='Report'>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1={4} x2={4} y1={22} y2={15} />
    </svg>
  </button>
  </Tooltip>
)

const MoreOptionButton = () => (
  <Tooltip title="More Options">
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-cardBg dark:bg-darkcardBg hover:bg-accent  hover:text-accent-foreground h-10 px-4 py-2" title='More Options'>
      <CustomPopover
        content={"Options"}
        buttons={buttons}
        mainButton={<MoreHorizontalIcon />}
      />
      </button>
      </Tooltip>
)
  
  const buttons = [
    { label: 'Report', onClick: ()=> console.log("Button 1 Clicked") },
    { label: 'Print', onClick: ()=> console.log("Button 2 Clicked") },
     username == profile.username && { label: 'Delete', onClick: (e)=> DeletePost(e,id) }
  ];

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div
    className="border text-card-foreground max-w-xl mx-auto mt-8 p-5 bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 shadow-md rounded-md"
    data-v0-t="card"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-4">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted cursor-pointer">
            <img
              alt="Profile picture"
              className="object-cover w-full h-full"
              onClick={(e) =>{ e.stopPropagation(); viewProfile(username)}}
              src={profileImage ? profileImage : defaultProfilePic}
              style={{ aspectRatio: "1/1", objectFit: "cover" }}
              />
          </span>
        </span>
        <div>
          <h4 className=" font-primary_font tracking-wide text-md cursor-pointer" onClick={(e) =>{ e.stopPropagation(); viewProfile(username)}}>{username}</h4>
          <p className="font-primary_font tracking-wide text-sm text-gray-500" title={dateFormat(timestamp,true)}>{timeAgo(timestamp)}</p>
          
        </div>
        
      </div>
      <div className="flex items-center space-x-2">
        <MoreOptionButton/>
       <ReportButton/>
      </div>
    </div>
    <Carousel showArrows={true}  onChange={onChange} showThumbs={false} emulateTouch>
  {images.map((image, index) => (
    <div key={index}>
      <img src={image} alt={`Post content ${index}`} style={{width: '500px', height: 'auto'}} />
    </div>
  ))}
</Carousel>
 <p className="mt-4 text-text1 dark:text-text2">
      {
        // Use the slice method to show only a part of the text when it is collapsed
        isExpanded ? postText : `${postText.slice(0, descriptionLength)}`
      }
      {
        // Use a conditional rendering to show or hide the button based on the length of the text
        postText.length > descriptionLength && (<>
          {!isExpanded && <>...</>}
          <button
            onClick={toggleText}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </>
        )
      }
    </p>
    
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center space-x-2">
      <LikeButton/>
        <CommentButton/>
      <ShareButton/>
      

      </div>
      <SaveButton/>
    </div>
  </div>

  );
};

export default Post;

