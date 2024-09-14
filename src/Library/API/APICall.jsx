import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default async function APICall(url, method = 'POST', data = {}) {
   if (!url) return;
   
   if (url.startsWith('/api/')) {
      url = url.replace('/api/', 'https://socius.onrender.com/');
   }

   const path = window.location.pathname;
   if (["/login", "/register", "/setupaccount", "/otp", "/404", "/servererror"].includes(path)) return;

   const access_token = Cookies.get("access");
   if (!access_token) {
      window.location.href = '/login';
      return;
   }

   const options = {
      method: method,
      headers: {
         "Content-Type": "application/json",
         'Authorization': `Bearer ${access_token}`,
      },
      credentials: 'include', // This is equivalent to withCredentials: true
   };

   if (method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(data);
   }

   try {
      const response = await fetch(url, options);

      if (response.ok) {
         return await response.json();
      } else if (response.status === 401) {
         window.location.href = '/login';
      } else {
         const errorData = await response.json();
         throw new Error(errorData.message || 'An error occurred');
      }
   } catch (error) {
      console.error(error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
         toast.error('Network error occurred', {
            duration: 3000,
         });
      } else {
         toast.error(`Error: ${error.message}`, {
            duration: 3000,
         });
      }
      throw error;
   }
}