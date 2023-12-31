import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import Cookies from 'js-cookie';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ProfileContext } from '/src/context/ProfileContext/ProfileContext';
import { SHA256 } from 'crypto-js';
import toast from 'react-hot-toast';





const VITE_PASSWORD_KEY = import.meta.env.VITE_PASSWORD_KEY;

export function EncryptString(data){
   var enc_string= CryptoAES.encrypt(data,VITE_PASSWORD_KEY ).toString();
   return enc_string;
 }


 export function DecryptString(data){
   var bytes  = CryptoAES.decrypt(data,VITE_PASSWORD_KEY );
   var originalText = bytes.toString(CryptoENC);
   return originalText;
 }    

 const ValidateUser = () => {
  const { fetchProfileData } = useContext(ProfileContext);
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    const access = Cookies.get("access");
    if (!access) {
      navigate('/login');
    }
    fetchProfileData(access);
    },[])
 }
 export default ValidateUser

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

  export const defaultProfilePic = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";