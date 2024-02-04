import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';
import { Select } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { SearchCheck, SearchX } from 'lucide-react';
import { BsSearch } from 'react-icons/bs';
import CustomSegmentedControl from '../../components/Tabs/Tabs';
import Profile from './Profile';
import Post from './Post';


const Search = () => {
   const { isMobile } = useContext(MenuContext);
   const { profile } = useContext(ProfileContext);
   const searchRef = useRef(null);

   useEffect(() => {
      searchRef.current?.focus();
   }, []);

   const formik = useFormik({
      initialValues: {
        search: "",
        type:"all",
        page:1,
      },
      onSubmit: (values) => {
        //do something
      },
    });

    const searchType = [
      { value: "all", label: "All" },
      { value: "user", label: "User" },
      { value: "post", label: "Post" },
    ]


      const [activeSection, setActiveSection] = useState("users");
      const handleSectionChange = (value) => {
        setActiveSection(value);
      };


   return (
      <div className={`flex mt-8`}>
      <div className={` block overflow-auto scroll-bar w-5/6 h-screen font-primary_font justify-center items-center max-lg:w-full m-auto ml-[5%] max-sm:ml-5 max-sm:w-full`}>
      
      <div className="max-md:w-full max-sm:w-full mb-5">
         {/* Search  */}
         <input type="search"
            placeholder="Search"
            ref={searchRef}
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-4/6 mx-5 h-10 px-3 rounded-md bg-gray-200 text-sm focus:outline-none z-20 border-2 border-cardBorder hover:border-deep_primary_text focus:border-deep_primary_text"
            autoComplete="off"
         />
         <button type="submit"
            onClick={formik.handleSubmit}
            className=" bg-primary_btn_dark p-2 mx-2 rounded-md cursor-pointer text-white hover:bg-primary_btn_dark_hover hover:duration-200 z-20"
         >
         <span className='flex gap-2'> 
         <BsSearch />
         Search
         </span>
         </button>

         <Select
            showSearch
            style={{ width: 150, height: 40}}
            placeholder="Search"
            defaultValue={formik.values.type}
            optionFilterProp="children"
            className='mx-2'
            options={searchType}
            onChange={(value) => formik.setFieldValue("type", value)}
         />
         

      </div>

     {
      formik.values.type == "all" && (<>
         <CustomSegmentedControl
          options={[
            { label: "Users", value: "users" },
            { label: "Posts", value: "post" },
          ]}
          value={activeSection}
          onChange={(e) => handleSectionChange(e)}
        />
        {activeSection === 'users' && <Profile />}
      {activeSection === 'post' && <Post />}
      </>)
     }

      {formik.values.type == "user" && <Profile />}
      {formik.values.type == "post" && <Post />}
      </div>

      </div>
   );
};

export default Search;
