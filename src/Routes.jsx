import {
  Fragment,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
const UserProfile = lazy(() => import("./Screens/UserProfile/UserProfile"));
const SinglePost = lazy(() => import("./components/Post/SinglePost"));
const Search = lazy(() => import("./Screens/Search/Search"));
const Settings = lazy(() => import("./Screens/Settings/MainSettings"));
const GeneralSettings = lazy(() =>
  import("./Screens/Settings/GeneralSettings")
);
const NotificationSettings = lazy(() =>
  import("./Screens/Settings/NotificationSettings")
);
const AccountSettings = lazy(() =>
  import("./Screens/Settings/AccountSettings")
);
const AdvanceSettings = lazy(() =>
  import("./Screens/Settings/AdvanceSettings")
);
const ForgetPassword = lazy(() =>
  import("./Auth/ForgetPassword/ForgetPassword")
);

import { ProfileContext } from "/src/context/ProfileContext/ProfileContext";
import Sidebar from "/src/components/Sidebar/Sidebar";
import MobileNavbar from "./components/Sidebar/MobileNavbar";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import { defaultProfilePic } from "./Library/Others/Others";

function AppRoute() {
  const { notifications, addNotification, removeNotification } =
    useNotification();
  const { profile } = useContext(ProfileContext);
  const { isMobile, setIsMobile, setOpen } = useContext(MenuContext);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (profile?.username) {
      const newSocket = new w3cwebsocket(
        `ws://localhost:8000/notifications/${profile.username}/`
      );

      newSocket.onopen = () => {
        console.log("WebSocket connected");
      };

      newSocket.onmessage = (event) => {
        let res_data = JSON.parse(event.data);
        console.log(res_data);
        if (res_data.type == "message") {
          const message = res_data.message;
          const shortenedMessage = message.split(" ").slice(0, 100).join(" ");

          toast((t) => (
            <>
              <div className="relative w-auto bg-gray-100 p-4 rounded-md shadow-md">
                <div className="flex">
                  <img
                    className="h-12 w-12 rounded-full mr-3"
                    src={
                      res_data.profile_picture
                        ? res_data.profile_picture
                        : defaultProfilePic
                    }
                    alt={res_data.sender}
                  />
                  <div className="">
                    <p className="font-bold text-gray-700">
                      {res_data.fullname}
                    </p>
                    <p className="text-gray-500">{shortenedMessage}.</p>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      toast.dismiss(t.id);
                      navigate(`/message/${res_data.sender}`);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </>
          ));
        } else if (res_data.type == "friend_request") {
          toast((t) => (
            <div className="relative w-auto bg-gray-100 p-4 rounded-md shadow-md">
              <div className="flex">
                <img
                  className="h-12 w-12 rounded-full mr-3"
                  src={
                    res_data.profile_picture
                      ? res_data.profile_picture
                      : defaultProfilePic
                  }
                  alt={res_data.sender}
                />
                <div className="">
                  <p className="font-bold text-gray-700">{res_data.fullname}</p>
                  <p className="text-gray-500">{res_data.message}</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate(`/u/${res_data.sender}`);
                  }}
                >
                  View
                </button>
                <button
                  type="button"
                  className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  Decline
                </button>
              </div>
            </div>
          ));
        } else if (res_data.type == "accept_request") {
          toast((t) => (
            <div className="relative w-auto bg-gray-100 p-4 rounded-md shadow-md">
              <div className="flex">
                <img
                  className="h-12 w-12 rounded-full mr-3"
                  src={
                    res_data.profile_picture
                      ? res_data.profile_picture
                      : defaultProfilePic
                  }
                  alt={res_data.sender}
                />
                <div className="">
                  <p className="font-bold text-gray-700">{res_data.fullname}</p>
                  <p className="text-gray-500">{res_data.message}.</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate(`/u/${res_data.sender}`);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ));
        } else if (
          res_data.type == "post_like" &&
          profile.username != res_data.sender
        ) {
          toast((t) => (
            <div className="relative w-auto bg-gray-100 p-4 rounded-md shadow-md">
              <div className="flex">
                <img
                  className="h-12 w-12 rounded-full mr-3"
                  src={
                    res_data.profile_picture
                      ? res_data.profile_picture
                      : defaultProfilePic
                  }
                  alt={res_data.fullname}
                />
                <div className="">
                  <p className="font-bold text-gray-700">{res_data.fullname}</p>
                  <p className="text-gray-500">{res_data.message}.</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate(`/post/${res_data.post}`);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ));
        } else if (
          res_data.type == "post_comment" &&
          profile.username != res_data.sender
        ) {
          toast((t) => (
            <div className="relative w-auto bg-gray-100 p-4 rounded-md shadow-md">
              <div className="flex">
                <img
                  className="h-12 w-12 rounded-full mr-3"
                  src={
                    res_data.profile_picture
                      ? res_data.profile_picture
                      : defaultProfilePic
                  }
                  alt={res_data.fullname}
                />
                <div className="">
                  <p className="font-bold text-gray-700">{res_data.fullname}</p>
                  <p className="text-gray-500">{res_data.message}.</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate(`/post/${res_data.post}`);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ));
        }
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
          };
        }
      };
    }
  });

  useEffect(() => {
    changeSidebar()
   });
 
   const changeSidebar = () =>{
     if (location.pathname.startsWith('/message')) {
       setOpen(false);
     } else {
       setOpen(true);
     }
   }

  return (
    <>
      <Routes>
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
          path="/register"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Register />
            </Suspense>
          }
        />

        <Route
          exact
          path="/forgetPassword"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ForgetPassword />
            </Suspense>
          }
        />

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
          path="/edit-profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SetUpAccount />
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
          path="/post/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SinglePost />
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
          path="/search"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
          }
        />

        <Route
          exact
          path="/settings"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Settings />
            </Suspense>
          }
        />

        <Route
          exact
          path="/settings/general"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <GeneralSettings />
            </Suspense>
          }
        />

        <Route
          exact
          path="/settings/account"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AccountSettings />
            </Suspense>
          }
        />

        <Route
          exact
          path="/settings/notifications"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotificationSettings />
            </Suspense>
          }
        />

        <Route
          exact
          path="/settings/advance"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdvanceSettings />
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
