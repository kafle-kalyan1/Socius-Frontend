/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomPopover from "../PopOver/PopOver";
import '/src/index.css'
import { copy, dateFormat, defaultProfilePic, defaultURL, socketLink, timeAgo } from "../../Library/Others/Others";
import { FaHackerNews, FaPrint, FaThumbsUp } from "react-icons/fa";
import { MoreHorizontalIcon, Printer, PrinterIcon, ThumbsUp, ThumbsUpIcon } from "lucide-react";
import APICall from "../../Library/API/APICall";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import { w3cwebsocket } from "websocket";
import {  Modal, QRCode, Tooltip } from "antd";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import toast from "react-hot-toast";
import { hideAlertModal, showModal } from "../Alert/Alert";
import BigPopup, { hideBigPopup, showBigPopup } from "../BigPopup/BigPopup";
import SharePopup from './Component/SharePopup';
import Button  from '/src/components/Button/Button';
import ReportPopup from "./Component/ReportPopup";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import ContextMenu from "../ContextMenu/ContextMenu";
import { MdDrafts, MdEdit, MdOutlineDelete, MdOutlineDownload, MdOutlineImage, MdOutlinePrint, MdOutlineQrCode, MdOutlineReport, MdOutlineWarning, MdWarning } from "react-icons/md";
import { BsRobot, BsThreeDotsVertical } from "react-icons/bs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/extracomponents/ui/hover-card";
import AudioPlayer from "./Component/AudioPlayer";
import { Separator } from "@/extracomponents/ui/separator";
import EditPost from "../EditPost/EditPost"; // Import the EditPost component



