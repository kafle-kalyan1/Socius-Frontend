import React, { useEffect, useState } from "react";
import Button from "/src/components/Button/Button";
import { dateFormat, firstLetterCapital } from "/src/Library/Others/Others";
import { useNavigate } from "react-router-dom";
import BigPopup, { showBigPopup } from "/src/components/BigPopup/BigPopup";
import { blobToDataURL } from "/src/Library/Others/Others";
import { hideBigPopup } from "/src/components/BigPopup/BigPopup";
import axios from "axios";
import OurProfileSkeleton from "./../Profile/OurProfileSkeleton";
import ValidateUser from "../../Library/Others/Others";

const OtherUserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  ValidateUser();
  //get username from url
  const username = window.location.pathname.split("/")[2];

  useEffect(() => {
    axios
      .get(`/api/user/getProfile/${username}/`)
      .then((res) => {
        setProfile(res.data.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleViewProfile = () => {
    let a = document.getElementById("profile-img");
    a = a.src;
    console.log(a);
    window.open(Object(a), "_blank");
  };

  const handleUnfriend = () => {
    console.log("Unfriend clicked");
  };

  return (
    <div className="bg-gray-100">
      {isLoaded ? (
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className=" overflow-hidden relative group">
                  {profile.profile_picture ? (
                    <img
                      id="profile-img"
                      className="h-40 w-40 mx-auto rounded-full"
                      src={"data:image/png;base64," + profile.profile_picture}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-40 w-40 mx-auto rounded-full"
                      src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                      alt=""
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                    <div className="text-white text-center">
                      <button
                        className="px-4 py-2 bg-blue-500 rounded-full mx-2"
                        onClick={handleViewProfile}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                  {profile.fullname}
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  {}
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  {profile.bio}
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {profile.is_active == true ? (
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
                      {profile.profile_picture
                        ? dateFormat(profile.date_joined, true)
                        : ""}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="my-4"></div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">
                        {profile.first_name
                          ? firstLetterCapital(profile.first_name)
                          : profile.fullname
                          ? firstLetterCapital(profile.fullname?.split(" ")[0])
                          : ""}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">
                        {profile.last_name
                          ? firstLetterCapital(profile.last_name)
                          : profile.fullname
                          ? firstLetterCapital(
                              profile.fullname?.split(" ").pop()
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">
                        {firstLetterCapital(profile.gender)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{profile.phone_number}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href={`mailto:${profile.email}`}
                        >
                          {profile.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">
                        {dateFormat(profile.date_of_birth)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                 <div className="flex justify-evenly gap-10">
                  <Button text="Message" onClick={()=>navigate(`/message/${profile.username}`,{state:{"currentChatUser":profile.username}})} type="primary"  />
                 <Button text="Unfriend" onClick={handleUnfriend} type="secondary"  />
                  <Button text="Report" onClick={handleUnfriend} type="danger"  />
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
