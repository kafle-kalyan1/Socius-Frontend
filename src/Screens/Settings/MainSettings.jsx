import React, { useContext } from 'react'
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import Sidebar from './Sidebar';
import { MdNotifications, MdOfflineBolt, MdPermContactCalendar, MdResetTv } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCog } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import { AlignEndVerticalIcon, BellRing } from 'lucide-react';

const MainSettings = () => {
   const { isMobile } = useContext(MenuContext);
   const navigate  = useNavigate();

  return (
    <div className={`flex w-full font-primary_font justify-center items-center  m-auto overflow-auto max-sm:w-full mt-10`}>
    {/* <Sidebar /> */}
    <div className='flex justify-evenly w-full m-auto flex-wrap gap-10  mb-20'>
    <span className="w-full flex justify-center text-3xl text-center">Settings</span>

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
    <Card 
      title="Notification"
      description="Notification settings for posts, messages, etc."
      Icon={FaBell}
      onClick={() => navigate("/settings/general")}
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
   
    )
}

export default MainSettings