import React, { useState } from "react";
import OtpInput from "react-otp-input";

const Otp = (props) => {
  const [otp, setOtp] = useState("");
  if (!props) return;
  if (!props.email || !props.username) return;

  return (
    <div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
};

export default Otp;
