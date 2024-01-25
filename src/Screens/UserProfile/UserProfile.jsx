import React from 'react'
import Sidebar  from '/src/components/Sidebar/Sidebar';
import OurProfile from '../Profile/OurProfile';
import OtherUserProfile from './UserProfileComponent';

const UserProfile = () => {
  return (
<div className="flex h-screen">
    <div className={` block duration-300 z-20 ${open ? "w-1/5":" w-1/12"}`}>
        <Sidebar className=""/>
    </div>
        <div className={`block duration-300 ${open ? "w-4/5":" w-10/12"} ml-10 mt-5`}>
     
        <OtherUserProfile />
  

        <div className="flex">
        <h1 className=" text-3xl mx-auto -mt-48">Posts</h1>
        </div>
        </div>


    </div>  )
}

export default UserProfile