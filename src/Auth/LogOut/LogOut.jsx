import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {LogoutOutlined ,LoadingOutlined} from '@ant-design/icons'
import { showModal ,hideAlertModal} from '/src/components/Alert/Alert';
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
   showModal({
      type: "warning",
      title: "Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          title: "Yes",
          onclick: () => {
            Cookies.remove("access");
            Cookies.remove("refresh");
            navigate("/login");
            hideAlertModal();
          },
        },
        {
          title: "No",
          onclick: () => {
            navigate("/");
            hideAlertModal();
          },
        },
      ],
      outSideAction: true,
      

   }      );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LogoutOutlined className="w-16 h-16 text-primary animate-bounce mb-4" />
      <h1 className="text-lg text-primary">Logging out...</h1>
      <LoadingOutlined  className="w-8 h-8 text-primary animate-spin mt-2" />
    </div>
  );
};

export default Logout;
