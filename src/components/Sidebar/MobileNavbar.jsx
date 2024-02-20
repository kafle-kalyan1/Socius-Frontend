import React, { useContext } from "react";
import { useSpring, animated } from "react-spring";
import { Home, Compass, MessageCircle, UsersIcon, UserCircle, Search, MessageCircleHeartIcon, LucideSettings2, LucideSettings, MoreVertical, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import { defaultProfilePic } from "../../Library/Others/Others";


const MobileNavbar = () => {
  const {profile} = useContext(ProfileContext)
  const UserProfile = () => <img src={profile?.profile_picture?profile.profile_picture:defaultProfilePic} alt="profile" className="w-6 h-6 rounded-full" />;
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Search size={20} />, label: "Search", path: "/search" },
    { icon: <MessageCircleHeartIcon size={20} />, label: "Messages", path: "/message" },
    { icon: <UserProfile/>, label: "Profile", path: "/profile" },
    { icon: <MoreHorizontal size={20} />, label: "Others", path: "/extras" },
  ];

  const navSpring = useSpring({
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0)" },
  });

  return (
   <>
    {
      window.location.pathname=='/login' || window.location.pathname=='/register' ? 
      <div className="bg-red-400">
      </div>
      :
      <animated.nav style={navSpring} className="fixed bottom-0 w-full bg-transparent z-50 border-t shadow-lg">
      <ul className="flex justify-around items-center bg-cardBg dark:bg-darkcardBg p-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              activeClassName="text-blue-500 bg-red-400"
              className="flex flex-col items-center text-gray-500 transition-all hover:text-blue-500"
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </animated.nav>
    }
   </>
  );
};

export default MobileNavbar;
