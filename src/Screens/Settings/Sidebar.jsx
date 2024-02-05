import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCog, FaUser, FaBell, FaRocket, FaBars } from 'react-icons/fa';

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 640);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const menu = (
    <ul className="sm:mt-16 mt-0 space-y-5">
      <li className="px-2 py-2 transition-colors duration-200 flex w-full cursor-pointer justify-start items-center hover:bg-blue-500 hover:text-white">
        <NavLink to="/settings/general" activeClassName="text-blue-500" className="flex items-center gap-4">
          <FaCog className='hover:animate-spin' /> General
        </NavLink>
      </li>
      <li className="px-2 py-2 transition-colors duration-200 flex w-full cursor-pointer justify-start items-center hover:bg-green-500 hover:text-white">
        <NavLink to="/settings/account" activeClassName="text-green-500" className="flex items-center gap-4">
          <FaUser className='hover:scale-150' /> Account
        </NavLink>
      </li>
      <li className="px-2 py-2 transition-colors duration-200 flex w-full cursor-pointer justify-start items-center hover:bg-yellow-500 hover:text-white">
        <NavLink to="/settings/notifications" activeClassName="text-yellow-500" className="flex items-center gap-4">
          <FaBell className='hover:animate-bounce' /> Notifications
        </NavLink>
      </li>
      <li className="px-2 py-2 transition-colors duration-200 flex w-full cursor-pointer justify-start items-center hover:bg-red-500 hover:text-white">
        <NavLink to="/settings/advance" activeClassName="text-red-500" className="flex items-center gap-4">
          <FaRocket className='hover:animate-pulse'/> Advanced
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div className=" text-deep_primary_text w-full">
      {isMobile ? (
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-deep_primary_text ml-5 p-2 w-">
            <FaBars />
          </button>
          {isDropdownOpen && (
            <div className="absolute ml-5 right-0 w-48 bg-cardBorder  rounded-md shadow-lg py-2 z-20">
              {menu}
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-screen sticky top-0 flex flex-col justify-between">
          {menu}
        </div>
      )}
    </div>
  );
}

export default Sidebar;