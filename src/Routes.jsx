import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LostPage from "./Screens/404/NotFound";

const Home = lazy(() => import("./Screens/Home/Home"));
const Profile = lazy(() => import("./Screens/Profile/Profile"));
const EditProfile = lazy(() => import("./Auth/EditProfile/EditProfile"));
const Register = lazy(() => import("./Auth/Register/Register"));
const Login = lazy(() => import("./Auth/Login/Login"));
const SetUpAccount = lazy(() => import("./Auth/Others/SetupAccount"));
const OPT = lazy(() => import("./Auth/Others/OTP"));

function AppRoute() {
  return (
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
        path="/setup"
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
      

      <Route path="*" element={<LostPage />} />
    </Routes>
  );
}

export default AppRoute;
