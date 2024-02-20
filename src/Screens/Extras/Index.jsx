import React from 'react'
import Card from '../../components/Card/Card'
import { FaBell } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { hideAlertModal, showModal } from '../../components/Alert/Alert';
import Cookies from 'js-cookie';

const Index = () => {
   const navigate = useNavigate();
   const logOut = () => {
      showModal({
         type: "warning",
         title: "Logout",
         message: "Are you sure you want to log out?",
         buttons: [
           {
             title: "Yes",
             onclick: () => {
               Cookies.remove("access");
               Cookies.remove("refresh");
               navigate("/login");
               hideAlertModal();
               window.location.reload();
             },
           },
           {
             title: "No",
             onclick: () => {
               navigate("/");
               hideAlertModal();
             },
           },
         ],
         outSideAction: true,
       })
   }
  return (
   <div className={`flex bg-cardBg2 dark:bg-darkcardBg  w-full font-primary_font justify-center items-center  m-auto overflow-auto max-sm:w-full mt-10`}>
   <div className='flex justify-evenly w-full m-auto flex-wrap gap-10  mb-20'>

   <span className="w-full flex justify-center text-3xl text-center text-text1 dark:text-text2">Extras</span>

   <Card
   title={"Notification"}
   description="Navigate to notification page."
   Icon={FaBell}
   onClick={() => navigate("/notifications")}
   textColor='#ab89e3'
   bgColor='#f0e9f7'
   />

   {/* for friends page */}
   <Card
   title={"Friends"}
   description="Navigate to friends page."
   Icon={FaBell}
   onClick={() => navigate("/friends")}
   textColor='#DDB21A'
   bgColor='#F6F1DD'
   />

   {/* for settings page */}
   <Card
   title={"Settings"}
   description="Navigate to settings page."
   Icon={FaBell}
   onClick={() => navigate("/settings")}
   textColor='#20d7f5'
   bgColor='#daf3f7'
   />

   {/* for help page open new page for google forms https://forms.gle/62bNLAB69RpbpZ5d9 */}
   <Card
   title={"Help"}
   description="Navigate to help page."
   Icon={FaBell}
   onClick={() => window.open("https://forms.gle/62bNLAB69RpbpZ5d9", "_blank")}
   textColor='#e84343'
   bgColor='#e9eff7'
   />

   {/* For logout */}
   <Card
   title={"Logout"}
   description="Logout from your account."
   Icon={FaBell}
   onClick={logOut}
   textColor='#e84343'
   bgColor='#e9eff7'
   />
      

    </div>
    </div>

  )
}

export default Index