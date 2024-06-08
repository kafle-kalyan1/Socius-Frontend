import React, { useContext } from "react";
import { showBigPopup, hideBigPopup } from "/src/components/BigPopup/BigPopup";
import CreatePost from "/src/components/CreatePost/CreatePost";
import { ProfileContext } from "/src/context/ProfileContext/ProfileContext";
import { defaultProfilePic } from "/src/Library/Others/Others";

const PostCreation = () => {
  const { profile } = useContext(ProfileContext);

  const createPostHandler = () => {
    showBigPopup({
      id: "createPost",
      children: <CreatePost profile={profile} />,
      onClose: () => hideBigPopup('createPost', false)
    });
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex items-center gap-x-3">
        <img
          src={profile?.profile_picture ? profile.profile_picture : defaultProfilePic}
          alt="profile-pic"
          className="w-[2rem] h-[2rem] rounded-full"
        />
        <div
          className="flex-grow flex items-center justify-start px-4 border-2 border-gray-200 bg-gray-50 rounded-3xl py-2 cursor-pointer"
          onClick={createPostHandler}
        >
          <span className="font-poppins text-xs select-none">
            What's on your mind? <span className="max-[400px]:hidden">{profile?.username}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCreation;
