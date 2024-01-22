import axios from "axios";
import Cookies from "js-cookie";
import { useNavigation } from "react-router-dom";


export default async function APICall(url, method='post', data={}) {
   const navigate = useNavigation()
   if (url == null || url == undefined) {
      return;
   }
   const access_token = Cookies.get("access_token");
   if(access_token == null || access_token == undefined){
      navigate('/unauthorized')
      return;
   }
   axios({
    method: method,
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Authorization': `Bearer ${access_token}`,
    },
   })
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
}