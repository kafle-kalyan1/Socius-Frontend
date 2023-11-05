import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProfileProvider } from "./context/ProfileContext/ProfileContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Toaster
  position="top-right"
  reverseOrder={false}
/>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </React.StrictMode>
);
