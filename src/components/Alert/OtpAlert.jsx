import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import OtpInput from 'react-otp-input';
import {toast} from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const OtpAlert = ({ title, message, icon, link, submit,data }) => {
  const [otp, setOtp] = useState('');
  const input_ref = useRef(null);
  const hide = () => {
    document.getElementById('otp-modal').style.display = 'none';
  };

  const handleSubmit = () => {
    if (otp.length === 6){
    data = {...data, otp:otp}
      submit.action({data,hide});
      // hide();
    }
    else{
      toast.error("Invalid OTP", {
        description: "Please enter a valid OTP",
        duration: 3000,
      });
    }
    
  };

  return (
    <div className="min-w-screen h-screen animated fadeIn faster left-0 top-0 flex justify-center items-center outline-none focus:outline-none bg-no-repeat bg-center bg-cover bg-opacity-60 fixed inset-0 bg-black backdrop-blur-md z-50" id="modal-id" ref={input_ref}>
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-cardBg dark:bg-darkcardBg" ref={input_ref}>
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <div className="flex justify-center">{icon}</div>
            <h2 className="text-xl  text-text1 dark:text-text2  font-bold py-4 text-primary">{title}</h2>
            <p className="text-sm text-text1 dark:text-text2 px-8">{message}</p>
            <a
              href="/login"
              className="font-medium text-main_text hover:underline"
            >
              {link}
            </a>     
                
                 </div> 
          <div className='text-4xl flex justify-between font-bold w-full h-16 rounded-lg border-gray-300 text-center ' ref={input_ref}>
            <OtpInput
              value={otp}
              onChange={(e) => setOtp(e)}
              numInputs={6}
              isInputNum={true}
              shouldAutoFocus={true}
              renderSeparator={<span style={{ width: "8px" }}>-</span>}
              renderInput={(props) => <input {...props} />}
              inputType="number"
              inputStyle={{ width: "100%", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1.5rem", fontWeight: "bold", color: "#000000", borderRadius: "10px", border: "1px solid #000000" }}
            />
            </div>
          <div className="p-3 flex w-full mt-2 m-auto justify-center">

            <Button
              type="primary"
              text={submit?.title ? submit.title : "Submit"}
              onClick={handleSubmit}
              disabled={otp.length !== 6}
              width="40px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export function showOtpModal({ title, message, icon, link, submit, data }) {
  const modalContainer = document.getElementById('otp-modal');
  ReactDOM.createRoot(modalContainer).render(
    <OtpAlert title={title} message={message} icon={icon} link={link} submit={submit} data={data} />
  );
  document.getElementById('otp-modal').style.display = 'block';
}

export default OtpAlert;
