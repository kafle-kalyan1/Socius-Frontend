import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useFormik } from "formik";
import * as yup from "yup";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";

// import {
//   FaBookReader,
//   FaEnvelope,
//   FaFemale,
//   FaGenderless,
//   FaMale,
//   FaPen,
//   FaUser,
//   FaUserCircle,
// } from "react-icons/fa";
import "./Styles.css";
import axios from "axios";
import Cookies from "js-cookie";

const EditProfile = () => {
  const [currProfile, setCurrProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    if (profile && profile.data1 && profile.data2) {
      const { username, email } = profile.data1;
      const { fullname, profile_picture, bio, gender } = profile.data2;
      setCurrProfile({
        username: username,
        email: email,
        fullname: fullname,
        profile_picture: "",
      profile_picture_preview:  "https://res.cloudinary.com/dfvekucsr/" + profile_picture,
        bio: bio,
        gender: gender,
      });
      setIsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (!isLoading) {
      formik.setValues(currProfile);
    }
  }, [isLoading, currProfile]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      fullname: "",
      profile_picture: "",
      profile_picture_preview: "",
      bio: "",
      gender: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      // fullname: yup.string()("Fullname is required"),
      // bio: yup.string()("Bio is required"),
      // gender: yup.string()("Gender is required"),
    }),
    onSubmit: updateProfile,
  });

  const handleFileChange = (event) => {
    // console.log(profile_picture)
    const file = event.target.files[0];
    // console.log(file)
    if (file) {
      formik.setFieldValue("profile_picture", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue("profile_picture_preview", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       formik.setFieldValue("profile_picture_preview", e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  function updateProfile(values) {
    toast.loading("Updating profile...");
    let access = Cookies.get("access");
    if (access) {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("fullname", values.fullname);
      formData.append("bio", values.bio);
      formData.append("gender", values.gender);
      formData.append("profile_picture", values.profile_picture);
      formData.append("profile_picture_preview", values.profile_picture_preview);
      axios
        .put("https://socius.onrender.com/auth/update/", formData, {
          headers: {
            Authorization: "Bearer " + access,
          },
        })
        .then(() => {
          toast.dismiss();
          toast.success("Successfully Updated!!");
        })
        .catch((err) => {
          if (err.response.status === 400){
            toast.dismiss();
          toast.error("Maybe Username Already Exist");
          }
          else{
            toast.dismiss();
            toast.error("Error updating profile");
          }
        });
    } else {
      toast.dismiss();
      toast.error("Error updating profile");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (null
    // <div className="container-edit">
    //   <div className="sidebar">
    //     <Sidebar />
    //   </div>
    //   <div className="EditForm">
    //     <div className="eachForm">
    //       <label htmlFor="profile_picture" className="form-label">
    //         <FaUserCircle style={{ marginRight: "10px" }} />
    //         Profile Picture
    //       </label>
    //       {formik.values.profile_picture_preview && (
    //         <img
    //           src={formik.values.profile_picture_preview}
    //           alt="Profile Picture"
    //           className="profile-picture-preview"
    //         />
    //       )}
    //       <input
    //         type="file"
    //         id="profile_picture"
    //         name="profile_picture"
    //         // value={formik.values.profile_picture}
    //         accept="image/png, image/jpeg"
    //         onChange={handleFileChange}
    //         className={`form-control ${
    //           formik.errors.profile_picture && formik.touched.profile_picture
    //             ? "is-invalid"
    //             : ""
    //         }`}
    //       />
    //       {formik.errors.profile_picture && formik.touched.profile_picture && (
    //         <div className="invalid-feedback">
    //           {formik.errors.profile_picture}
    //         </div>
    //       )}
    //     </div>

    //     <div className="eachForm">
    //       <label htmlFor="username" className="form-label">
    //         <FaUser style={{ marginRight: "10px" }} />
    //         Username
    //       </label>
    //       <input
    //         type="text"
    //         id="username"
    //         name="username"
    //         maxLength={50}
    //         placeholder="Username"
    //         value={formik.values.username}
    //         onChange={formik.handleChange}
    //         className={`form-control ${
    //           formik.errors.username && formik.touched.username
    //             ? "is-invalid"
    //             : ""
    //         }`}
    //       />
    //       {formik.errors.username && formik.touched.username && (
    //         <div className="invalid-feedback">{formik.errors.username}</div>
    //       )}
    //     </div>

    //     <div className="eachForm">
    //       <label htmlFor="email" className="form-label">
    //         <FaEnvelope style={{ marginRight: "10px" }} />
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         maxLength={50}
    //         placeholder="Email"
    //         value={formik.values.email}
    //         onChange={formik.handleChange}
    //         className={`form-control ${
    //           formik.errors.email && formik.touched.email ? "is-invalid" : ""
    //         }`}
    //       />
    //       {formik.errors.email && formik.touched.email && (
    //         <div className="invalid-feedback">{formik.errors.email}</div>
    //       )}
    //     </div>

    //     <div className="eachForm">
    //       <label htmlFor="fullname" className="form-label">
    //         <FaBookReader style={{ marginRight: "10px" }} />
    //         Fullname
    //       </label>
    //       <input
    //         type="text"
    //         id="fullname"
    //         name="fullname"
    //         maxLength={50}
    //         placeholder="Fullname"
    //         value={formik.values.fullname}
    //         onChange={formik.handleChange}
    //         className={`form-control ${
    //           formik.errors.fullname && formik.touched.fullname
    //             ? "is-invalid"
    //             : ""
    //         }`}
    //       />
    //       {formik.errors.fullname && formik.touched.fullname && (
    //         <div className="invalid-feedback">{formik.errors.fullname}</div>
    //       )}
    //     </div>

    //     <div className="eachForm">
    //       <label htmlFor="bio" className="form-label">
    //         <FaPen style={{ marginRight: "10px" }} />
    //         Bio
    //       </label>
    //       <textarea
    //         id="bio"
    //         name="bio"
    //         maxLength={250}
    //         placeholder="Bio"
    //         value={formik.values.bio}
    //         onChange={formik.handleChange}
    //         className={`form-control ${
    //           formik.errors.bio && formik.touched.bio ? "is-invalid" : ""
    //         }`}
    //       />
    //       {formik.errors.bio && formik.touched.bio && (
    //         <div className="invalid-feedback">{formik.errors.bio}</div>
    //       )}
    //     </div>

    //     <div className="eachForm">
    //       <label htmlFor="gender" className="form-label">
    //         <FaMale style={{ marginRight: "10px" }} />
    //         Gender
    //       </label>
    //       <select
    //         id="gender"
    //         name="gender"
    //         value={formik.values.gender}
    //         onChange={formik.handleChange}
    //         className={`form-control ${
    //           formik.errors.gender && formik.touched.gender ? "is-invalid" : ""
    //         }`}
    //       >
    //         <option value="" disabled>
    //           Select Gender
    //         </option>
    //         <option value="Male">Male</option>
    //         <option value="Female">Female</option>
    //         <option value="Other">Other</option>
    //       </select>
    //       {formik.errors.gender && formik.touched.gender && (
    //         <div className="invalid-feedback">{formik.errors.gender}</div>
    //       )}
    //     </div>

    //     <button
    //       type="submit"
    //       className="btn btn-primary"
    //       onClick={formik.handleSubmit}
    //     >
    //       Update Profile
    //     </button>
    //   </div>
    // </div>
  );
};

export default EditProfile;
