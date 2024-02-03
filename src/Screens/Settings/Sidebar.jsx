import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCog, FaUser, FaBell, FaRocket } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="col-span-2 pt-10 h-full font-primary_font">
      <ul>
        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48 ">
          <NavLink to="/settings/general" className="flex ml-2 gap-4 justify-center items-center" activeClassName="border-l-blue-700 text-blue-700">
            <FaCog className=' hover:animate-spin' /> General
          </NavLink>
        </li>
        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48 ">
          <NavLink to="/settings/account" className="flex ml-2 gap-4 justify-center items-center" activeClassName="border-l-blue-700 text-blue-700">
            <FaUser className=' hover:scale-x-50' /> Account
          </NavLink>
        </li>
        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48 ">
          <NavLink to="/settings/notifications" className="flex ml-2 gap-4 justify-center items-center" activeClassName="border-l-blue-700 text-blue-700">
            <FaBell className='  hover:animate-pulse' /> Notifications
          </NavLink>
        </li>
        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 flex w-48 ">
          <NavLink to="/settings/advance" className="flex ml-2 gap-4 justify-center items-center" activeClassName="border-l-blue-700 text-blue-700">
            <FaRocket /> Advanced
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;