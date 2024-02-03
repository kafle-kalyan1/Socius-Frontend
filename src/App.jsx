import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Routes";
import { ConfigProvider } from "antd";
import { ProfileProvider  } from "./context/ProfileContext/ProfileContext";
import { MenuContext, MenuContextProvider } from "./context/MenuContext/MenuContext";
import { NotificationProvider, useNotification  } from './context/NotificationContext/NotificationContext';
import  Sidebar  from '/src/components/Sidebar/Sidebar';
import { useContext } from "react";
import MobileNavbar from "./components/Sidebar/MobileNavbar";


function App() {
  const { isMobile } = useContext(MenuContext);
  return (
    <BrowserRouter>
    <NotificationProvider>
    <ProfileProvider >
      <ConfigProvider
       theme={{
      token: {
        colorPrimary: '#5C6BC0',
        colorBgBase:'#f2f4f5',
        controlOutlineWidth:0,
        lineWidth:2,
        lineHeight:	1.8,
        colorBorder:'#d1d5db',
      },
      components:{
        Select:{
          lineWidth:2,
          colorBgBase:'#f7f8fa',
        },
        Upload:{
          colorPrimaryActive:'#d40000',
        },
        Button:{
        primaryColor:'#5C6BC0',
        colorBgBase:'#5C6BC0',

        },
        DatePicker:{
          fontWeightStrong:800,
          fontFamily:'monospace',
        },
        Popover:{
          zIndexPopup:30,
        },
        Segmented:{
          itemSelectedBg:'rgba(33,150,243,.1)',
          itemSelectedColor:'#2196f3',
        }
      }
       }}
      >
    <div className="w-screen h-screen font-primary_font dark:bg-dark_background bg-background m-0 p-0 overflow-y-auto max-h-[100vh] scroll-smooth  scroll-bar">
   { window.location.pathname=='/login' || window.location.pathname=='/register' ? null : isMobile ? <MobileNavbar /> : 
       <Sidebar />
   }
     <AppRoute />

    </div>

    </ConfigProvider>
    </ProfileProvider>
    </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;