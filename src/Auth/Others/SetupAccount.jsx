import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Aboutme, Gender } from "/src/Library/Icons/Icons";
import Input from "/src/components/Input/Input";
import DynamicLogo from "/src/DynamicLogo";
import { useEffect, useState } from "react";
import SelectInput from "/src/components/Select/Select";
import DatePicker from "/src/components/DatePicker/DatePicker";
import ImageUploader from "/src/components/FileUploader/ImageUploader";
import FileUploader from "/src/components/FileUploader/FileUploader";

import { MailOutlined, UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import TextArea from "/src/components/Input/TextArea";
import Loading, { showLoading } from "/src/components/Loading/Loading";
import { useLocation } from "react-router-dom";
import { showOtpModal } from '/src/components/Alert/OtpAlert';
import FormSkeleton from "./SetupSkeleton";
import axios from "axios";
import Cookies from "js-cookie";
import {Cloudinary} from "@cloudinary/url-gen";
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import toast from "react-hot-toast";
import { hideBigPopup } from "../../components/BigPopup/BigPopup";

const SetupAccount = () => {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let accessToken = Cookies.get("access");
    axios.get("api/auth/user/", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      setUserData(res.data.data);
      formik.setValues({
        dob: new Date(res.data.data.date_of_birth + "T00:00:00.000Z"),
        bio: res?.data?.data.bio,
        gender: res?.data?.data.gender,
        secondary_email: res?.data?.data.secondary_email,
        phone_number: res?.data?.data.phone_number,
        fullname: res?.data?.data.fullname,
        first_name: res?.data?.data.first_name,
        last_name: res?.data?.data.last_name,
      })

      setLoading(false);
    }
    ).catch((err) => {
      console.log(err)
      setLoading(false);
    })

  }, [])

  const formik = useFormik({
    initialValues: {
      dob: "",
      bio: "",
      gender: null,
      secondary_email: "",
      phone_number: "", 
      fullname: "",
      first_name: "",
      last_name: "",
    },
    validationSchema: Yup.object({
      dob: Yup.date("Please enter valid date").required("Date of Birth is required").max(new Date(), "Date of Birth cannot be in future"),
      gender: Yup.string().required("Gender is required"),
      secondary_email: Yup.string().email("Invalid email address"),
      phone_number: Yup.string().matches(
        /^(\+\d+[\-\s]?)?[0]?\d{10,}$/,
        "Invalid phone number"
      ),
    }),
    onSubmit: (values) => {
      const acess = Cookies.get("access");
      axios.post('/api/auth/update/',values,{
        headers: {
          Authorization: `Bearer ${acess}`
        },
      },).then((res) => {
        toast.success('Profile Updated successfully')
      hideBigPopup()
      window.location.reload();
    }
      ).catch((err) => {
        toast.error(err)
        console.log(err);
      })
    },
  });

  return (<>
    {
      loading ? (<FormSkeleton />) : (
        <div className="relative mt-2 flex flex-col justify-center min-h-screen overflow-x-hidden max-sm:block w-full">
          <div className="w-full p-12 m-auto bg-cardBg rounded-md shadow-xl sm:max-w-xl dark:bg-dark_cardBg border ">
            <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
              <DynamicLogo />
            </h1>
            <h4 className="text-sm font-bold text-center text-primary">
              Setup Account
            </h4>
            <p className="text-sm text-center text-gray-500">
              Hi  !
            </p>
            <form onSubmit={formik.handleSubmit}>

              <TextArea
                formik={formik}
                Icon={<Aboutme />}
                title="Bio"
                name="bio"
                type="text"
              />
              <Input
                formik={formik}
                Icon={<MailOutlined />}
                title="Secondary Email"
                name="secondary_email"
                type="email"
              />
              <Input
                formik={formik}
                Icon={<PhoneOutlined />}
                title="Phone Number"
                name="phone_number"
                type="text"
              />

              <SelectInput
                formik={formik}
                Icon={<Gender />}
                title="Select an Gender"
                name="gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "others", label: "Others" },
                ]}
                value={formik.values.gender}
              />
              

              <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="Full Name"
              name="fullname"
              type="text"
              />

              <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="First Name"
              name="first_name"
              type="text"
              />

              <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="Last Name"
              name="last_name"
              type="text"
              />

              <button
                type="submit"
                className="w-full  px-4 py-2 tracking-wide text-dark_textPrimary dark:text-dark_textPrimary transition-colors duration-200 transform bg-primary rounded-md hover:bg-buttonHover focus:outline-none focus:bg-primary_hover"
              >
                Save Info
              </button>

            </form>
          </div>
        </div>
      )
    }
  </>
  );
};

export default SetupAccount;
