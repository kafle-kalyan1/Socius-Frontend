import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProfileProvider } from "./context/ProfileContext/ProfileContext.jsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import MessageSocket from "./Socket/MessageSocket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <React.StrictMode>
  <Toaster
  position="top-right"
  reverseOrder={false}
/>
    <ProfileProvider>
    {/* <MessageSocket> */}
      <App />
    {/* </MessageSocket> */}
    </ProfileProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
