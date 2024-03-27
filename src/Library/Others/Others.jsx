import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import Cookies from 'js-cookie';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ProfileContext } from '/src/context/ProfileContext/ProfileContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { w3cwebsocket } from 'websocket';
import imageToBase64 from 'image-to-base64/browser';




const VITE_PASSWORD_KEY = import.meta.env.VITE_PASSWORD_KEY;
const cloudinary_cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


export function Notification_socket(){
  const {profile} = useContext(ProfileContext);
  return(
    profile?.username ?
    new w3cwebsocket(`${socketLink}/notifications/${profile.username}/`)
    : null
    )
}


export function EncryptString(data){
  if(!data) return null;
  if(typeof data == "object"){
    data = JSON.stringify(data);
  }
  if(data == "") return "";
   var enc_string= CryptoAES.encrypt(data,VITE_PASSWORD_KEY ).toString();
   return enc_string;
 }


 export function DecryptString(data){
  var originalText;
  try {
    var bytes  = CryptoAES.decrypt(data,VITE_PASSWORD_KEY );
     originalText = bytes.toString(CryptoENC);
  } catch {
     originalText = data
  }
   return originalText;
 }    

 export const firstLetterCapital = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
  };


//jsdocs
/**
 * @param {string} date
 * @param {boolean} includeDay
 * @returns {string}
 * @example
 * dateFormat('2021-08-30T18:30:00.000Z', true)
 * // returns 'Mon Aug 30, 2021'
  */
  export const dateFormat = (date, includeDay = false) => {
    if (!date) return null;
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'short' });
    const day = d.getDate();
    const year = d.getFullYear();
    let dayOfWeek = null;
    if (includeDay) {
      dayOfWeek = d.toLocaleString('default', { weekday: 'short' });
    }
    return ` ${dayOfWeek? dayOfWeek+',':''} ${month} ${day}, ${year}`;
  };

  //link to blob
  /**
   * @param {string} url
   * @returns {string}
   * @example
   * getBlobLink('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1')
   * // returns 'blob:https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1'
    */
  export function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(blob);
    });
  }
  
  export  const sanitizeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  export const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  export const defaultProfilePic = "https://st2.depositphotos.com/4841789/10331/v/450/depositphotos_103319338-stock-illustration-male-head-icon.jpg";

  export function ShortcutKey(key,callback){
    key=key.toUpperCase().charCodeAt(0);
    var fun=function(e) {
      if (e.altKey == true && e.keyCode == key){
        e.preventDefault();
        callback();
      }
    }
    window.addEventListener('keydown', fun);
    return ()=>{window.removeEventListener('keydown',fun)};
  }


  export async function uploadCloudinary(file, preset = "yaofb5a3", folder = "socius") {
    const url = `https://api.cloudinary.com/v1_1/dfvekucsr/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);
    formData.append('folder', folder);
  
    try {
      const response = await axios.post(url, formData);
  
      if (response.status !== 200) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
  
      const responseData = response.data;
  
      // Check if the response contains the expected 'url' property
      if (responseData.url) {
        console.log(responseData); // Log the result here
        return responseData;
      } else {
        throw new Error(`Invalid response format: 'url' property not found`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // rethrow the error for further handling in the onSubmit function
    }
  }
  
  // export async function axios_auth()

  export async function urlToAntdFile(url, filename = 'file') {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(proxyUrl + url);
    const data = await response.blob();
    return new File([data], filename, { type: 'image/jpeg' });
  }

  export async function DefaultAntdProfile(url=defaultProfilePic, filename = 'file') {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(proxyUrl + url);
    const data = await response.blob();
    return new File([data], filename, { type: 'image/jpeg' });
  }


  export function timeAgo(dateTime){
    const currentTimestamp = new Date().getTime();
  const pastTimestamp = new Date(dateTime).getTime();

  const seconds = Math.floor((currentTimestamp - pastTimestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return seconds + ' seconds ago';
  } else if (minutes < 60) {
    return minutes + ' minutes ago';
  } else if (hours < 24) {
    return hours + ' hours ago';
  } else {
    return days + ' days ago';
  }
  }

  export function useScrollToTop() {
    const navigate = useNavigate();
  
    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [navigate]);
  }

  export function useScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  }

export const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());  
  const mqListener = (e => {
      setIsDarkTheme(e.matches);
  });
  
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
}

export const socketLink = "ws://localhost:8000";

export const defaultURL = "http://127.0.0.1:8000";

export const urltoBase64 = (url) =>
imageToBase64(url) // Path to the image
.then(
    (response) => {
        return (response);
    }
)
.catch(
    (error) => {
        console.log(error);
    }
)
