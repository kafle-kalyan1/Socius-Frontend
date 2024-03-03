import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';
import { Card, Skeleton, Checkbox,Select, Switch } from 'antd';
import Button from '/src/components/Button/Button';
import { defaultProfilePic, useThemeDetector } from '../../Library/Others/Others';
import { CheckCheck, PenIcon } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { hideBigPopup, showBigPopup } from '../../components/BigPopup/BigPopup';
import SetupAccount  from '/src/Auth/Others/SetupAccount';
import APICall from '../../Library/API/APICall';
import toast from 'react-hot-toast';
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import { useFormik } from 'formik';
import SelectInput  from '/src/components/Select/Select';
import { showLoading } from '../../components/Loading/Loading';
import { ThemeContext } from '../../context/ThemeContext/Index';

const MainSettings = () => {
  const { profile, fetchProfileData } = useContext(ProfileContext);
  const {isMobile} = useContext(MenuContext);
  const [userData, setUserData] = useState(null);
  const { isDarkTheme,toggleTheme } = useContext(ThemeContext);
  const auto_theme = useThemeDetector();


  let data = useFormik({
    initialValues: {
      theme : "auto",
      language: "en",
      message_notifications: 'both',
      friend_request_notifications: 'both',
      post_like_notifications: 'both',
      post_comment_notifications: 'both',
      request_accepted_notifications: 'both',
      sync_post_for_offline: false,
    },
    onSubmit: (values) => {
      showLoading(true);
      var final_data = {
        dark_mode: values.theme,
        language: values.language,
        message_notification: values.message_notifications,
        friend_request_notification: values.friend_request_notifications,
        post_like_notification: values.post_like_notifications,
        post_comment_notification: values.post_comment_notifications,
        request_accepted_notification: values.request_accepted_notifications,
        sync_post_for_offline: values.sync_post_for_offline,
      }      
      APICall("/api/utils/updateSettings/", "POST", final_data)
      .then(response => {
        toast.success("Settings updated successfully");
      })
      .catch(error => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        showLoading(false);
        setDarkOrNot(values.theme)
      })
    
    },
    validate: (values) => {
      const errors = {};
      return errors;
    }

  })

  const setDarkOrNot = (value) => {
    if(value == 'dark' && !isDarkTheme ) {
       toggleTheme();
    }
    else if(value == 'light' && isDarkTheme) {
       toggleTheme();
    }
    else if(value == 'auto') {
       if(auto_theme && !isDarkTheme) {
          toggleTheme();
       }
       else  if(!auto_theme && isDarkTheme) {
          toggleTheme();
       }
    }
 }

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    let response = await APICall("/api/utils/getSettings/", "GET", {})
    data.setValues({
      theme: response.data.dark_mode,
      language: response.data.language,
      message_notifications: response.data.message_notification,
      friend_request_notifications: response.data.friend_request_notification,
      post_like_notifications: response.data.post_like_notification,
      post_comment_notifications: response.data.post_comment_notification,
      request_accepted_notifications: response.data.request_accepted_notification,
      sync_post_for_offline: response.data.sync_post_for_offline,
    });
  }

  var options = [
    { label: 'Both', value: 'both' },
    { label: 'In App', value: 'app', disabled: true },
    { label: 'Push', value: 'push', disabled: true },
    { label: 'None', value: 'none' },
  ];

  const getUserProfile = async () => {
    try {
      const response = await APICall("/api/auth/user/", "GET", {});
      setUserData(response.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handleThemeChange = (value) => {
    data.setFieldValue('theme', value);
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
    <div className="flex justify-center mt-12 bg-cardBg2 mb-10 dark:bg-darkcardBg2">
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

        <Card className="mt-1 p-4 bg-cardBg dark:bg-darkcardBg shadow-md dark:shadow-cardBg2">
        <h1 className="text-2xl font-bold text-center">General</h1>
        <h4 className='text-md mb-4 text-center'>Update your general settings.</h4>
          <h3 className="text-lg font-semibold mb-4">Mode/Theme</h3>
          <div className="grid mb-2 grid-cols-3 max-md:grid-cols-1 gap-4">
            <div className={`border cursor-pointer p-4 rounded-md ${data.values.theme === 'dark' && 'border-blue-500'}`} onClick={()=>  handleThemeChange('dark')}>
              <h4 className="mb-2 flex">Dark
              {data.values.theme === 'dark' && <FaCheckCircle className="text-main_text m-2" />}</h4>
              <Skeleton
                active
                loading={true}
                className="bg-gray-700 text-text2"
                paragraph={{ rows: 6 }}
                title={false}
              />
            </div>
            <div className={`border cursor-pointer p-4 rounded-md ${data.values.theme === 'light' && 'border-blue-500'}`} onClick={()=> handleThemeChange('light')}>
              <h4 className="mb-2 flex">Light              {data.values.theme === 'light' && <FaCheckCircle className="text-main_text m-2" />}</h4>

              <Skeleton
                active
                loading={true}
                className="bg-white text-text1"
                paragraph={{ rows: 6 }}
                title={false}
              />
            </div>
            <div className={`border cursor-pointer p-4 rounded-md ${data.values.theme === 'auto' && 'border-blue-500'}`} onClick={()=> handleThemeChange('auto')}>
              <h4 className="mb-2 flex">Auto
              {data.values.theme === 'auto' && <FaCheckCircle className="text-main_text m-2" />}</h4>
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
          <br />
          <div className="flex justify-between items-center">
        <div className='flex flex-col mb-4'>
          <h3 className="text-lg font-semibold">Language</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose Your Prefred Langauge.</p>
        </div>
          <Select
        showSearch
         style={{ width: 120 }}
         name="language"
         options={[
            { label: 'English', value: 'en',disabled: false},
            {label:'Nepali', value: 'np',disabled: true},
            { label: 'Spanish', value: 'es',disabled: true},
            { label: 'Hindi', value: 'hi',disabled: true},
         ]}
         value={data.values.language}
          onChange={(value) => data.setFieldValue('language', value)}
          onBlur={data.handleBlur('language')}
         />
        </div>
        



        </Card>


        <Card className="mt-4 p-4 bg-cardBg dark:bg-darkcardBg shadow-md dark:shadow-cardBg2">
        <h1 className="text-2xl font-bold text-center">Notification</h1>
        <h4 className='text-md mb-4 text-center'>Choose what you want to be notified about.</h4>

        <div className="flex justify-between items-center">
        <div className='flex flex-col mb-4'>
          <h3 className="text-lg font-semibold">Message Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose how you want to be notified about messages.</p>
        </div>
          <Select
          showSearch
          defaultValue="both"
          style={{ width: 120 }}
          options={options}
          value={data.values.message_notifications}
          onChange={(value) => data.setFieldValue('message_notifications', value)}
          onBlur={data.handleBlur('message_notifications')}
          />
        </div>

        <div className="flex justify-between items-center">
         <div className='flex flex-col mb-4'>
          <h3 className="text-lg font-semibold">Friend Request Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose how you want to be notified about friend requests.</p>
         </div>
          <Select
          showSearch
          defaultValue="both"
          style={{ width: 120 }}
          options={options}
          value={data.values.friend_request_notifications}
          onChange={(value) => data.setFieldValue('friend_request_notifications', value)}
          onBlur={data.handleBlur('friend_request_notifications')}
          />
        </div>

        <div className="flex justify-between items-center">
        <div className='flex flex-col mb-4'>

          <h3 className="text-lg font-semibold">Post Like Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose how you want to be notified about post likes.</p>
          </div>
          <Select
          showSearch
          defaultValue="both"
          style={{ width: 120 }}
          options={options}
          value={data.values.post_like_notifications}
          onChange={(value) => data.setFieldValue('post_like_notifications', value)}
          onBlur={data.handleBlur('post_like_notifications')}
          />
        </div>

        <div className="flex justify-between items-center">
        <div className='flex flex-col mb-4'>

          <h3 className="text-lg font-semibold">Post Comment Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose how you want to be notified about post comments.</p>
          </div>
          <Select
          showSearch
          defaultValue="both"
          style={{ width: 120 }}
          options={options}
          value={data.values.post_comment_notifications}
          onChange={(value) => data.setFieldValue('post_comment_notifications', value)}
          onBlur={data.handleBlur('post_comment_notifications')}
          />
        </div>

        <div className="flex justify-between items-center">
        <div className='flex flex-col mb-4'>

          <h3 className="text-lg font-semibold">Request Accepted Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose how you want to be notified about request accepted.</p>
          </div>
          <Select
          showSearch
          defaultValue="both"
          style={{ width: 120 }}
          options={options}
          value={data.values.request_accepted_notifications}
          onChange={(value) => data.setFieldValue('request_accepted_notifications', value)}
          onBlur={data.handleBlur('request_accepted_notifications')}
          />
        </div>




        </Card>

        <Card className="mt-4 p-4 bg-cardBg dark:bg-darkcardBg shadow-md dark:shadow-cardBg2">
        <h1 className="text-2xl font-bold text-center">Advanced</h1>
        <h4 className='text-md mb-4 text-center'>Update your advanced settings.🔥</h4>

        <div className="flex justify-between items-center">
        <div className='flex flex-col mb-4'>
          <h3 className="text-lg font-semibold">Post Sync</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enable Offline Post Sync.</p>
        </div>
          <Switch
          checked={data.values.sync_post_for_offline}
          onChange={(value) => data.setFieldValue('sync_post_for_offline', value)}
          />
        </div>
        </Card>



       
        {/* floating save Button */}
        <div className="fixed bottom-8 right-8 max-md:bottom-24">
          <Button text="Save" type="primary"
          onClick={data.handleSubmit}
           />
          </div>
      </div>
    </div>
  );
};

export default MainSettings;
