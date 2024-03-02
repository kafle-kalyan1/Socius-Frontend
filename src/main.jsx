import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProfileProvider } from "./context/ProfileContext/ProfileContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MenuContextProvider } from "./context/MenuContext/MenuContext.jsx";
import { ThemeProvider } from "./context/ThemeContext/Index.jsx";
import { MessageNotificationProvider } from "./context/NotificationContext/MessageNotificationContext.jsx";
// import MessageSocket from "./Socket/MessageSocket.jsx";
import { NotificationProvider  } from './context/NotificationContext/NotificationContext';
import { uploadCloudinary } from "./Library/Others/Others.jsx";
import APICall from "./Library/API/APICall.jsx";
import { showLoading } from "./components/Loading/Loading.jsx";

const postSavedPosts = async () => {
  alert("You are online now! Posting saved posts...");
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


ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <React.StrictMode>
  <MenuContextProvider>
<NotificationProvider>

  <Toaster
  position="top-right"
  reverseOrder={false}
/>
<MessageNotificationProvider>

    <ThemeProvider>

    <ProfileProvider>
      <App />
    </ProfileProvider>
    </ThemeProvider>
    </MessageNotificationProvider>
</NotificationProvider>

    </MenuContextProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
