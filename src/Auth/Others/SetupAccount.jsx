/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { Aboutme, Gender } from "/src/Library/Icons/Icons";
import Input from "/src/components/Input/Input";
import DynamicLogo from "/src/DynamicLogo";
import { useEffect, useState } from "react";
import SelectInput from "/src/components/Select/Select";
import { MailOutlined, UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import TextArea from "/src/components/Input/TextArea";
import FormSkeleton from "./SetupSkeleton";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { hideBigPopup } from "../../components/BigPopup/BigPopup";
import Button from "../../components/Button/Button";
import { Save, SaveIcon } from "lucide-react";
import { FaSave } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { MdFemale, MdMale, MdTransgender } from "react-icons/md";
import APICall from "../../Library/API/APICall";


const SetupAccount = ({getOwnPosts,
  getUserProfile,
  fetchProfileData}) => {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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
    }),
    onSubmit: async (values) => {
    //   const acess = Cookies.get("access");
    //   axios.post('/api/auth/update/',values,{
    //     headers: {
    //       Authorization: `Bearer ${acess}`
    //     },
    //   },).then(() => {
    //     toast.success('Profile Updated successfully')
    //   window.location.reload();
    // }
    //   ).catch((err) => {
    //     toast.error(err)
    //     console.log(err);
    //   })

      var response = await APICall('/api/auth/update/', 'post', values)
      console.log(response) 
      if(response.status == 200){
        toast.success('Profile Updated successfully')
        hideBigPopup('profile-setup');
        getOwnPosts();
        getUserProfile();
        fetchProfileData();
      }
      else{
        toast.error('Something went wrong')
      }
    },
  });

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
      setLoading(false);
    })

  },[])



  return (<>
    {
      loading ? (<FormSkeleton />) : (
        <div className="flex flex-col mx-auto bg-cardBg dark:bg-darkcardBg rounded-md h-fit p-8 my-0 space-y-4 w-[40vw] max-md:w-full">
        <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
          <DynamicLogo />
        </h1>
            <h4 className="text-sm font-bold text-center text-primary">
              Setup Account
            </h4>
            <p className="text-sm text-center text-gray-500">
              Hi  {formik.values.fullname}!
            </p>
              <TextArea
                formik={formik}
                Icon={<FaUserPen />}
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
                Icon={formik.values.gender == 'male' ? <MdMale/> : formik.values.gender == 'female' ? <MdFemale/> : <MdTransgender/>}
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
  <br />
              <Button
              type="primary"
              text="Save"
              icon={<FaSave/>}
              onClick={()=>formik.handleSubmit(formik.values)}
              />

        </div>
      )
    }
  </>
  );
};

export default SetupAccount;
