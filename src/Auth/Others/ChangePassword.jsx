import axios from 'axios';
import { Form, useFormik } from 'formik';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import Input from "/src/components/Input/Input";
import Button from "/src/components/Button/Button";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import DynamicLogo  from '/src/DynamicLogo';
import { LockOutlined } from '@ant-design/icons';
import { hideBigPopup } from '/src/components/BigPopup/BigPopup';
import APICall from '../../Library/API/APICall';



const ChangePassword = ({getOwnPosts, getUserProfile, fetchProfileData }) => {
  
  const access = Cookies.get("access");

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Old Password is required").min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,"Password must contain at least one uppercase letter, one lowercase letter and one number"),
          
      new_password: Yup.string().required("New Password is required").min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,"Password must contain at least one uppercase letter, one lowercase letter and one number"),
          
      confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match').min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,"Password must contain at least one uppercase letter, one lowercase letter and one number"),
              }),
    onSubmit: async () => {
      var response = await APICall('/api/auth/changePassword/', 'post', formik.values)
      if(response.status == 200){
        toast.success("Password changed successfully");
        hideBigPopup('change-password');
        getOwnPosts();
        getUserProfile();
        fetchProfileData();
      }
      else{
        toast.error('Something went wrong')
      }

    }
  })



  return (
    <>
    <div className="flex flex-col mx-auto bg-cardBg2 dark:bg-darkcardBg2 text-text1 dark:text-text2 rounded-md h-fit p-8 my-0 gap-4 w-[30vw] max-md:w-full">
            <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
              <DynamicLogo />
            </h1>
            <h4 className="text-sm font-bold text-center text-primary">
              Change Password
            </h4>

            <Input
              formik={formik}
              Icon={<LockOutlined/>}
              type="text"
              title="Old Password"
              name="old_password"
              haveHideView={true}
              placeholder="Old Password"
            />
            <Input
              formik={formik}
              Icon={<LockOutlined/>}
              type="text"
              title="New Password"
              name="new_password"
              haveHideView={true}
              placeholder="New Password"
            />
            <Input
              formik={formik}
              Icon={<LockOutlined/>}
              type="text"
              title="Confirm New Password"
              haveHideView={true}
              name="confirm_password"
              placeholder="Confirm Password"
            />
            
            <Button 
            type="primary" 
            text="Change Password" 
            onClick={formik.handleSubmit}
            icon={<LockOutlined/>}
            />
      
    </div>
    </>
  )
}

export default ChangePassword