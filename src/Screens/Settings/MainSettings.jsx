import React, { useContext } from 'react'
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import Sidebar from './Sidebar';
import { MdNotifications, MdOfflineBolt, MdPermContactCalendar, MdResetTv } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import { AlignEndVerticalIcon } from 'lucide-react';

const MainSettings = () => {
   const { isMobile } = useContext(MenuContext);
   const navigate  = useNavigate();

  return (

    <div className={`flex ${!isMobile ? " ml-32" : "ml-0"} mt-8 scroll-bar`}>
    <div className={`block lg:ml-[14%] w-4/6 h-screen font-primary_font gap-5  max-lg:w-full max-lg:m-0 m-auto max-sm:w-full mt-40`}>
    {/* <Sidebar /> */}
    <div className='flex justify-evenly w-full m-12'>
    <Card 
      title="General"
      description="General settings like theme, language, etc."
      Icon={FaCog}
      onClick={() => navigate("/settings/general")}
      />

      <Card
      title="Account"
      description="Account settings like email, password, etc."
      Icon={MdPermContactCalendar}
      onClick={() => navigate("/settings/account")}
      textColor='#DDB21A'
      bgColor='#F6F1DD'

      />
    </div>

    <div className='flex justify-evenly w-full m-12'>
    <Card 
      title="Notification"
      description="Notification settings for posts, messages, etc."
      Icon={MdNotifications}
      onClick={() => navigate("/settings/general")}
      width='32%'
      textColor='#ab89e3'
      bgColor='#f0e9f7'
      />

      <Card
      title="Advanced"
      description="Advanced settings like offline features, etc."
      Icon={MdOfflineBolt}
      onClick={() => navigate("/settings/account")}
      textColor='#2196f3'
      bgColor='rgba(33,150,243,.1)'
      />

      <Card
      title="Reset"
      description="Reset settings to default."
      Icon={MdResetTv}
      onClick={() => navigate("/settings/account")}
      textColor='#f44336'
      bgColor='rgba(244, 67, 54, 0.15)'
      />
    </div>


      
    
    
   </div>
   </div>
   
    )
}

export default MainSettings