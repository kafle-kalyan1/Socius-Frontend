import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LostPage from "./Screens/404/NotFound";
import ServerError from "./Screens/ServerError/ServerError";
import Logout from "./Auth/LogOut/LogOut";
import ExploreProfile from "./Screens/ExploreProfile/ExploreProfile";
import Messsage from "./Screens/Messsage/Messsage";
import { useNotification } from "./context/NotificationContext/NotificationContext";
import { w3cwebsocket } from "websocket";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Home = lazy(() => import("./Screens/Home/Home"));
const Profile = lazy(() => import("./Screens/Profile/Profile"));
const EditProfile = lazy(() => import("./Auth/EditProfile/EditProfile"));
const Register = lazy(() => import("./Auth/Register/Register"));
const Login = lazy(() => import("./Auth/Login/Login"));
const SetUpAccount = lazy(() => import("./Auth/Others/SetupAccount"));
const OPT = lazy(() => import("./Auth/Others/OTP"));
const UserProfile= lazy(()=>import('./Screens/UserProfile/UserProfile'));

function AppRoute() {
  const { notifications, addNotification, removeNotification } = useNotification();

  useEffect(() => {
    const username = Cookies.get("username");
    const newSocket = new w3cwebsocket(`ws://localhost:8000/notifications/${username}/`);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      console.log(event);
      toast.success(JSON.parse(event.data).message);
      // const newNotification = JSON.parse(event.data).message;
    };

    newSocket.onclose = () => {
      console.log("WebSocket closed");
    };

    newSocket.onerror = (error) => {  
      console.log(error);
    };

    return () => {
      if (newSocket) {
        newSocket.close();
        newSocket.onclose = () => {
          console.log("WebSocket closed");
        }

      }
    };

  });

  return (
    <>
    <Routes>
      <Route
        exact
        path=""
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        exact
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        exact
        path="/profile/edit"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EditProfile />
          </Suspense>
        }
      />
      <Route
        exact
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        exact
        path="/edit-profile"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SetUpAccount />
          </Suspense>
        }
      />
      
      <Route
        exact
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        exact
        path="/verify-otp"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <OPT />
          </Suspense>
        }
      />
      <Route
        exact
        path="/friends"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ExploreProfile />
          </Suspense>
        }
      />

       <Route
        path="/u/:username"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfile />
          </Suspense>
        }
      />

       <Route
        path="/message"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Messsage />
          </Suspense>
        }
      />

       <Route
        path="/message/:username"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Messsage />
          </Suspense>
        }
      />

      <Route
        exact
        path="/servererror"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ServerError />
          </Suspense>
        }
      />

<Route
        exact
        path="/logout"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Logout />
          </Suspense>
        }
      />
      

      <Route path="*" element={<LostPage />} />
    </Routes>
      <div>
      {notifications.map((notification) => (
        <div key={notification.id} onClick={() => console.log(notification)}>
          {notification.message}
        </div>
      ))}
    </div>
    </>
  );
}

export default AppRoute;
