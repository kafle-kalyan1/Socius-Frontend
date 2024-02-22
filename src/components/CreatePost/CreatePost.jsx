import React, { useContext, useState } from "react";
import TextEditor from "./TextEditor";
import Button from "/src/components/Button/Button";
import { hideBigPopup, showBigPopup } from "/src/components/BigPopup/BigPopup";
import ImageUploader from "../FileUploader/ImageUploader";
import { useFormik } from "formik";
import Post from '/src/components/Post/Post';
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import  { defaultProfilePic, uploadCloudinary } from "../../Library/Others/Others";
import PreviewPost from "../Post/PreviewPost";
import toast from "react-hot-toast";
import { showLoading } from '/src/components/Loading/Loading';
import APICall from "../../Library/API/APICall";
import TextArea from '/src/components/Input/TextArea';
import { FaTextHeight } from "react-icons/fa";

const CreatePost = ({profile}) => {
  const [content, setContent] = useState("");
  const [isAddImageModalVisible, setAddImageModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      images: null,
      content: "",
    },
    onSubmit: async (values) => {
      if (values.content.trim() == "" && values.content.images == null) {
        toast.error("Please enter content to post");
        return;
      }
      showLoading(true)
      var urls = [];
      if(values.images?.length > 0){
        for (const element of values.images) {
          const imgLinks = await uploadCloudinary(element.originFileObj);
           console.log(imgLinks)
           urls = [...urls, imgLinks.url];
      }
      }
      const final_data = {
        images: urls,
        text_content:formik.values.content
      }
       let response = await APICall('/api/posts/createPost/','POST',final_data).then((res)=>{
toast.success(res.message)
hideBigPopup('createPost')
       }).catch((err)=>toast.error("Something went wrong!")).finally(()=>{
        showLoading(false)
       })

    },
    
  });

  const handleAddImageClick = () => {
    setAddImageModalVisible(true);
  };

  const handleAddImageModalClose = () => {
    setAddImageModalVisible(false);
  };

  const handlePreviewClick = () => {
    showBigPopup({
      id: "preview-post",
      children: (
        <div className="flex flex-col mt-0 bg-cardBg mx-auto w-full p-4 rounded-md overflow-scroll">
          <h1 className="text-2xl mb-2 text-center">Post Preview</h1>
          <PreviewPost
            profileImage={profile.profileImage ? "data:image/png;base64," + profile.profileImage : defaultProfilePic}
            username={profile.username}
            timestamp="0s ago"
            fullname={profile.email}
            postText={formik.values.content}
            images={formik.values.images}
            likes={0}
            comments={0}
            is_verified={true}
            is_suspicious={false}
            shares={0}
          />
          <div className="flex gap-3 justify-evenly">
            <Button
              onClick={() => hideBigPopup("preview-post")}
              text="Close"
              type="danger"
            />
          </div>
        </div>
      ),
      ask: true,
    });
  };

  return (
    <div className="flex flex-col mt-0 bg-cardBg mx-auto w-full  p-4 rounded-md  overflow-scroll">
      <h1 className="text-2xl mb-2 text-center">Create Post</h1>
      <TextArea 
        formik={formik}
        name="content"
        Icon={FaTextHeight}
        rows="4"
        col="60"
        title="Post Text"
        />
      {/* <TextEditor
        content={content}
        setContent={(value) => {
          setContent(value);
          formik.handleChange("content")(value);
        }}
      /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 mt-4 justify-evenly">
        <Button
          onClick={() => {
            formik.submitForm();
          }}
          text={`<u>P</u>ost`}
          type="primary"
        />
        <Button
          onClick={handlePreviewClick}
          text={`P<u>r</u>eview`}
          type="txtPrimary"
          disabled={true}
        />
        <Button
          onClick={handleAddImageClick}
          text={`<u>A</u>dd Image`}
          type="secondary"
        />
        <Button
          onClick={() => {
            hideBigPopup('createPost',true);
          }}
          text="<u>C</u>ancel"
          type="danger"
          shortCutKey="c"
        />
      </div>
      {isAddImageModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center z-40 mx-auto bg-opacity-50 bg-gray-800">
          <div className="mt-6 p-4 w-11/12 min-w-md bg-cardBg rounded-md shadow-md overflow-scroll">
            <h1 className="text-2xl mb-2 text-center">Add Images</h1>
            <ImageUploader
              formik={formik}
              title={"Please select Images"}
              name={"images"}
              max={5}
            />
            <div className="flex gap-3 justify-evenly">
              <Button
                onClick={() => handleAddImageModalClose()}
                text={`<u>A</u>dd Image`}
                type="primary"
              />
              <Button
                onClick={() => handleAddImageModalClose()}
                text="Cancel"
                type="danger"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
