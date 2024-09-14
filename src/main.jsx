import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProfileProvider } from "./context/ProfileContext/ProfileContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MenuContextProvider } from "./context/MenuContext/MenuContext.jsx";
import { ThemeProvider } from "./context/ThemeContext/Index.jsx";
import { MessageNotificationProvider } from "./context/NotificationContext/MessageNotificationContext.jsx";
// import MessageSocket from "./Socket/MessageSocket.jsx";
import { NotificationProvider  } from './context/NotificationContext/NotificationContext';
import { uploadCloudinary } from "./Library/Others/Others.jsx";
import APICall from "./Library/API/APICall.jsx";
import { showLoading } from "./components/Loading/Loading.jsx";
import { Analytics } from "@vercel/analytics/react"



ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Analytics/>
  <React.StrictMode>
  <ProfileProvider>

  <MenuContextProvider>
<NotificationProvider>

  <Toaster
  position="top-right"
  reverseOrder={false}
/>
<MessageNotificationProvider>

    <ThemeProvider>

    <ProfileProvider>
      <App />
    </ProfileProvider>
    </ThemeProvider>
    </MessageNotificationProvider>
</NotificationProvider>

    </MenuContextProvider>
    </ProfileProvider>
  </React.StrictMode>
  
  </GoogleOAuthProvider>
);
