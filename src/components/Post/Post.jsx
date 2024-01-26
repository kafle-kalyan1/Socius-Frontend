import React, { useEffect, useState } from "react";
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

const Post = ({
  id,
  profileImage,
  username,
  timestamp,
  postText,
  images,
  likes,
  comments,
  shares,
  fullname,
}) => {
  
  const [showFullText, setShowFullText] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const [count, setCount] = useState(
    {likes: 0, comments: 0}
  );
  console.log(images?.length)

  
  const navigate = useNavigate();

  useEffect(() => {
    setCount({likes: likes, comments: comments})
  }, [likes, comments])

  function openImageinNewTab(e) {
    window.open(e.target.src, "_blank");
  }

  function toggleShowFullText() {
    setShowFullText(!showFullText);
  }

  function showNextImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function showPreviousImage() {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }

  function viewProfile(username) {
    navigate(`u/${username}`);
  }

  const truncatedText = showFullText ? postText : postText.slice(0, 200);


  const handleLike = () => {
    setCount((prevCount) => ({ ...prevCount, likes: prevCount.likes + 1 }));
  };

  
  const buttons = [
    { label: 'Report', onClick: ()=> console.log("Button 1 Clicked") },
    { label: 'Print', onClick: ()=> console.log("Button 2 Clicked") },
  ];

  return (
    <div
      className=" bg-cardBg text-black rounded-lg flex flex-col min-h-[300px] h-auto min-w-[350px] max-w-[600px] 3xl:max-w-[800px] 3xl:w-[800px] space-y-6 p-5 mb-4"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className="flex space-x-4 items-center w-full ">
        <div className="w-12 h-12">
          <img
            onClick={() => viewProfile(username)}
            alt="avatar"
            src={profileImage ? profileImage : defaultProfilePic}
            className="rounded-full w-full h-full object-cover cursor-pointer"
          />
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2 items-center w-full">
            <h2
              onClick={() => viewProfile(username)}
              className="text-base cursor-pointer"
            >
              {fullname}
            </h2>
            <CheckCircleOutlined className=" text-secondary_text" title="This Profile is verified" />
            <div className="text-xs text-black">posted an update</div>
            <CustomPopover content={"Options"} buttons={buttons} mainButton={<EllipsisOutlined />} />
          </div>
          <p className="text-xs text-black">{timeAgo(timestamp)}</p>
        </div>
      </div>
      <div>
        <p
          className="post_text text-sm leading-6 text-black"
          dangerouslySetInnerHTML={{ __html: truncatedText }}
        ></p>
        {postText.length > 3 && (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleShowFullText}
          >
            {showFullText ? " Show less" : " Show more"}
          </span>
        )}
      </div>
      <div className="relative">
        {images?.length > 1 ? (
          <div
            onClick={showPreviousImage}
            title="Show Previous"
            className="cursor-pointer absolute left-1 top-1/2 transition-opacity duration-300 "
            style={{ opacity: isMouseOver ? 0.8 : 0 }}
          >
            <LeftCircleOutlined style={{ fontSize: "40px" }} />
          </div>
        ) : null}
        {images?.length > 1 ? (
          <div
            onClick={showNextImage}
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
          <button onClick={handleLike} className="flex gap-1 items-center">
            <HeartOutlined/>
            <p>{count.likes} Likes</p>
          </button>
        </div>
        <button onClick={()=> console.log("comment")} className="flex gap-1 items-center">
          <CommentOutlined style={{ fontSize: "20px" }} />
          <p>{count.comments} Comments</p>
        </button>
        <button onClick={()=> console.log("share")} className="flex gap-1 items-center ">
          <SendOutlined style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default Post;

