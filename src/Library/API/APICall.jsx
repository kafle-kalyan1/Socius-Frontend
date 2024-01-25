import axios from "axios";
import Cookies from "js-cookie";
import { useNavigation } from "react-router-dom";


export default async function APICall(url, method='post', data={}) {
   // const navigate = useNavigation()
   if (url == null || url == undefined) {
      return;
   }
   const access_token = Cookies.get("access");
   if(access_token == null || access_token == undefined){
      window.location.href('/login')
      return;
   }
   var response = await axios({
    method: method,
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Authorization': `Bearer ${access_token}`,
    },
   })

   try {
      if (response.status != 200 && response.status != 201) {
         console.log(response.status)
         throw new Error(`Upload failed with status ${response.status}`);
       }
   
       return response.data;


   } catch (error) {
      console.error(error);
      throw error; 
    }
      
}