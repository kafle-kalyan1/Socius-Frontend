import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [tokens, setTokens] = useState();
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async (access) => {
    try {
      if (access) {
        // console.log(access);
        const response = await axios.get("/api/auth/user/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        const profileData = response.data;
        // console.log(profileData);
        setProfile(profileData);
      }
      else{
        Cookies.remove("access");
        Cookies.remove("refresh");
        setProfile(null);
        window.location.href = "/login";
      }
    } catch (error) {
      if (error.response.status === 401) {
        refreshAccessToken();
      } else {
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
      if (refreshToken) {
        const response = await axios.post(
          "api/auth/refresh/",
          {
            refresh: refreshToken,
          }
        );
        const newAccessToken = response.data.access;
        Cookies.set("access", newAccessToken);
        fetchProfileData(newAccessToken);
      }
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
 