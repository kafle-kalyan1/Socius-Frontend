import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '/Favicons/Android.png'

import {ArrowLeftOutlined, SearchOutlined, HomeOutlined, MessageOutlined, CompassOutlined, UserOutlined, SettingOutlined, LogoutOutlined, DownOutlined,
  UserAddOutlined,
} from '@ant-design/icons'

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [mobilenav, setmobilenav] = useState(false)
  const [scrSize, setscrSize] = useState(0);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setscrSize(window.innerWidth)
      if (scrSize > 500) {
        setmobilenav(false)
      }
    })

  }, [scrSize])

  useEffect(() => {
    let a = window.addEventListener('keydown', (e) => {
      if (e.altKey && e.key == "a") {
        setOpen(!open)
      }
    })
    return () => a
  })

  const Menus = [
    { title: "Home" , path:"/"},
    { title: "Explore",  icon: <CompassOutlined className='w-5 h-6'/>,
    submenu: true,
    submenuItems: [
      { title: "Explore Profile", icon: <UserAddOutlined className='w-5 h-6'/>, to:"/explore"},
    ]
  },
    { title: "Message", icon: <MessageOutlined className='w-5 h-6'/> },

    { title: "Profile", spacing: true, icon: <UserOutlined className='w-5 h-6'/> ,path:"/profile" },
    { title: "Setting", icon: <SettingOutlined className='w-5 h-6'/> },
    { title: "Logout", icon: <LogoutOutlined className='w-5 h-6'/> }
  ];
  return (
    <>
      <div className='flex '>
        <div className={`bg-primary_hover h-full ${open ? "px-4" : "px-3"} pt-8  ${open ? "w-72" : "w-20"} duration-300 ${mobilenav && scrSize < 500 ? "invisible  w-0 " : ""} $ relative  ${mobilenav && 'opacity-0'} `}>
          <ArrowLeftOutlined  className={`bg-primary text-white text-2xl rounded-full absolute -right-3 top-9 border border-purple-800 cursor-pointer ${!open && "rotate-180"}`} onClick={() => { setOpen(!open) }} />
          <div className='inline-flex'>
            <img className={` w-9 h-9 rounded cursor-pointer block float-left ml-1 duration-500 ${open && "rotate-[360deg]"}`} src={Logo}/>
            <h1 className={`text-black origin-left font-medium text-2xl duration-300 ${!open && "scale-0"} ml-4 `}>Socius</h1>
          </div>
          <div className={`flex items-center rounded-md bg-slate-100 mt-6 ${!open ? "px-4" : "px-2.5"} py-2 `}>
            <SearchOutlined className='text-purple-800 text-lg block float-left cursor-pointer' />
            <input type={"search"} placeholder='Search' className={`text-base bg-transparent w-full text-purple-800 focus:outline-none ${!open && "hidden"}`} />
          </div>
          <ul className={`pt-2 `}>
            {Menus.map((menu, index) => (              
            <NavLink key={index} to={menu.path}>
                <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 hover:bg-slate-500 ${menu.spacing ? "mt-[40%]" : "mt-1"}`}>
                  <span className='text-2xl block float-left'>
                    {menu.icon ? menu.icon :<HomeOutlined  className='w-5 h-6'/>}
                  </span>
                  <span className={`text-base font-medium flex-1 duration-500 ${!open && "hidden"}`}>{menu.title}</span>
                  {menu.submenu && (
                    <DownOutlined className={`${submenuOpen && "rotate-180"} ${!open && "hidden"}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
                  )}
                </li>
                {menu.submenu && submenuOpen && open && (
                  <ul>
                    {menu.submenuItems.map((submenuItem, index) => (
                      <Link key={index} to={submenuItem.to}>
                      <li key={index} className={`text-gray-300 ml-4 text-xs flex items-center gap-x-1 cursor-pointer p-1 rounded-md mt-1 hover:bg-slate-500`}>
                        <span className='text-xl block float-left'>
                          {submenuItem.icon ? submenuItem.icon :<HomeOutlined  className='w-5 h-6'/>}
                        </span>
                        <span className={`text-base font-medium flex-1 duration-500 ${!open && "hidden"}`}>{submenuItem.title}</span>
                      </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>

    </>
  )
}

export default Sidebar