import React, { useContext, useState } from "react";
import TextEditor from "./TextEditor";
import Button from "/src/components/Button/Button";
import { hideBigPopup, showBigPopup } from "/src/components/BigPopup/BigPopup";
import ImageUploader from "../FileUploader/ImageUploader";
import { useFormik } from "formik";
import Post from '/src/components/Post/Post';
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import  { defaultProfilePic } from "../../Library/Others/Others";
import PreviewPost from "../Post/PreviewPost";

const CreatePost = ({profile}) => {
  const [content, setContent] = useState("");
  const [isAddImageModalVisible, setAddImageModalVisible] = useState(false);
  console.log(profile);

  const formik = useFormik({
    initialValues: {
      images: null,
      content: "",
    },
    onSubmit: (values) => {
      debugger;
      console.log(values);
    },
  });

  const handleAddImageClick = () => {
    setAddImageModalVisible(true);
  };

  const handleAddImageModalClose = () => {
    setAddImageModalVisible(false);
  };

  const handlePreviewClick = () => {
    console.log(profile)
    debugger
    showBigPopup({
      id: "preview-post",
      children: (
        <div className="flex flex-col mt-0 bg-cardBg mx-auto w-full h-4/5 p-4 rounded-md overflow-scroll">
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
    <div className="flex flex-col mt-0 bg-cardBg mx-auto w-full h-4/5  p-4 rounded-md  overflow-scroll">
      <h1 className="text-2xl mb-2 text-center">Create Post</h1>
      <TextEditor
        content={content}
        setContent={(value) => {
          setContent(value);
          formik.handleChange("content")(value);
        }}
      />
      <div className="flex gap-3 justify-evenly">
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
        />
        <Button
          onClick={handleAddImageClick}
          text={`<u>A</u>dd Image`}
          type="secondary"
        />
        <Button
          onClick={() => {
            hideBigPopup(true);
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
