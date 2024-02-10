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
    <div className={`flex bg-cardBg2 dark:bg-darkcardBg  w-full font-primary_font justify-center items-center  m-auto overflow-auto max-sm:w-full mt-10`}>
    <div className='flex justify-evenly w-full m-auto flex-wrap gap-10  mb-20'>
    <span className="w-full flex justify-center text-3xl text-center text-text1 dark:text-text2">Settings</span>

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
      textColor='#20d7f5'
      bgColor='#daf3f7'
      />

      <Card
      title="Reset"
      description="Reset settings to default."
      Icon={MdResetTv}
      onClick={() => navigate("/settings/account")}
      textColor='#e84343'
      bgColor='#e9eff7'
      />
    </div>


      
    
    
   </div>
   
    )
}

export default MainSettings