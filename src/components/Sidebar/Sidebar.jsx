import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  Search,
  Home,
  Compass,
  MessageCircle,
  UsersIcon,
  UserCircle,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { MenuContext } from "/src/context/MenuContext/MenuContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { copy } from "../../Library/Others/Others";
import { useLocation } from "react-router-dom";
import Logo from "/public/Favicons/Android.png";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import Cookies from "js-cookie";
import CustomPopover from "../PopOver/PopOver";
import { showModal, hideAlertModal } from "/src/components/Alert/Alert";
import { defaultProfilePic } from "../../Library/Others/Others";

export const SidebarContext = createContext();

export function Sidebarr({ children }) {
  const { open, setOpen } = useContext(MenuContext);
  const { profile } = useContext(ProfileContext);
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const buttons = [
    { label: "View Profile", onClick: () => navigate("/profile") },
    {
      label: "Log Out",
      onClick: () =>
        showModal({
          type: "warning",
          title: "Logout",
          message: "Are you sure you want to log out?",
          buttons: [
            {
              title: "Yes",
              onclick: () => {
                Cookies.remove("access");
                Cookies.remove("refresh");
                navigate("/login");
                hideAlertModal();
              },
            },
            {
              title: "No",
              onclick: () => {
                navigate("/");
                hideAlertModal();
              },
            },
          ],
          outSideAction: true,
        }),
    },
  ];

  return (
    <aside className={`h-screen scroll-bar2 z-auto ${open ? "w-66" : "w-16"}`}>
      <nav className="h-full scroll-bar2 flex flex-col fixed bg-cardBg border-r border-cardBorder shadow-sm transition-width duration-300 ease-in-out">
        <div className="p-4 pb-2 flex justify-between items-center">
          {open && (
            <span className="flex gap-2">
              <img src={Logo} alt="logo" className="w-8 h-8" />
              <h2 className="text-2xl text-main_text">Socius</h2>
            </span>
          )}
          <button
            onClick={() => setOpen((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {open ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {open && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(search);
            }}
            className="flex relative"
          >
            <input
              type="text"
              placeholder="Search"
              name="text"
              ref={searchRef}
              value={search ? search : ""}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mx-2 h-10 px-3 rounded-md bg-gray-200 text-sm focus:outline-none z-20"
              autoComplete="off"
            />
            <Search
              size={20}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log(search);
              }}
              className="absolute right-4 top-[50%] transform translate-y-[-50%] cursor-pointer text-text_ hover:text-main_text hover:scale-[1.1] hover:duration-200 z-20"
            />
          </form>
        )}
        <SidebarContext.Provider value={{ open }}>
          <ul className="flex-1 px-3 z-20">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={
              profile?.profile_picture
                ? "data:image/png;base64," + profile.profile_picture
                : defaultProfilePic
            }
            alt=""
            className={`w-10 h-10 rounded-md transition-all   cursor-pointer ${
              open ? "" : "hover:scale-125 hover:shadow-lg"
            }`}
            title={profile?.fullname ? profile.fullname : "John Doe"}
            onClick={() => navigate("/profile")}
          />
          {open && (
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${
                open ? "w-52 ml-3" : "w-0 ml-0"
              }`}
            >
              <div className="leading-4">
                <Tooltip
                  placement="top"
                  className="cursor-pointer"
                  title="Copy Username"
                  onClick={() => copy(profile.username)}
                >
                  <h4 className="font-semibold text-main_text cursor-pointer">
                    {profile?.fullname ? profile.fullname : "John Doe"}
                  </h4>
                  <span className="text-xs text-main_text cursor-pointer">
                    @{profile?.username ? profile.username : "johndoe"}
                  </span>
                </Tooltip>
              </div>
              <CustomPopover
                content="Options"
                buttons={buttons}
                mainButton={<MoreVertical cursor="pointer" size={20} />}
                placement="top"
              />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}


export function SidebarItem({ icon, text, onClick, path, alert }) {
  const { open } = useContext(MenuContext);
  const { pathname } = useLocation();
  const isActive = path === "/" ? pathname === path : pathname.startsWith(path);

  const renderItem = (
    <div
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group duration-300 
        ${
          isActive
            ? "bg-primary_btn_bg_very_light text-deep_primary_text"
            : " hover:bg-indigo_bg text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all duration-300 ${
          open ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {alert && isActive && (
        <div
          className={`absolute right-2 w-2 h-2 ml-1 rounded bg-primary_btn_dark ${
            open ? "" : "top-2"
          }`}
        ></div>
      )}

      {!open && !isActive && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </div>
  );

  return onClick ? (
    <div onClick={onClick}>{renderItem}</div>
  ) : (
    <NavLink to={path}>{renderItem}</NavLink>
  );
}

export default function SIdebar() {
  const { open, setOpen } = useContext(MenuContext);

  return (
    <main className="App">
      <Sidebarr>
        {!open && (
          <SidebarItem
            icon={<Search size={20} />}
            text="Search"
            onClick={() => setOpen((curr) => !curr)}
          />
        )}
        <SidebarItem
          icon={<Home size={20} />}
          text="Home"
          path="/"
        />
        <SidebarItem
          icon={<Compass size={20} />}
          text="Explore"
          path="/profile-explore"
        />
        <SidebarItem
          icon={<MessageCircle size={20} />}
          text="Messages"
          path="/message"
          alert={true}
        />
        <SidebarItem
          icon={<UsersIcon size={20} />}
          text="Friends"
          path="/friends"
        />

        <hr className="my-3 mt-6" />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Profile"
          path="/profile"
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          onClick={() => console.log("Settings Clicked")}
        />
        <SidebarItem
          icon={<HelpCircle size={20} />}
          text="Help"
          onClick={() => console.log("Help Clicked")}
        />
      </Sidebarr>
    </main>
  );
}