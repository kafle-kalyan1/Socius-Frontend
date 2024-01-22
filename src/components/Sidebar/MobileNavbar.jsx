import React from "react";
import { useSpring, animated } from "react-spring";
import { Home, Compass, MessageCircle, UsersIcon, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNavbar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Compass size={20} />, label: "Explore", path: "/profile-explore" },
    { icon: <MessageCircle size={20} />, label: "Messages", path: "/message" },
    { icon: <UsersIcon size={20} />, label: "Friends", path: "/friends" },
    { icon: <UserCircle size={20} />, label: "Profile", path: "/profile" },
  ];

  const navSpring = useSpring({
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0)" },
  });

  return (
    <animated.nav style={navSpring} className="fixed  bottom-0 w-full bg-transparent z-50 border-t shadow-lg">
      <ul className="flex justify-around items-center bg-cardBg p-3">
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
  );
};

export default MobileNavbar;
