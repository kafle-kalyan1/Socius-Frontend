import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);  
  
  useEffect(() => {
    const access = Cookies.get("access");
  
    // if pages are login, register, setupaccount, otp, 404, servererror, then don't fetch profile data
    const path = window.location.pathname;
    if (
      path === "/login" ||
      path === "/register" ||
      path === "/setupaccount" ||
      path === "/otp" ||
      path === "/404" ||
      path === "/servererror"
    ) {
      return;
    }
    else{
      fetchProfileData(access);
    }

  }, []);

  const access_token = Cookies.get("access");
  const fetchProfileData = async (access=access_token) => {
    try {
      console.log(access);
        const response = await axios.get("/api/auth/user/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        const profileData = response;
        setProfile(profileData.data.data);
    } catch (error) {
      if(error.request.status==500){
        window.location.href = "/servererror";
      }
      else if (error.response.status == 401) {
        refreshAccessToken();
      }
      else {
        console.error("Error getting access token");
        Cookies.remove("access");
        Cookies.remove("refresh");
        setProfile(null);
        window.location.href = "/login";
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = Cookies.get("refresh");
        const response = await axios.post(
          "api/auth/refresh/",
          {
            refresh: refreshToken,
          }
        );
        const newAccessToken = response.data.access;
        Cookies.set("access", newAccessToken);
        fetchProfileData(newAccessToken);
    } catch (error) {
      Cookies.remove("access");
      Cookies.remove("refresh");
      setProfile(null);
      window.location.href = "/login";
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, fetchProfileData, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
 