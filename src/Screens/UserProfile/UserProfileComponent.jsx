/* eslint-disable react/prop-types */
import Button from "/src/components/Button/Button";
import { dateFormat, firstLetterCapital } from "/src/Library/Others/Others";
import { useNavigate } from "react-router-dom";
import OurProfileSkeleton from "./../Profile/OurProfileSkeleton";
import { defaultProfilePic } from "../../Library/Others/Others";
import APICall from "../../Library/API/APICall";
import toast from "react-hot-toast";
import { w3cwebsocket } from "websocket";


const OtherUserProfile = (props) => {
  const navigate = useNavigate();
  const {getProfile, profile, isLoaded,username} = props;
 
  const handleViewProfile = () => {
    let a = document.getElementById("profile-img");
    a = a.src;
    console.log(a);
    window.open(Object(a), "_blank");
  };

  const handleUnfriend = async () => {
    let response = await APICall("/api/user/removeFriend/","POST",{"friend": username})
    if(response.status == 200){
    toast.success(`Unfriended ${username}`);
    getProfile()
    }
    };

    const sendRequestTo = async () => {

      let response = await APICall("/api/user/sendFriendRequest/","POST",{"friend": username})
      if(response.status == 200){

      toast.success(`Request sent to ${username}`);

      const newSocket = new w3cwebsocket(`ws://localhost:8000/notifications/${profile.username}/`);
    newSocket.onopen = () => {
      console.log("WebSocket connected");
      newSocket.send(
        JSON.stringify({
          "type":"friend_request",
          "data":{
            "sender_username":username,
          },
        })
      );
    };
    getProfile()
      }

  };

  const cancelRequest = async () => {
    let response = await APICall("/api/user/cancelFriendRequest/","POST",{"friend": username})
    if(response.status == 200){
    toast.success(`Cancelled request to ${username}`);
    getProfile()
    }
};

const acceptRequest = async () => {

  let response = await APICall("/api/user/acceptFriendRequest/","POST",{"friend": username})
  if(response.status == 200){
  toast.success(`Accepted request from ${username}`);
  getProfile()
  }
};


  return (
    <div className="flex bg-cardBg2 dark:bg-darkcardBg2">
      {isLoaded ? (
            <div className="container my-5 p-5">
                <div className="flex flex-col lg:flex-row md:-mx-2 ">
                    <div className="w-full lg:w-3/12 md:mx-2">
                        <div className="bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 p-3 border-t-4 border-green-400">
                            <div className=" overflow-auto relative group">
                    <img
                      id="profile-img"
                      className="h-40 w-40 mx-auto rounded-full"
                      src={profile.data.profile_picture || defaultProfilePic}
                      alt=""
                    />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-opacity-50 transition-opacity">
                    <div className=" text-center">
                      <button
                        className="px-4 py-2 bg-blue-500 rounded-full mx-2"
                        onClick={handleViewProfile}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
                <h1 className="text-text1 dark:text-text2 font-bold text-xl leading-8 my-1 text-center">
                  {profile.data.fullname}
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  {}
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  {profile.data.bio}
                </p>
                <ul className="bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {profile.data.is_active == true ? (
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                          Inactive
                        </span>
                      )}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {profile.data
                        ? dateFormat(profile.data.date_joined, false)
                        : ""}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="my-4"></div>
            </div>
            <div className="w-full lg:w-9/12 mx-2 h-64">
                        <div className="bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-text1 dark:text-text2 leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-text1 dark:text-text2">
                                <div className="grid grid-cols-1 text-sm">
                                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">
                        {profile.data.first_name
                          ? firstLetterCapital(profile.data.first_name)
                          : profile.data.fullname
                          ? firstLetterCapital(profile.data.fullname?.split(" ")[0])
                          : ""}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">
                        {profile.data.last_name
                          ? firstLetterCapital(profile.data.last_name)
                          : profile.data.fullname
                          ? firstLetterCapital(
                              profile.data.fullname?.split(" ").pop()
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">
                        {firstLetterCapital(profile.data.gender)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{profile.data.phone_number}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href={`mailto:${profile.data.email}`}
                        >
                          {profile.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">
                        {dateFormat(profile.data.date_of_birth)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                 <div className="flex justify-evenly gap-10 mt-5">
                  <Button text="Message" onClick={()=>navigate(`/message/${profile.data.username}`,{state:{"currentChatUser":profile.data.username}})} type="primary"  />

                  {
                    profile.is_friend ?
                    <Button text="Unfriend" onClick={handleUnfriend} type="danger"  />
                    :
                    profile.is_requested ?
                     !profile.is_requested_by_me ?
                    <Button text="Cancel Request" onClick={cancelRequest} type="danger"   />
                    :
                    <Button text="Accept Request" onClick={acceptRequest} type="primary"   />
                    :
                    <Button text="Add Friend" onClick={sendRequestTo} type="primary"  />


                  }
                 
                  <Button text="Report" onClick={handleUnfriend} type="danger"  disabled={true}  />
                 </div>
            </div>
          </div>
        </div>
      ) : (
        <OurProfileSkeleton />
      )}
    </div>
  );
};

export default OtherUserProfile;
