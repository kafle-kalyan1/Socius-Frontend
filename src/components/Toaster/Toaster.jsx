import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { InfoSIcon } from "../../Library/Icons/Icons";

let proops = []
const Toaster = (props) => {
 
  let { message, icon, type, time, onClick } = props;
  proops = [...proops, props]
  console.log(proops)
  
  function hide() {
    document.getElementById("toast").style.display = "none";
  }
  useEffect(() => {
    if (time) {
      const timeoutId = setTimeout(hide, time);
      return () => clearTimeout(timeoutId);
    }
  }, [time]);

  icon = <InfoSIcon />;
  return (
   <div className=" w-full h-full bg-red-400">
       <div
      className={`fixed max-w-[400px] right-3 top-2 w-[350px] bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700`}
      onClick={onClick ? onClick : hide}
    >
      <div
        className="flex max-h-40 align-middle"
        onClick={onClick ? onClick : hide}
      >
        <div className={`w-[2%] bg-info_clor absolute h-full`}></div>
        <div className={` h-full ml-2`}>
          <div className="rounded-full w-5 my-4">{icon}</div>
        </div>
        <div className="" onClick={onClick ? onClick : hide}>
          <p className="text-sm text-gray-700 dark:text-gray-400 m-4">
            {message}
          </p>
        </div>
      </div>
    </div>
   </div>
  );
};

let toasts = []
export const ShowToaster = (({ message, icon, type, time, onClick }) =>{
  const toastContainer = document.getElementById("toast");
  toasts = [...toasts,{message: message, icon: icon, type: type, time: time, onClick: onClick}]
  console.log(toasts)
  ReactDOM.createRoot(toastContainer).render(
   <>
    {toasts.map(element => 
      <Toaster
      key={element.time}
      message={element.message}
      icon={element.icon}
      type={element.type}
      time={element.time}
      onClick={element.onClick}
    />
    )}
   </>
  );
  document.getElementById("toast").style.display = "absolute";
  return (
    <>
    {toasts.map(element => 
      <Toaster
      key={element.time}
      message={element.message}
      icon={element.icon}
      type={element.type}
      time={element.time}
      onClick={element.onClick}
    />
    )}
    </>
  )
})

export default Toaster;
