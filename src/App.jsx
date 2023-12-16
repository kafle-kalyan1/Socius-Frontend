import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Routes";
import { ConfigProvider } from "antd";
import { ProfileProvider  } from "./context/ProfileContext/ProfileContext";
import { MenuContextProvider } from "./context/MenuContext/MenuContext";


function App() {
  return (
    <BrowserRouter>
    <MenuContextProvider>
    <ProfileProvider >

      <ConfigProvider
       theme={{
      token: {
        colorPrimary: '#0eb0a1',
        colorBgBase:'#faf5f5',
        controlOutlineWidth:0,
        lineWidth:2,
        lineHeight:	1.8,
        colorBorder:'#D1D5DB',
      },
      components:{
        Select:{
          lineWidth:2,
        },
        Upload:{
          colorPrimaryActive:'#d40000',
        },
        Button:{
          primaryColor:'#0eb0a1',
        colorBgBase:'#0eb0a1',

        },
        DatePicker:{
          fontWeightStrong:800,
          fontFamily:'monospace',
        }
      }
       }}
      >
    <div className="w-screen h-screen dark:bg-dark_background bg-background m-0 p-0 overflow-y-auto max-h-[100vh] scroll-smooth  scroll-bar">
     <AppRoute />
    </div>

    </ConfigProvider>
    </ProfileProvider>
</MenuContextProvider>
    </BrowserRouter>
  );
}

export default App;