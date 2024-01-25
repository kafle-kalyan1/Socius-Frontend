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



const ChangePassword = () => {
  
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
    onSubmit: (values) => {
      axios.post("api/auth/changePassword/", values, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }).then((res) => {
        toast.success("Password changed successfully");
        hideBigPopup();
      }).catch((err) => {
        console.log(err)
        toast.error("Something went wrong");
      })
    }
  })



  return (
    <>
    <div className="relative mt-2 flex flex-col justify-center min-h-screen overflow-x-hidden max-sm:block w-full">
    <div className="w-full p-12 m-auto bg-cardBg rounded-md shadow-xl sm:max-w-xl dark:bg-dark_cardBg border ">
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
            
            <Button type="primary" text="Change Password" />
          </form>
        



    </div>
    </div>
    </>
  )
}

export default ChangePassword