import React, { useEffect, useState } from 'react'
import APICall from '../../Library/API/APICall';
import toast from 'react-hot-toast';
import FriendRecommendation from '../../components/FriendRecommendation/FriendRecommendation';

const Profile = ({data}) => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    getProfiles();
  }, [data]);
  const getProfiles = async () => {
    console.log(data);
    if(data == null || data == undefined){
      try {
        const response = await APICall("/api/utils/recomandedUsers/", "GET", {});
        setProfiles(response.data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    else{
      setProfiles(data);
    }
  }

  return (
    <div className='flex-1 w-full h-full mt-5 justify-center text-text1 dark:text-text2'>
    <div className='flex flex-col justify-center text-center'>
      <h1 className="text-2xl font-bold">People you may know</h1>
      <p className="text-gray-500">Based on your activity</p>
    </div>
      <div className="grid grid-cols-1 text-text1 dark:text-text2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-4 gap-4"> 
     {
      profiles && profiles.map((profile) => {
        return (
          <FriendRecommendation
            key={profile.username}
            username={profile.username}
            fullname={profile.fullname}
            profile_pic={profile.profile_picture}
            load_data={getProfiles}
          />
        )
      }
      )
     }
     </div>
    </div>
    )
}

export default Profile