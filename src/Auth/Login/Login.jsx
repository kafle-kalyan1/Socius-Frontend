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


const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const usernames = useRef();
  const navigate = useNavigate();
  const { fetchProfileData } = useContext(ProfileContext);
  useEffect(() => {
    usernames.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,"Password must contain at least one uppercase letter, one lowercase letter and one number"),
    }),
    onSubmit: (values) => {
      showLoading(true)
      // var enc_password = EncryptString(values.password)
      axios.post("api/auth/login/", {
        username: values.username,
        password: values.password,
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          toast.success("Loggedin Successfully", {
            duration: 3000,
          });
          const { access, refresh } = res.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh);
          Cookies.set("username", values.username);
          fetchProfileData(access);
          window.location.href= '/'
        }
      else{
        toast.error(res.data.message, {
          duration: 3000,
        });
      }
      }).catch((err) => {
         if (err.request.status === 422) {
          toast.error("Please Verify your email before login \n Verification link has been sent to your email", {
            duration: 3000,
          });
          const email = err.response.headers.email;
          showOtpModal({title:"Verify OTP", message:"Enter the OTP sent to your email", icon:"", link:"Didn't get otp",data:{email:email, username:values.username, password:values.password}, submit:{title:"Verify", action:({data,hide})=>{
            axios.post("api/auth/verify/", data).then((res) => {
              if (res.status === 202) {
                toast.success(res.data.message, {
                  duration: 3000,
                });
                hide();
                // navigate("/login");
              } else {
                toast.error(res.data.message, {
                  duration: 3000,
                });
              }
            }).catch((err) => {
              if (err.res.status == 403) {
                hide();
              }
              toast.error(err.response?.data?.message ? err.response?.data?.message: "Something went wrong", {
                duration: 3000,
              });
            }).finally(() => {
              showLoading(false)
            });
          }}})
                  }
      else if (err.request.status === 401) {
        toast.error("Login Failed Invalid username or password", {          
          duration: 3000,
        });
      }
      else{
        toast.error("Login Failed Something went wrong", {
          duration: 3000,
        });
      }
       
    }).finally(() => {
      showLoading(false)
    });
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
          Sign in
        </h2>
        <form className="mt-6" onSubmit={formik.handleSubmit}>

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
          Icon={<LockOutlined/>}
          name="password"
          title="Password"
          type={"text"}
          haveHideView={true}

       

          />
          <Link
            to="/forgetPassword"
            title="Reset Password here!"
            className="text-xs text-text1 dark:text-text2 focus:text-red_text hover:text-red_text dark:hover:text-red_text duration-100 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-6 w-full justify-center flex">
            <Button type="primary" text="Login" width="full" icon={<FaLockOpen/>} />
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-2 bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2">Or Login With</div>
        </div>
        <span></span>
        <div className="flex mt-4 gap-x-2 max-sm:flex-col max-sm:gap-y-2">
          <button
            type="button"
            title="Login with Google"
            className="flex items-center justify-center w-full p-2 border border-border rounded-md
              bg-green_bg hover:bg-green_bg_hover duration-500 text-green_text "
          >
            <span className="text-xl">Google</span>
            <GoogleIcon />
          </button>
          <button
            title="Login with Facebook"
            className="flex items-center justify-center w-full p-2 border border-border rounded-md 
             bg-blue_bg hover:bg-blue_bg_hover text-blue_text duration-500"
            // focus:ring-2 focus:ring-offset-1 focus:ring-secondary
          >
            <span className="text-xl">Facebook</span>
            <FacebookIcon/>
          </button>
          <button 
          title="Login with Github"
          className="flex items-center justify-center w-full p-2 border border-border rounded-md 
           bg-red_bg hover:bg-red_bg_hover text-red_text  duration-500"
          // focus:ring-2 focus:ring-offset-1 focus:purple-secondary
           >
            <span className="text-xl">Github</span>
            <GithubIcon />
          </button>
        </div>

        <p className="mt-8 text-2xs font-light text-center text-text1 dark:text-text2">
          {" "}
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-main_text hover:underline">
           <b>

            Register Now?
           </b>
          </Link>
        </p>
       
      </div>
      
    </div>
     {/* <Footer/> */}
    </>

  );
};

export default Login;
