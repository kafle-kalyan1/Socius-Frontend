import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Aboutme, Gender } from "/src/Library/Icons/Icons";
import Input from "/src/components/Input/Input";
import DynamicLogo from "/src/DynamicLogo";
import { useEffect } from "react";
import SelectInput from "/src/components/Select/Select";
import DatePicker from "/src/components/DatePicker/DatePicker";
import ImageUploader from "/src/components/FileUploader/ImageUploader";
import FileUploader from "/src/components/FileUploader/FileUploader";

import { MailOutlined,UserOutlined,LockOutlined, EyeOutlined, EyeInvisibleOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import TextArea from "/src/components/Input/TextArea";
import Loading,{showLoading} from "/src/components/Loading/Loading";
import { useLocation } from "react-router-dom";
import { showOtpModal } from '/src/components/Alert/OtpAlert';

const SetupAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  useEffect(() => {
  if(data == null) navigate('/login')
  }, [])
  // eslint-disable-next-line react/prop-types
  useEffect(() => {
    if (!data.email || !data.username) {
     navigate('/login')
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: data?.email,
      password: data?.password,
      username: data?.username,
      dob: "",
      bio: "This is my awesome bio.",
      profile_pic: "",
      gender: null,
      secondary_email: "",
      phone_number: "",
      others_link: [],
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
      showOtpModal({title:"Verify OTP", message:"Enter the OTP sent to your email", icon:"", link:"",values:"", submit:{title:"Verify", action:()=>{console.log("OTP Verified")}}})
    },
  });

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-x-hidden max-sm:block ">
        <div className="w-full p-6 m-auto bg-cardBg rounded-md shadow-xl sm:max-w-xl dark:bg-dark_cardBg border ">
          <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
            <DynamicLogo />
          </h1>
          <h4 className="text-sm font-bold text-center text-primary">
            Setup Account
          </h4>
          <p className="text-sm text-center text-gray-500">
            Hi {data?.username} !
          </p>
          <form onSubmit={formik.handleSubmit}>
         <ImageUploader formik={formik} title={"Profile Picture"} Icon={<UserOutlined />} name={"profile_pic"} max={1}/>

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
          {/* {console.log(formik.values)} */}
          <DatePicker
          Icon = {<CalendarOutlined />}
            formik={formik}
            title="Date"
            name="dob"
            maxDate={Date.now()}
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
    </>
  );
};

export default SetupAccount;
