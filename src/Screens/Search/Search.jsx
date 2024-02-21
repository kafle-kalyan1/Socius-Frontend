import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';
import { Select } from 'antd';
import { FaSearch, FaUser } from 'react-icons/fa';
import { SearchCheck, SearchX } from 'lucide-react';
import { BsSearch } from 'react-icons/bs';
import CustomSegmentedControl from '../../components/Tabs/Tabs';
import Profile from './Profile';
import RecPost from './Post';
import { TbUserSearch } from "react-icons/tb";
import { BsPostcard } from "react-icons/bs";
import APICall from '../../Library/API/APICall';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Search = () => {
   const { isMobile } = useContext(MenuContext);
   const { profile } = useContext(ProfileContext);
   const searchRef = useRef(null);
    const [profileData, setProfileData] = useState(null);
    const [post, setPost] = useState(null);

    const location = useLocation();
    const formik = useFormik({
      initialValues: {
        search: "",
        type:"all",
        page:1,
      },
      onSubmit: (values) => {
        getProfiles(values.search,values.type);
      },
    });

    useEffect(() => {
      searchRef.current?.focus(); 
      formik.setFieldValue('type', "all");  
   }, []);

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get('q');
      const type = queryParams.get('type');
  
      if (q !== null) {
        formik.setFieldValue('search', q);
      }
  
      if (type !== null) {
        formik.setFieldValue('type', type);
      }
  
      getProfiles(formik.values.search, formik.values.type);
    }, [location.search]);


    const searchType = [
      { value: "all", label: "All" },
      { value: "users", label: "User" },
      { value: "posts", label: "Post" },
    ]

   useEffect(() => {
    getProfiles(formik.values.search,formik.values.type);
  }, [formik.values.search, formik.values.type]);

  const getProfiles = async (text, type) => {
    if(text != null && text.trim() != ""){
      try {
        const response = await APICall(`/api/utils/search/?keyword=${text}&type=${type}`, "GET", {});
        setProfileData(response.data.user_data);
        setPost(response.data.post_data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    else{
      setProfileData(null);
      setPost(null);
    }
  }




      const [activeSection, setActiveSection] = useState("users");
      const handleSectionChange = (value) => {
        setActiveSection(value);
      };


   return (
      <div className={`flex flex-col bg-cardBg2 dark:bg-darkcardBg2 overflow-auto scroll-bar w-full  font-primary_font items-center max-lg:w-full h-max m-auto max-sm:w-full`}>
      <div className=' m-auto flex flex-col items-center w-5/6 bg-cardBg dark:bg-darkcardBg h-full p-10'>

      <div className="flex mt-10 gap-3 w-5/6 max-md:w-full max-sm:w-full mb-4">
         <Select
            showSearch
            style={{ width: 150, height: 40}}
            placeholder="Search"
            defaultValue={formik.values.type}
            optionFilterProp="children"
            className=''
            options={searchType}
            onChange={(value) => formik.setFieldValue("type", value)}
         />
      <input type="search"
            placeholder="Search"
            ref={searchRef}
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full  h-10 px-3 rounded-md bg-gray-200 text-sm focus:outline-none z-20 border-2 border-cardBorder hover:border-deep_primary_text focus:border-deep_primary_text"
            autoComplete="off"
         />    
         <button type="submit"
            onClick={formik.handleSubmit}
            className=" bg-primary_btn_dark p-2 rounded-md cursor-pointer text-white hover:bg-primary_btn_dark_hover hover:duration-200 z-20"
         >
         <span className='flex gap-2'> 
         <BsSearch className='mt-1'/>
         Search
         </span>
         </button>
      </div>

     {
      formik.values.type == "all" && (<>
      <div className='w-5/6 mb-4'>
         <CustomSegmentedControl
          options={[
            {icon:<TbUserSearch className='mt-1' /> ,label: "Users", value: "users" },
            {icon: <BsPostcard className='mt-1' />,label: "Posts", value: "posts" },
          ]}
          value={activeSection}
          onChange={(e) => handleSectionChange(e)}
        />
        {activeSection == 'users' && <Profile data={profileData}/>}
      {activeSection == 'posts' && <RecPost data={post} />}
      </div>

      </>)
     }
     <div className='w-5/6 mb-10'>
      {formik.values.type == "users" && <Profile data={profileData} />}
      {formik.values.type == "posts" && <RecPost data={post} />}
     </div>
      </div>

      </div>
   );
};

export default Search;
