import { useState } from "react";
import Button from "/src/components/Button/Button";
import { hideBigPopup } from "/src/components/BigPopup/BigPopup";
import ImageUploader from "../FileUploader/ImageUploader";
import { useFormik } from "formik";
import { uploadCloudinary } from "../../Library/Others/Others";
import toast from "react-hot-toast";
import { showLoading } from '/src/components/Loading/Loading';
import APICall from "../../Library/API/APICall";
import TextArea from '/src/components/Input/TextArea';
import { FaPlus, FaTextHeight } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "@/extracomponents/ui/popover";
import { BsEmojiSunglasses } from "react-icons/bs";
import { RiDraftFill } from 'react-icons/ri';
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Separator } from "@/extracomponents/ui/separator";
import 'tailwindcss/tailwind.css';
import EmojiPicker from "emoji-picker-react";

const CreatePost = ({ profile }) => {
  const [isAddImageModalVisible, setAddImageModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      images: [],
      content: "",
      as_draft: false,
    },
    onSubmit: async (values) => {
      if (values.content.trim() === "" && values.images.length === 0) {
        toast.error("Please enter content to post");
        return;
      }
      showLoading(true);
      let urls = [];
      if (values.images.length > 0) {
        for (const element of values.images) {
          const imgLinks = await uploadCloudinary(element.originFileObj);
          urls = [...urls, imgLinks.url];
        }
      }
      const final_data = {
        images: urls,
        text_content: formik.values.content,
        as_draft: formik.values.as_draft,
      };
      APICall('/api/posts/createPost/', 'POST', final_data)
        .then((res) => {
          toast.success(res.message);
          hideBigPopup('createPost');
        })
        .catch((err) => toast.error("Something went wrong!"))
        .finally(() => {
          showLoading(false);
        });
    },
  });

  const handleAddImageClick = () => {
    setAddImageModalVisible(true);
  };

  const handleAddImageModalClose = () => {
    setAddImageModalVisible(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    debugger;
    formik.setFieldValue("content", formik.values.content + event.emoji);
  };

  const postAsDraft = () => {
    formik.setFieldValue("as_draft", !formik.values.as_draft);
    formik.submitForm();
  };

  const handleImageRemove = (index) => {
    const newImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", newImages);
  };

  return (
    <div className="flex flex-col mt-0 bg-white dark:bg-gray-800 mx-auto w-full max-w-3xl p-6 rounded-md shadow-md">
      <h1 className="text-2xl mb-4 text-center text-gray-800 dark:text-gray-200">Create Post</h1>

      <TextArea
        formik={formik}
        name="content"
        icon={FaTextHeight}
        rows="4"
        col="60"
        title="Create Post"
        placeholder="Write something here..."
        className="mb-4"
      />

      {formik.values.images && formik.values.images.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4">
          {formik.values.images.map((image, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <img
                src={URL.createObjectURL(image.originFileObj)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded-md shadow"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 text-white bg-red-600 rounded-full p-1 transform -translate-y-1/2 translate-x-1/2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 justify-evenly">
        <Button
          onClick={() => {
            formik.submitForm();
          }}
          text={`<u>P</u>ost`}
          type="primary"
          shortCutKey="p"
          className="w-full sm:w-auto"
        />

        <div className="relative">
          <Menu menuButton={
            <MenuButton className="relative">
              <Button
                text="More"
                type="secondary"
                className="w-full sm:w-auto"
              />
            </MenuButton>
          } transition>
            <MenuItem>
              <span className="cursor-pointer flex text-gray-800 dark:text-gray-200 ml-3" onClick={handleAddImageClick}>
                <FaPlus className="mr-2" />
                Add Image
              </span>
            </MenuItem>
            <MenuItem>
              <Popover>
                <PopoverTrigger>
                  <span className="cursor-pointer flex text-gray-800 dark:text-gray-200 ml-3">
                    <BsEmojiSunglasses className="mr-2" />
                    Add Emoji
                  </span>
                </PopoverTrigger>
                <PopoverContent>
                  <EmojiPicker onEmojiClick={onEmojiClick} height="400px" width="300px" previewConfig={{
                    showPreview: false,
                  }} lazyLoadEmojis={true}
                  categories = {[
  {
    category: 'suggested',
    name: 'Recently Used'
  },
  {
    category: 'smileys_people',
    name: 'Faces...'
  }
]}
                   />
                </PopoverContent>
              </Popover>
            </MenuItem>
            <Separator />
            <MenuItem>
              <span className="cursor-pointer flex text-gray-800 dark:text-gray-200 ml-3" onClick={postAsDraft}>
                <RiDraftFill className="mr-2" />
                Post as Draft
              </span>
            </MenuItem>
          </Menu>
        </div>

        <Button
          onClick={() => {
            hideBigPopup('createPost', false);
          }}
          text="<u>C</u>ancel"
          type="danger"
          shortCutKey="c"
          className="w-full sm:w-auto"
        />
      </div>

      {isAddImageModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center z-40 bg-opacity-50 bg-gray-800">
          <div className="mt-6 p-6 w-full max-w-lg bg-white dark:bg-gray-800 rounded-md shadow-md">
            <h1 className="text-2xl mb-4 text-center text-gray-800 dark:text-gray-200">Add Images</h1>
            <ImageUploader
              formik={formik}
              title={"Please select Images"}
              name={"images"}
              max={5}
            />
            <div className="flex gap-3 justify-evenly mt-4">
              <Button
                onClick={handleAddImageModalClose}
                text="Done"
                className="w-full sm:w-auto"
                type="primary"
              />
              <Button
                onClick={() => {
                  formik.setFieldValue("images", []);
                }}
                text="Clear All"
                className="w-full sm:w-auto"
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
