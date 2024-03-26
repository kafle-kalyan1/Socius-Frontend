import React, { forwardRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { dateFormat, defaultProfilePic, timeAgo } from "/src/Library/Others/Others";

const PrintableContent = ({ id, profileImage, username, timestamp, postText, images }, ref) => {
   
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-4">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted cursor-pointer">
              <img
                alt="Profile picture"
                className="object-cover w-full h-full"
                src={profileImage ? profileImage : defaultProfilePic}
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
              />
            </span>
          </span>
          <div>
            <h4 className=" font-primary_font tracking-wide text-md">{username}</h4>
            <p className="font-primary_font tracking-wide text-sm text-gray-500" title={dateFormat(timestamp, true)}>{timeAgo(timestamp)}</p>
          </div>
        </div>
      </div>
      <Carousel showArrows={true} showThumbs={false} emulateTouch>
        {images && images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Post content ${index}`} className="p-4" style={{ width: '500px', height: 'auto' }} />
          </div>
        ))}
      </Carousel>
      <p className="mt-4 text-text1 dark:text-text2">{postText}</p>
    </div>
  );
};

export default PrintableContent;