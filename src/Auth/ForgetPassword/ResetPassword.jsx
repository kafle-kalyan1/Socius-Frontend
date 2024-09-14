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
import { useNavigate } from 'react-router-dom';



const ResetPassword = ({data}) => {
   console.log(data)
  const formik = useFormik({
    initialValues: {
      otp: data.otp,
      password: "",
      confirm_password: "",
      username: data.username,
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required").min(6, "OTP must be at least 6 characters"),
      
      password: Yup.string().required("New Password is required").min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,"Password must contain at least one uppercase letter, one lowercase letter and one number"),

      confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').min(6, "Password must be at least 6 characters")
         .required("Password is required")
         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,"Password must contain at least one uppercase letter, one lowercase letter and one number"),
          
      username: Yup.string().required("Username is required")
      }),
    onSubmit: (values) => {
      axios.post("https://socius.onrender.com/auth/resetPassword/", values).then((res) => {
        toast.success("Password updated successfully");
        hideBigPopup('resetPassword');
      }).catch((err) => {
         toast.error(err.response.data.message)
        hideBigPopup('resetPassword');
      })
    }
  })



  return (
    <div className="relative mt-2 flex flex-col justify-center min-h-screen overflow-x-hidden max-sm:block w-full dark:bg-darkcardBg2">
    <div className="w-full p-12 m-auto bg-cardBg rounded-md shadow-xl sm:max-w-xl dark:bg-darkcardBg border ">
            <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
              <DynamicLogo />
            </h1>
            <h4 className="text-sm font-bold text-center text-primary">
              Change Password
            </h4>

            <form onSubmit={formik.handleSubmit}>
            <Input
              formik={formik}
              Icon={<LockOutlined/>}
              type="text"
              title="New Password"
              name="password"
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
            <Button type="primary" text="Reset Password"
            onClick={formik.handleSubmit}
             />
          </form>
        



    </div>
    </div>
  )
}

export default ResetPassword