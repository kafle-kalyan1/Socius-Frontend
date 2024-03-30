import React, { useContext, useEffect, useRef, useState } from "react";
import {  AudioRecorder } from 'react-audio-voice-recorder';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import APICall from "../../Library/API/APICall";
import { copy, defaultProfilePic, defaultURL, socketLink, timeAgo } from "../../Library/Others/Others";
import PostSkeleton from "./PostSkeleton";
import { MenuContext } from '/src/context/MenuContext/MenuContext';
import CustomPopover from "../PopOver/PopOver";
import { CopyIcon, Droplets } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdComment, MdCopyAll, MdDeleteForever } from "react-icons/md";
import { useFormik } from "formik";
import TextArea from "../Input/TextArea";
import { FaComment, FaCommentAlt, FaCopy } from "react-icons/fa";
import Button from "../Button/Button";
import SinglePostComponent from "./Component/SinglePostComponent";
import toast from "react-hot-toast";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import { w3cwebsocket } from "websocket";
import Alert, { showModal } from "../Alert/Alert";
import axios from "axios";
import Cookies from "js-cookie";
import AudioPlayer from "./Component/AudioPlayer";



const SinglePost = () => {
   const navigate = useNavigate()
   const id = useParams("id")
   const { isMobile } = useContext(MenuContext);
   const {profile} = useContext(ProfileContext)
   const [isLoading, setIsLoading] = useState(true)

   const [audioBlob, setAudioBlob] = useState(null);
   const [isRecording, setIsRecording] = useState(false);
   const [audioURL, setAudioURL] = useState(null);
   const comment_ref = useRef()
   const formik = useFormik({
      initialValues: {
         comment:"",
         post_id:null,
         voice_comment:null
      },
      onSubmit: async (values)=>{
         if (values.comment.trim() === "" && !audioBlob) {
            toast.error("Please enter a comment or record a voice message");
            comment_ref.current.focus();
            return;
          }
        
          const formData = new FormData();
          formData.append("post_id", values.post_id);
          formData.append("comment", values.comment);
        
          if (audioBlob) {
            formData.append("voice_comment", audioBlob, "voice_comment.wav");
          }       
          const access_token = Cookies.get("access");

        let response = await axios.post('/api/posts/commentPost/',formData,{
         headers: {
               'Content-Type': 'multipart/form-data',
               'Authorization': `Bearer ${access_token}`,
            },
     })
        if(response.status == 201){
            const newSocket = new w3cwebsocket(`${socketLink}/notifications/${profile.username}/`);
          newSocket.onopen = () => {
            newSocket.send(
              JSON.stringify({
                "type":"post_comment",
                "data":{
                  "commenter_username":profile.username,
                  "post_id": postData.id,
                  "comment":values.comment,
                  "receiver":postData.username
                },
              })
            );
          }
           toast.success("Comment Added sucessfully!")
          getData()

           
        }
        else{
         toast.error("something went wrong!")
        }
      }
   })

   const [postData, setPostData] = useState({
      id:id.id,
      username:"",
      email:"",
      profile_picture:defaultProfilePic,
      fullname:"",
      text_content:"",
      images:[],
      timestamp:"",
      is_deepfake:"",
      likes_count:"",
      comments_count:"",
      user_has_liked:"",
      comments:[]
   })

   
   useEffect(()=>{
      getData()
   },[])

   const getData = async() => {
      if(id){
         APICall(`/api/posts/getPost/${id.id}/`,"GET",{}).then((r)=>{
            setPostData((p)=>({
               ...p,
               id:r.post.id,
               username:r.post.user.username,
               email:r.post.user.email,
               profile_picture: r.post.user_profile.profile_picture,
               fullname: r.post.user_profile.fullname,
               text_content:r.post.text_content,
               images:r.post.images,
               timestamp:r.post.timestamp,
               is_deepfake:r.post.is_deepfake,
               likes_count:r.post.likes_count,
               comments_count:r.post.comments_count,
               user_has_liked:r.post.user_has_liked,
               comments:r.comments
            }))
            setIsLoading(false)
            formik.setValues({
               ...formik.values,
               post_id: r.post.id,
               comment:""
             });
         })
      }
      else{
         navigate('/')
      }
   }

   function deleteComment(id, text){
      
      showModal({
         type: "warning",
         title:"Delete Comment",
         message:`Are you sure you want to delete the comment "${text}"?`,
         buttons:[
            {
               title:"Yes",
               onclick: async()=>{
                  var response = await APICall('/api/posts/deleteComment/','POST',{"comment_id":id,
                  "post_id":postData.id
                 })
                 if(response.status == 200){
                      toast.success("Comment Deleted sucessfully!")
                     getData()
                   }
                   else{
                    toast.error("something went wrong!")
                   }
               }
            },
            {
               title:"No",
               onclick:()=>{
                  return
               }
            }
         ]
      })
   
   }

  return (
<div className={` overflow-auto scrollbar  bg-cardBg2 dark:bg-darkcardBg2 block w-full m-auto max-sm:m-0 max-sm:p-0 h-fit mb-20 font-primary_font justify-center items-center rounded-lg border p-10`}>
   {
   isLoading ? <PostSkeleton/> : <>
   
    <SinglePostComponent postData={postData}/>

   <div className="m-2 mt-0">

<div className="w-full px-3 my-2">
    <TextArea
    name="comment"
    title="Enter Your Thoughts!"
    formik={formik}
    Icon={<MdComment/>}
    ref_={comment_ref}
    />
</div>

<div className="w-full flex justify-end px-3">
  <AudioRecorder
    onRecordingComplete={(blob) => {setAudioBlob(blob)
    console.log(blob)
      setAudioURL(URL.createObjectURL(blob));

    }}
    recorderType="audio/wav"
    isRecording={isRecording}
    onRecordingStart={() => setIsRecording(true)}
    onRecordingStop={() => {
      setIsRecording(false);
      alert("Recording Stop")
    }}
    onNotAllowedOrFound={(error) => toast.error('Permission error:', error)}
  />
  {
    audioBlob && <Button
    text="Reset"
    onClick={() => {
      setAudioURL(null);
      setAudioBlob(null);
    }}
  />
  }
  

  {/* when recording is complete we can play audio we recorder */}

  {
    audioBlob && (
      <audio controls src={audioURL} />
    )
  }

  
  <Button
    text={"<u>C</u>omment"}
    icon={<MdComment />}
    onClick={() => {
      formik.submitForm();
      // setAudioURL(null);
      // setAudioBlob(null);
    }}
    shortCutKey={"c"}
    width="40"
  />
</div>


</div>

<hr />

<h3 className="font-bold text-center font-primary_font text-xl text-text1 dark:text-text2">Comments</h3>

    <div className="flex flex-col">
    {
      postData.comments && 
      postData.comments.map((cur)=>
      <div className="border rounded-md p-3 text-text1 dark:text-text2 ml-3 my-3" key={cur.id}>
            <div className="flex gap-3 items-center w-full">
                <img src={cur.user_profile.profile_picture || defaultProfilePic }
                    className="object-cover w-8 h-8 rounded-full 
                    
                    "/>
                <h3 className="font-bold">
                    {cur.user_profile.fullname}
                </h3>
                <h3 className="text-right">
                    {timeAgo(cur.timestamp)}
                </h3>
                <CustomPopover
                
          content={"Options"}
          buttons={[
      { icon: <MdCopyAll className="mr-2" />, label: 'Copy Link', onClick: () => copy(window.location.href.split("?")[0]) },
      profile.username === cur.user.username && { icon: <MdDeleteForever className="mr-2" />, label: 'Delete', onClick: () => deleteComment(cur.id, cur.text) },
    ]}
          mainButton={<BsThreeDotsVertical />}
        />
            </div>
            <p className="text-text1 dark:text-text2 mt-2">
                {cur.text}
            </p>
            {cur.voice_comment && (
                <AudioPlayer audioUrl={defaultURL+cur.voice_comment} />
              )}

        </div>
      )
    }
        

    </div>

 
   



   </>
}



</div>
  );
};

export default SinglePost;
