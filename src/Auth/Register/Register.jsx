/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

//icons import
import {
  EmailIcon,
  PasswordIcon,
  GoogleIcon,
  FacebookIcon,
  GithubIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  UserIcon,
  OtpIcon,
} from "/src/Library/Icons/Icons";
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Loading, { showLoading } from "/src/components/Loading/Loading";

import Footer from "/src/components/Footer/Footer";

import TermsModal from "/src/Auth/Others/TermsModal";
import { toast } from "react-hot-toast";
import Input from "/src/components/Input/Input";
import { showOtpModal } from "/src/components/Alert/OtpAlert";
import axios from "axios";
import DynamicLogo from "/src/DynamicLogo";
import SelectInput from "/src/components/Select/Select";
import { Gender } from "/src/Library/Icons/Icons";
import DatePicker from "/src/components/DatePicker/DatePicker";
import { CalendarOutlined } from "@ant-design/icons";
import Button from "/src/components/Button/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import ReactFacebookLogin from "react-facebook-login";
import { FaGenderless } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [isOTP, setIsOTP] = useState(null);
  const [isTermsShown, setIsTermsShown] = useState(false);

  const navigate = useNavigate();

  const signUpWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log(credentialResponse);
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${credentialResponse.access_token}`,
          },
        })
        .then((res) => res.data);

      console.log(userInfo);
    },
    onError: (error) => console.log(error),
  });

  const signUpWithFacebook = () => {
    console.log("fb");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      fullname: "",
      password: "",
      gender: null,
      dob: "",
      terms: false,
      profile_picture: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string().required("Username is required"),
      fullname: Yup.string().required("Fullname is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter and one number"
        ),
      gender: Yup.string().required("Gender is required"),
      dob: Yup.date("Please enter valid date")
        .required("Date of Birth is required")
        .max(new Date(), "Date of Birth cannot be in future"),
    }),
    onSubmit: (values) => {
      if (values.terms === true) {
        toast.error("Please accept the terms and conditions to continue", {
          description: "",
          duration: 3000,
        });
        setIsTermsShown((p) => !p);
      } else {
        showLoading(true);
        axios
          .post("api/auth/register/", values)
          .then((res) => {
            if (res.status === 201) {
              showLoading(false);
              showOtpModal({
                title: "Verify OTP",
                message: "Enter the OTP sent to your email",
                icon: "",
                link: "Didn't get otp",
                data: {
                  email: values.email,
                  username: values.username,
                  password: values.password,
                },
                submit: {
                  title: "Verify",
                  action: ({ data, hide }) => {
                    axios
                      .post("api/auth/verify/", data)
                      .then((res) => {
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
                      })
                      .catch((err) => {
                        if (res.status == 403) {
                          hide();
                        }
                        toast.error(
                          err.response?.data?.message
                            ? err.response?.data?.message
                            : "Something went wrong",
                          {
                            duration: 3000,
                          }
                        );
                      })
                      .finally(() => {
                        showLoading(false);
                      });
                  },
                },
              });
            } else {
              toast.error(res.data.message, {
                duration: 3000,
              });
            }
          })
          .catch((err) => {
            toast.error(
              err.response?.data?.message
                ? err.response?.data?.message
                : "Something went wrong",
              {
                duration: 3000,
              }
            );
          })
          .finally(() => {
            showLoading(false);
          });
      }
    },
  });

  useEffect(()=>{
    formik.setFieldValue("profile_picture",`https://ui-avatars.com/api/?background=random&name=${formik.values.fullname}&size=128`)
  },[formik.values.fullname])

  return (
    <>
      {isTermsShown ? (
        <TermsModal
          isShown={isTermsShown}
          setIsShown={setIsTermsShown}
          terms={formik.values.terms}
          change={formik.handleChange}
        />
      ) : null}

      <div className="flex flex-col justify-center w-full mt-4 bg-cardBg2 dark:bg-darkcardBg2 min-h-screen mb-8 ">
        <div className="w-full p-10 m-auto bg-cardBg dark:bg-darkcardBg rounded-md shadow-xl sm:max-w-xl border border-cardBorder dark:border-darkcardBorder">
          <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
            <DynamicLogo />
          </h1>

          <h3 className="text-sm mt-3 font-semibold text-center text-text1 dark:text-text2">
            By signing up, you agree to our
            <br />
            <p
              onClick={() => setIsTermsShown((p) => !p)}
              className="font-medium text-raretext hover:underline mt-1 cursor-pointer"
            >
              Terms and Conditions
            </p>
          </h3>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <Input
              formik={formik}
              Icon={<MailOutlined />}
              title="Email"
              name="email"
              type="email"
            />
            <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="Username"
              name="username"
              type="text"
            />
            <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="Fullname"
              name="fullname"
              type="text"
            />
            <Input
              formik={formik}
              Icon={<LockOutlined />}
              name="password"
              title="Password"
              type={"text"}
          haveHideView={true}
            />
            <SelectInput
              formik={formik}
              Icon={<BsGenderAmbiguous />}
              title="Select an Gender"
              name="gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "others", label: "Others" },
              ]}
              value={formik.values.gender}
            />
            <DatePicker
              Icon={<CalendarOutlined />}
              formik={formik}
              title="Date of Birth"
              name="dob"
              maxDate={Date.now()}
            />
            {/* <Link
              to="#"
              title="Reset Password here!"
              className="text-xs text-text1 dark:text-text2 focus:text-red-500 hover:text-red-500 hover:underline"
            >
              Forget Password?
            </Link> */}
            <div className="mt-6 w-full justify-center flex">
              {/* <button
                type="submit"
                className="w-full  px-4 py-2 tracking-wide text-dark_textPrimary dark:text-dark_textPrimary transition-colors duration-200 transform bg-primary rounded-md hover:bg-buttonHover focus:outline-none focus:bg-primary_hover"
              >
                Register
              </button> */}
              <Button
                type="primary"
                text="Register"
                onClick={formik.handleSubmit}
              />
            </div>
          </form>
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-2 bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2">
              Or Register With
            </div>
          </div>
          <span></span>
          <div className="flex mt-4 gap-x-2 max-sm:flex-col max-sm:gap-y-2">
            <button
              onClick={() => signUpWithGoogle()}
              type="button"
              title="Register with Google"
              className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md
             bg-green_bg hover:bg-green_bg_hover text-green_text duration-500"
            >
              <GoogleIcon />
              <span className="text-xl">Google</span>
            </button>
              <div className="w-full">
            <ReactFacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APP_ID}
              cssClass="flex items-center justify-center w-full p-2 text-xl bg-blue_bg hover:bg-blue_bg_hover text-blue_text border border-gray-600 rounded-md 
             bg-[#dfe7f1] hover:bg-[#b8c0cb] duration-500"
              fields="name,email,picture"
              textButton=" Facebook"              
              icon={<FacebookIcon />}
              onClick={() => signUpWithFacebook()}
            />
              </div>
{/* 
            <button
              onClick={() => {}}
              title="Register with Github"
              className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md 
           bg-[#e9e0e0] hover:bg-[#d5c8c8]  duration-500"
            >
              <GithubIcon />
              <span>Github</span>
            </button> */}
          </div>

          <p className="mt-8 text-2xs font-light text-center text-text1 dark:text-text2">
            {" "}
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-main_text hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;