const Post = ({
  id,
  profileImage,
  username,
  timestamp,
  postText,
  images,
  likes_count ,
  user_has_liked,
  is_post_saved,
  comments_count,
  shares,
  fullname,
  afterDelete,
  is_deep_fake,
  single_view = false,
  comments
}) => {
  
  const [showFullText, setShowFullText] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [userHasLiked, setUserHasLiked] = useState(user_has_liked);
  const [saved, setSaved] = useState(is_post_saved);
  const [isEditPostVisible, setIsEditPostVisible] = useState(false); // State for EditPost visibility


  const {profile} = useContext(ProfileContext)


  const [count, setCount] = useState(
    {likes: 0, comments: 0}
  );

  
  const navigate = useNavigate();

  useEffect(() => {
    setCount({likes: likes_count, comments: comments_count})
  }, [likes_count, comments_count])

  function openImageinNewTab() {
    //open current image in new tab according to image index
    const url = images[currentImageIndex];
    window.open(url, "_blank");
  }

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const Share = () => {
    const url = `${window.location.origin}/post/${id}`;

    showBigPopup({
      id: "sharePost",
      onClose: () => hideBigPopup("sharePost"),
      children: (
        <SharePopup id={id} postText={postText} images={images} />
      )
    });
  };

  const descriptionLength = 120;

  const singleView = () => {
    navigate(`/post/${id}`)
  }

  const ReportPost = () => {


    showBigPopup({
      id: "reportPost",
      onClose: () => hideBigPopup("reportPost"),
      children: (
        <ReportPopup id={id}/>
      )
    });
  }



  const PrintPost = () => {
    const printWindow = window.open("", "", "width=1000,height=700");
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Post</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .post {
              background-color: #fff;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 16px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .post-header {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
            }
            .profile-pic {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
              margin-right: 12px;
            }
            .username {
              font-weight: bold;
              margin-bottom: 4px;
            }
            .timestamp {
              color: #888;
              font-size: 14px;
            }
            .post-content {
              margin-bottom: 16px;
            }
            .post-images {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 16px;
            }
            .post-image {
              max-width: 100%;
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <div class="post">
            <div class="post-header">
              <img class="profile-pic" src="${profileImage || defaultProfilePic}" alt="Profile Picture">
              <div>
                <div class="username">${username}</div>
                <div class="timestamp">${dateFormat(timestamp, true)}</div>
              </div>
            </div>
            <div class="post-content">${postText}</div>
            <div class="post-images">
              ${images.map((image) => `<img class="post-image" src="${image}" alt="Post Image">`).join('')}
            </div>
          </div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.print();
  }
  
  function viewProfile(username) {
    navigate(`/u/${username}`);
  }

  const truncatedText = showFullText ? postText : postText.slice(0, 200);

  const report_deepfake = async () => {
    let res = await APICall('/api/posts/reportDeepFake/','POST',{'post_id':id})
    if(res.status == 200){
      toast.success(res.message)
    }
  }

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
  showModal({
    type: "warning",
    title: "Delete Post",
    message: "Are you sure you want to delete this post?",
    buttons: [
      {
        title: "Yes",
        onclick: async () => {
          let res =  await APICall('/api/posts/deletePost/','POST',{'post_id':id})
          if(res.status == 200){
            toast.success("Post deleted successfully")
              afterDelete
              // navigate('/')
        
          }
        },
      },
      {
        title: "No",
        onclick: () => {
          hideAlertModal();
        },
      },
    ],
    outSideAction: true,
    

 }      
 );    
}

const savePost = async () => {
  let res =  await APICall('/api/posts/savePost/','POST',{'post_id':id})
  if(res.status == 200){
    toast.success(res.message)
    setSaved((p)=>!p)
  }
}

const LikeButton = () => (
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground px-4 py-2 gap-1"  onClick={(e)=> handleLike(e,id)}>
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
)

const CommentButton = () => (
      <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10  px-4 py-2 gap-1`} onClick={singleView}>
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
)

const ShareButton = () => (
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
  onClick={Share}
  >
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
)

const SaveButton = () => (
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cardBg dark:bg-darkcardBg hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
  onClick={savePost}
  >

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={saved ? "gray" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  </button>
)
const downloadQRCode = () => {
  const canvas = document.getElementById("qr"+id)?.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const showQRModal = () => {
  const url = `http://localhost:5173/post/${id}`;
  showBigPopup({
    id: "qrCode",
    onClose: () => hideBigPopup("qrCode"),
    children: (
      <div  id={"qr"+id} className="flex flex-col items-center justify-center p-4">
        <QRCode value={url} size={256} />
        <Button type="primary" onClick={downloadQRCode}
        className="mt-4"
        text="Download QR Code"
        />
      </div>
    )
  });
};

const MoreOptionButton = () => (
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cardBg dark:bg-darkcardBg hover:bg-accent  hover:text-accent-foreground h-10 px-4 py-2" title='More Options'>
      {/* <CustomPopover
        content={"Options"}
        buttons={buttons}
        mainButton={<MoreHorizontalIcon />}
      /> */}
       <Menu menuButton={<MenuButton> <MoreHorizontalIcon /> </MenuButton>} transition>
      <MenuItem>
        <button className="flex items-center gap-2 cursor-pointer" onClick={ReportPost}>
        <MdOutlineReport />
        Report</button>
      </MenuItem>
      <MenuItem>
        <button className="flex items-center gap-2 cursor-pointer" onClick={PrintPost}>
        <MdOutlinePrint />
        Print</button>
      </MenuItem>
      <MenuItem>
        <button className="flex items-center gap-2 cursor-pointer" onClick={showQRModal}>
        <MdOutlineQrCode />
        Show QR</button>
      </MenuItem>
      {username == profile?.username && 
      <>

      <MenuItem>
        <button className="flex items-center gap-2 cursor-pointer" onClick={(e)=> DeletePost(e,id)}>
        <MdOutlineDelete />
        Delete</button>
      </MenuItem>
      {/* <MenuItem>
        <button className="flex items-center gap-2 cursor-pointer" onClick={(e)=> DeletePost(e,id)}>
        <MdEdit />
        Edit</button>
      </MenuItem>
      <MenuItem>
        <button className="flex items-center gap-2 cursor-pointer" onClick={(e)=> DeletePost(e,id)}>
        <MdDrafts />
        Draft</button>
      </MenuItem> */}
      </>
      }
      {
        profile && profile?.is_staff && images && images.length > 0 && (
          <>
          <MenuItem>
          <button className="flex items-center gap-2 cursor-pointer" onClick={(e)=> DeletePost(e,id)}>
        <BsRobot />
        Report DeepFake</button>
          </MenuItem>
          </>
        )
      }
    </Menu>
      </button>
)
  
  const buttons = [
    { label: 'Report', onClick: ReportPost},
    { label: 'Print', onClick: ()=> PrintPost },
     username == profile?.username && { label: 'Delete', onClick: (e)=> DeletePost(e,id) }
  ];

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event) => {
    event.preventDefault();
    setShowContextMenu(true);
    setAnchorPoint({ x: event.clientX, y: event.clientY });
  };

  const handleContextMenuClose = () => {
    setShowContextMenu(false);
  };

  return (
    <div
    className={`border text-card-foreground max-w-xl mx-auto mt-8 p-5 bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 shadow-md rounded-md ${is_deep_fake ? 'border-red-500' : ''}`}
    data-v0-t="card"
    title={is_deep_fake ? "This post is detected as deep fake" : ""}
    onContextMenu={handleContextMenu}
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
          <p className="font-primary_font tracking-wide text-sm text-gray-500" title={dateFormat(timestamp,true)}>{timeAgo(timestamp)}
          </p>
          
        </div>
        
      </div>
      <div className="flex items-center space-x-2">
        <MoreOptionButton/>
      </div>
    </div>
    <Carousel showArrows={true}  onChange={onChange} showThumbs={false} emulateTouch>
  {images && images.map((image, index) => (
    <div key={index}>
      <img src={image} alt={`Post content ${index}`} className="p-4" style={{width: '500px', height: 'auto'}} />
    </div>
  ))}
</Carousel>
 <p className="mt-4 text-text1 dark:text-text2">
      {
        isExpanded || single_view ? postText : `${postText.slice(0, descriptionLength)}`
      }
      {
        postText.length > descriptionLength && !single_view && (<>
          {!isExpanded && <>...</>}
          <button
            onClick={toggleText}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary_text underline-offset-4 hover:underline h-10 px-4 py-2"
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
      <HoverCard>
  <HoverCardTrigger>        <CommentButton/>
</HoverCardTrigger>
  <HoverCardContent className="bg-cardBg2 dark:bg-darkcardBg2 font-primary_font text-text1 dark:text-text2">
    <div>
      <h3 className="font-bold text-lg">Comments</h3>
      <Separator/>
      <div className="flex flex-col">
        {
          comments && comments.length > 0 ? comments.map((comment, index) => (
            <div key={index} className="flex items-center gap-2">
              <img
                src={comment.user_profile.profile_picture || defaultProfilePic}
                alt="Profile Picture"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold">{comment.user.username}</h4>
                <p>{comment.text}</p>
                {/* if audio in comment show icon */}
                {comment.voice_comment && <AudioPlayer audioUrl={ comment.voice_comment} />}
              </div>
              <hr className="h-1 w-1"/>
            <Separator/>
            </div>
          )) : <p>No comments</p>
        }
    
        </div>
    </div>
  </HoverCardContent>
</HoverCard>
      <ShareButton/>
      

      </div>
      <SaveButton/>
    </div>
    {showContextMenu && (
        <ContextMenu
          anchorPoint={anchorPoint}
          handleClose={handleContextMenuClose}
        >

          <div className="flex flex-col gap-2">

            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={ReportPost}
            >
              <MdOutlineReport />
              Report
            </button>
            <hr />
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={PrintPost}
            >
              <MdOutlinePrint />
              Print
            </button>
            <hr />
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={showQRModal}
            >
              <MdOutlineQrCode />
              Show QR
            </button>
            <hr />
            {username == profile?.username && (
              <>
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={(e) => DeletePost(e, id)}
              >
                <MdOutlineDelete />
                Delete
              </button>
              <hr />
              </>
            )}


              {
                images && images.length > 0 && (
                  <>
                  <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={openImageinNewTab}
            >
              <MdOutlineImage />
              View Image
            </button>
                  <hr />
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                images.forEach((image) => {

                  const link = document.createElement("a");
                  link.href = image;
                  link.download = "image";
                  link.click();
                  link.remove();
                });
              }}
            >
              <MdOutlineDownload />
              Download Images
            </button>
                  </>
                )
              }

          </div>

        </ContextMenu>
      )}
  </div>

  );
};

export default Post;

