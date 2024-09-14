import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default async function APICall(url, method='post', data={}) {
   if (url == null || url == undefined) {
      return;
   }
   
   if (url.startsWith('/api/')) {
      url = url.replace('/api/', 'https://socius.onrender.com/');
   }

   
   const path = window.location.pathname;
   if (
      path === "/login" ||
      path === "/register" ||
      path === "/setupaccount" ||
      path === "/otp" ||
      path === "/404" ||
      path === "/servererror"
    ) return;

   const access_token = Cookies.get("access");
   if(access_token == null || access_token == undefined){
      window.location.href = '/login';
      return;
   }

   try {
      const response = await axios({
         method: method,
         url: url,
         data: data,
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${access_token}`,
         },
      });

      if (response.status >= 200 && response.status < 300) {
         return response.data;
      } else if (response.status === 401) {
         window.location.href = '/login';
      } else {
         window.location.href = '/servererror';
      }
   } catch (error) {
      console.error(error);
      toast.error('An error occurred', error.message);
      window.location.href = '/servererror';
      throw error;
   }
}
