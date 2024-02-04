import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaCog, FaUser, FaBell, FaRocket } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="col-span-2 pt-10 h-full font-primary_font bg-cardBg">
      <ul>
        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48 active:bg-red-400 ">
          <Link exact  to="/settings/general" className="flex ml-2 gap-4 justify-center items-center" activeClassName="border-l-blue-700 text-blue-700  bg-red-500 red_gar " >
            <FaCog className=' hover:animate-spin' /> General
          </Link>
        </li>
        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48 ">
          <NavLink to="/settings/account" className="flex ml-2 gap-4 justify-center items-center" activeClassName="border-l-blue-700 text-blue-700">
            <FaUser className=' hover:scale-x-50' /> Account
          </NavLink>
        </li>
        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48 ">
          <NavLink to="/settings/notifications" className="flex ml-2 gap-4 justify-center items-center" activeClassName="border-l-blue-700 text-blue-700">
            <FaBell className='hover:animate-pulse' /> Notifications
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/settings/advance" className={`mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48  ml-2 gap-4 justify-center items-center1 ${(navData) => navData.isActive ? "border-l-blue-700 bg-blue-700":"bg-red-500"} `}>
            <FaRocket /> Advanced
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;