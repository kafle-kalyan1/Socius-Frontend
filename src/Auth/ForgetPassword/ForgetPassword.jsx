/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { showModal } from "/src/components/Alert/Alert";

//Other's library
import Footer from "/src/components/Footer/Footer.jsx";
import {toast} from 'react-hot-toast';
import axios from "axios";
import Input from "/src/components/Input/Input";
import {  UserIcon, PasswordIcon,EyeCloseIcon, EyeOpenIcon, GoogleIcon, FacebookIcon, GithubIcon } from "/src/Library/Icons/Icons";
import DynamicLogo from "/src/DynamicLogo";

import { MailOutlined,UserOutlined,LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { showOtpModal } from '/src/components/Alert/OtpAlert';
const secret_key = import.meta.env.VITE_SECRET_KEY
import { showLoading } from '/src/components/Loading/Loading';
import Cookies from "js-cookie";
import { ProfileContext } from "/src/context/ProfileContext/ProfileContext";
import { EncryptString } from '/src/Library/Others/Others';
import Button from "/src/components/Button/Button";
import { FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ArrowLeftCircle, LockKeyholeIcon, MoveLeft, Send } from "lucide-react";
import { showBigPopup } from '/src/components/BigPopup/BigPopup';
import { hideBigPopup } from '/src/components/BigPopup/BigPopup';
import ResetPassword from "./ResetPassword";


const ForgetPassword = () => {
  const navigate = useNavigate();
  const usernames = useRef();
  const { fetchProfileData } = useContext(ProfileContext);
  useEffect(() => {
    usernames.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      showLoading(true)
      axios.post("api/auth/forgetPassword/", {
        username: values.username,
        email: values.email,
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          toast.success("Verification Mail Sent Successfully", {
            duration: 3000,
          });
          showOtpModal({title:"Verify OTP", message:"Enter the OTP sent to your email", icon:"", link:"Didn't get otp",data:{email:values.email, username:values.username}, submit:{title:"Verify", action:({data,hide})=>{
           hide()
            showBigPopup({
              onClose: () => {
                hideBigPopup('resetPassword');
              },
              children:(
                  <ResetPassword data={data}/>
                  ),
              id: 'resetPassword'
              },
          )


          }}})
        }
      }).catch((error) => {
        console.log(error)
        toast.error("Invalid Username or Email", {
          duration: 3000,
        });
      })
      .finally(()=>{
        showLoading(false)
      })     
    },
  });

  return (
    <>
      <div className="relative flex bg-cardBg2 dark:bg-darkcardBg2 flex-col justify-center min-h-screen overflow-x-hidden ">
      <div className="w-full p-6 m-auto bg-cardBg dark:bg-darkcardBg rounded-md shadow-xl sm:max-w-xl border border-cardBorder dark:border-darkcardBorder ">
      
        <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
      <DynamicLogo/> 
        </h1>
        <h2 className="text-xl mt-1 font-semibold text-center text-text1 dark:text-text2">
          Forget Password
        </h2>
        <div className="mt-6">

           <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="Username"
              name="username"
              type="text"
              ref_={usernames}
            />


          <Input 
          formik={formik}
          Icon={<MdEmail/>}
          name="email"
          title="Email"
          type={"email"}      

          />


          
          <div className="mt-6 gap-10 w-full justify-center flex">
            <Button type="primary" text="Send Verification Mail"
            on width="full" icon={<Send className="-mt-1" />} onClick={formik.handleSubmit}
            />
            <Button type="secondary" text="Back to Login" 
            onClick={(e) => {
              navigate('/login')
            }}
            width="full" icon={<ArrowLeftCircle className="-mt-1"/>} />
          </div>
        </div>
       
       
      </div>
      
    </div>
     {/* <Footer/> */}
    </>

  );
};

export default ForgetPassword;
