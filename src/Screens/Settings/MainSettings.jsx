import { useContext, useState } from 'react';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';
import { Card, Skeleton, Checkbox } from 'antd';
import Button from '/src/components/Button/Button';
import { defaultProfilePic } from '../../Library/Others/Others';
import { CheckCheck, PenIcon } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { hideBigPopup, showBigPopup } from '../../components/BigPopup/BigPopup';
import SetupAccount  from '/src/Auth/Others/SetupAccount';
import APICall from '../../Library/API/APICall';
import toast from 'react-hot-toast';
import { MenuContext } from '/src/context/MenuContext/MenuContext';

const MainSettings = () => {
  
  const { profile, fetchProfileData } = useContext(ProfileContext);
  const [theme, setTheme] = useState('auto');
  const {isMobile} = useContext(MenuContext);
  const [userData, setUserData] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await APICall("/api/auth/user/", "GET", {});
      setUserData(response.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handleThemeChange = (value) => {
    setTheme(value);
    // You can implement the logic to change the theme here
  };

  const editProfile = () => {
    showBigPopup({
         onClose: () => {
         hideBigPopup('profile-setup')
         },
         children:
         (
             <SetupAccount getOwnPosts={null} getUserProfile={getUserProfile} fetchProfileData={fetchProfileData}/>
         ),
         id:"profile-setup"
 })

 }

  return (
    <div className="flex justify-center mt-12 bg-cardBg2 dark:bg-darkcardBg2">
      <div className="w-full max-w-3xl">
        <Card className="p-4 bg-cardBg dark:bg-darkcardBg shadow-md dark:shadow-cardBg2">
          <div className="flex items-center space-x-4">
            <img
              alt="Avatar"
              className="rounded-full"
              src={profile?.profile_picture || defaultProfilePic}
              style={{ width: 40, height: 40, objectFit: 'cover' }}
            />
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold leading-none">{profile.fullname}</h2>
                <Button
                 text={isMobile ? "" : "Edit Profile"}
                 type="primary" icon={<PenIcon/>} 
                onClick={editProfile}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome to your account settings. Here you can update your settings.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mt-4 p-4 bg-cardBg dark:bg-darkcardBg shadow-md dark:shadow-cardBg2">
          <h3 className="text-xl font-bold mb-4">Mode/Theme</h3>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
            <div className={`border cursor-pointer p-4 rounded-md ${theme === 'dark' && 'border-blue-500'}`} onClick={()=>  handleThemeChange('dark')}>
              <h4 className="mb-2 flex">Dark
              {theme === 'dark' && <FaCheckCircle className="text-main_text m-2" />}</h4>
              <Skeleton
                active
                loading={true}
                className="bg-gray-700 text-text2"
                paragraph={{ rows: 6 }}
                title={false}
              />
            </div>
            <div className={`border cursor-pointer p-4 rounded-md ${theme === 'light' && 'border-blue-500'}`} onClick={()=> handleThemeChange('light')}>
              <h4 className="mb-2 flex">Light              {theme === 'light' && <FaCheckCircle className="text-main_text m-2" />}</h4>

              <Skeleton
                active
                loading={true}
                className="bg-white text-text1"
                paragraph={{ rows: 6 }}
                title={false}
              />
            </div>
            <div className={`border cursor-pointer p-4 rounded-md ${theme === 'auto' && 'border-blue-500'}`} onClick={()=> handleThemeChange('auto')}>
              <h4 className="mb-2 flex">Auto
              {theme === 'auto' && <FaCheckCircle className="text-main_text m-2" />}</h4>
              <Skeleton
                active
                loading={true}
                className="bg-gray-700 text-text2"
                paragraph={{ rows: 3 }}
                title={false}
              />
              <Skeleton
                active
                loading={true}
                className="bg-white text-text1"
                paragraph={{ rows: 3 }}
                title={false}
              />
               
            </div>
          </div>
        </Card>

       
        {/* floating save Button */}
        <div className="fixed bottom-8 right-8 max-md:bottom-24">
          <Button text="Save" type="primary" />
          </div>
      </div>
    </div>
  );
};

export default MainSettings;
