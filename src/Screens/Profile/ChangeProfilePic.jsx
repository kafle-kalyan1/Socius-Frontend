import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ImageUploader from "/src/components/FileUploader/ImageUploader"; // Adjust the path
import Button from "/src/components/Button/Button";
import { UserIcon } from "/src/Library/Icons/Icons";
import { hideBigPopup } from "/src/components/BigPopup/BigPopup";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const ChangeProfilePic = (profile_picture) => {
   profile_picture = profile_picture.profile_picture;
  const formik = useFormik({
    initialValues: {
      profile_picture: null,
    },
    onSubmit: (values) => {
      let accessToken = Cookies.get("access");
      if (!values.profile_picture) {
         toast.error("Please choose a new profile picture before saving.");
         return;
       }
      axios.post("/api/auth/updateProfilePicture/",values,{
         headers: {
           Authorization: `Bearer ${accessToken}`
         }
       }).then((res) => {
        if (res.data.status_code == 200) {
          toast.success("Profile picture changed successfully");
          hideBigPopup();
        }
      }).catch((err) => {
         toast.error("Something went wrong");
       })
      ;
    },
  });

  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
   debugger;
    if (profile_picture) {
      setIsDefault(false);
      formik.setValues({ ...formik.values, profile_picture: profile_picture });
    } else {
      setIsDefault(true);
    }
  }, []);

  const handleCancel = () => {
    hideBigPopup();
  };

   const changeProfile = () => {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.click();
      input.onchange = async () => {
         let file = input.files[0];
         let reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => {
            formik.setValues({ ...formik.values, profile_picture: reader.result });
            console.log(reader.result);
            setIsDefault(false);
         };
         reader.onerror = (error) => {
            toast.error('Error: ', error);
            console.log('Error: ', error);
         };
      };
   }

  return (
    <div className="flex flex-col mx-auto bg-background rounded-md w-1/3 h-screen my-0">
      {isDefault ? (
        <img
          className="h-96 w-auto mx-auto rounded-full"
          src={ "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          }
          alt=""
        />
      ) : (<>

         {
         console.log(formik.values.profile_picture)
      }
         <img
            className="h-96 w-auto mx-auto rounded-full"
            src={formik.values.profile_picture}
            alt="Profile Pic"
         />         
      </>
      )}

      <div className="flex justify-center align-middle gap-4 ">
        <Button
          type="secondary"
          text="Save"
          width={20}
          onClick={formik.handleSubmit}
        />
        <Button
          type="primary"
          text="Change"
          width={20}
          onClick={changeProfile}
        />
        <Button type="danger" text="Cancel" width={20} onClick={handleCancel} />
      </div>
    </div>
  );
};

export default ChangeProfilePic;
