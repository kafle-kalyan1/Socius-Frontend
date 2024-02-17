import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import ImageUploader from "/src/components/FileUploader/ImageUploader"; // Adjust the path
import Button from "/src/components/Button/Button";
import { UserIcon } from "/src/Library/Icons/Icons";
import { hideBigPopup } from "/src/components/BigPopup/BigPopup";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import {
  defaultProfilePic,
  uploadCloudinary,
} from "../../Library/Others/Others";
import { showLoading } from "../../components/Loading/Loading";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import APICall from "../../Library/API/APICall";


const ChangeProfilePic = ({ profile_picture, getOwnPosts, getUserProfile, fetchProfileData }) => {
  const formik = useFormik({
    initialValues: {
      profile_picture: profile_picture ? profile_picture : defaultProfilePic,
    },
    onSubmit: async () => {
      if (!formik.values.profile_picture) {
        toast.error("Please choose a new profile picture before saving.");
        return;
      }
        var response = await APICall('/api/auth/updateProfilePicture/', 'post', formik.values)
        if(response.status == 200){
          toast.success('Profile picture changed successfully')
          hideBigPopup('profile-pic');
          getOwnPosts();
          getUserProfile();
          fetchProfileData();
        }
        else{
          toast.error('Something went wrong')
        }
    },
  });

  const handleCancel = () => {
    hideBigPopup("profile-pic");
  };

  const changeProfile = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      showLoading(true);
      let file = input.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        var url = await uploadCloudinary(reader.result);
        formik.setValues({ ...formik.values, profile_picture: url.url });
        showLoading(false);
      };
      reader.onerror = (error) => {
        toast.error("Error: ", error);
        console.log("Error: ", error);
      };
    };
  };

  return (
    <div className="flex flex-col mx-auto bg-cardBg dark:bg-darkcardBg rounded-md w-fit h-fit p-8 my-0">
      <div
        className="h-96 w-96 mx-auto rounded-full overflow-hidden"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        <img
          className="h-full w-full object-cover"
          src={formik.values.profile_picture}
          alt="Profile Pic"
        />
      </div>

      <div className="flex justify-center align-middle gap-4 mt-8">
        <Button
          type="secondary"
          text="Save"
          width={20}
          onClick={formik.handleSubmit}
        />
        <Button
          type="primary"
          text="Change"
          width={20}
          onClick={changeProfile}
        />
        <Button
          type="danger"
          text="Cancel"
          width={20}
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default ChangeProfilePic;
