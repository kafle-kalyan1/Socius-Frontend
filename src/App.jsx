import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Routes";
import { ConfigProvider } from "antd";
import { ProfileProvider  } from "./context/ProfileContext/ProfileContext";
import { MenuContext, MenuContextProvider } from "./context/MenuContext/MenuContext";
import  Sidebar  from '/src/components/Sidebar/Sidebar';
import { useContext, useEffect } from "react";
import MobileNavbar from "./components/Sidebar/MobileNavbar";
import { ThemeContext } from "./context/ThemeContext/Index";
import { showLoading } from "./components/Loading/Loading";
import APICall from "./Library/API/APICall";
import toast from "react-hot-toast";
import { uploadCloudinary } from "./Library/Others/Others";


function App() {
  const { isMobile } = useContext(MenuContext);
  const {isDarkTheme} = useContext(ThemeContext);

  useEffect(() => {
    postSavedPosts();
  }, []);

  
const postSavedPosts = async () => {
  let db;
  let request = indexedDB.open("offlinePosts", 1);

  request.onsuccess = function(event) {
    db = event.target.result;

    let transaction = db.transaction(["posts"], "readwrite");
    let objectStore = transaction.objectStore("posts");
    let getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function(event) {
      let posts = getAllRequest.result;
      posts.forEach(async (post, index) => {
        // Your existing code to post data
        let urls = [];
        console.log(post);
        // if(post.image){
        //   for (const element of post.image) {
            const imgLinks = await uploadCloudinary(post.image);
            urls = [...urls, imgLinks.url];
          // }
        // }
        const final_data = {
          images: urls,
          text_content: post.text
        }
        let response = await APICall('/api/posts/createPost/','POST',final_data).then((res)=>{
          toast.success(res.message)
          // Delete the post from IndexedDB
          let deleteTransaction = db.transaction(["posts"], "readwrite");
          let deleteObjectStore = deleteTransaction.objectStore("posts");
          let deleteRequest = deleteObjectStore.delete(index+1);
          deleteRequest.onsuccess = function(event) {
            console.log("Post deleted successfully.");
          };
        }).catch((err)=>console.log(err)).finally(()=>{
          showLoading(false)
        });
      });
    };
  };
}

window.addEventListener('online', postSavedPosts);


  return (
    <BrowserRouter>
    <ProfileProvider>
      <ConfigProvider
       theme={{
      token: {
        colorPrimary: '#5C6BC0',
        colorBgBase:isDarkTheme ? "#4B5563" :'#D1D5DB',
        controlOutlineWidth:0,
        lineWidth:2,
        lineHeight:	1.8,
        colorBorder:'#d1d5db',
        colorTextPlaceholder: isDarkTheme ? '#9CA3AF' : '#6B7280',
        colorTextBase: isDarkTheme ? '#F9FAFB' : '#111827',
      },
      components:{
        Select:{
          lineWidth:2,
          colorBgBase:'#0eb0a1',
          optionSelectedBg:'rgba(59, 115, 245,.5)',
          
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
          margin:0,
          padding:0,
        },
        Segmented:{
          itemSelectedBg:'rgba(33,150,243,.1)',
          itemSelectedColor:'#2196f3',
        },
        Modal:{
        colorBgBase:isDarkTheme ? "#0eb0a1" :'#0eb0a1',




       
        },
        Tooltip:{
          colorBgBase:isDarkTheme ? "#F9FAFB" :'#111827',
          colorTextBase:isDarkTheme ? '#F9FAFB' : '#111827',
          colorBorder:isDarkTheme ? '#9CA3AF' : '#6B7280',
          

        },
        Card:{
          colorBgBase:isDarkTheme ? "#4B5563" :'#D1D5DB',
          colorBorder:isDarkTheme ? '#9CA3AF' : '#6B7280',
          colorTextBase:isDarkTheme ? '#F9FAFB' : '#111827',
        },
        Switch:{
          colorBgBase:isDarkTheme ? "#4B5563" :'#9CA3AF',
          colorTextBase:isDarkTheme ? '#F9FAFB' : '#9CA3AF',
          colorBorder:isDarkTheme ? '#9CA3AF' : '#9CA3AF',
          colorBgContainer:isDarkTheme ? "#4B5563" :'#9CA3AF',
          colorBgThumb:isDarkTheme ? "#F9FAFB" :'#9CA3AF',
          colorBgThumbChecked:isDarkTheme ? "#F9FAFB" :'#9CA3AF',
          colorBorderThumb:isDarkTheme ? '#9CA3AF' : '#9CA3AF',
          colorBorderThumbChecked:isDarkTheme ? '#9CA3AF' : '#9CA3AF',
          colorTextThumb:isDarkTheme ? '#F9FAFB' : '#9CA3AF',
          colorTextThumbChecked:isDarkTheme ? '#F9FAFB' : '#9CA3AF',
          
        },
      }
       }}
      >
    <div className="w-screen h-screen font-primary_font bg-cardBg2 dark:bg-darkcardBg2 m-0 p-0 overflow-y-auto max-h-[100vh] scroll-smooth  scroll-bar flex">

   { window.location.pathname=='/login' || window.location.pathname=='/register' || window.location.pathname == "/forgetPassword" ? null : isMobile ?  <MobileNavbar />  : 
   location.pathname.startsWith('/message') ?
   <div className="w-fit">
     <Sidebar />
    </div>
   :
   <div className="w-1/5">
     <Sidebar />
    </div>
   }

   { window.location.pathname=='/login' || window.location.pathname=='/register' || window.location.pathname == "/forgetPassword" ?
   <div className="w-full scroll-smooth overflow-y-auto overflow-x-hidden block right-0]">
     <AppRoute />
   </div>
   :
   location.pathname.startsWith('/message') ?
   <div className=" w-full max-md:w-full scroll-smooth overflow-y-auto overflow-x-hidden block right-0 max-md:h-[92%]">
     <AppRoute />
   </div>
   :
   <div className="w-4/5 max-md:w-full scroll-smooth overflow-y-auto overflow-x-hidden block right-0 max-md:h-[92%]">
     <AppRoute />
   </div>
   }

    </div>

    </ConfigProvider>
    </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;