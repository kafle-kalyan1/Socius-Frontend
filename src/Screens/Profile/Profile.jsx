import React, { useContext, useEffect, useRef, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Styles.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
// import { IoAddCircleSharp } from "react-icons/io5";
import Modal from "../../components/Modal/Index";

const Profile = () => {
  const [followerModal, setFollowerModal] = useState(false);
  const { profile } = useContext(ProfileContext);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setFollowerModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  let data = [
    { name: "ram", followers: 100 },
    { name: "shayam", followers: 500 },
    { name: "hari", followers: 1000 },
  ];
  return (
    <div className="profile-page">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profilepic">
            {profile && profile.data2.profile_picture ? (
              <img
                src={`https://res.cloudinary.com/dfvekucsr/${profile.data2.profile_picture}`}
                alt="Profile Picture"
                className="profile-picture"
              />
            ) : (
              <div className="profile-picture-placeholder"></div>
            )}
          </div>
          <div className="username">
            {profile && profile.data1.username ? (
              <h1 className="username">{profile.data1.username}</h1>
            ) : (
              <Link to={"/profile/edit"} className="username">
                Add New User Name
              </Link>
            )}

            {followerModal ? (
              <Modal
                title="Followers"
                data={data}
                setShowModal={setFollowerModal}
                ref={modalRef}
              />
            ) : null}

            <div className="stats">
              <div style={{ cursor: "auto" }} className="stats-item">
                <span className="quantity">{0}</span>
                <span className="label">Posts</span>
              </div>
              <div
                onClick={() => setFollowerModal(!followerModal)}
                className="stats-item"
              >
                <span className="quantity">146M</span>
                <span className="label">Followers</span>
              </div>
              <div className="stats-item">
                <span className="quantity">{10}</span>
                <span className="label">Following</span>
              </div>
            </div>
          </div>

          <div className="right">
            <Link className="btn btn-primary m-1" to="/profile/edit">
              {/* <AiOutlineEdit /> Edit Profile */}
            </Link>
            <Link className="btn btn-success m-1" to="/profile/edit">
              {/* <IoAddCircleSharp /> New Post */}
            </Link>
          </div>
        </div>
        <div className="bio">
          {profile && profile.data2.bio ? (
            <h1 className="bio">{profile.data2.bio}</h1>
          ) : (
            <Link to={"/profile/edit"} className="bio">
              Add Bio
            </Link>
          )}
        </div>
      </div>
      <div className="section">
        <div className="posts">
          <div className="section-title">POST</div>
          <div className="section-item">
            <h1>HELLO</h1>
            <h1>HELLO</h1>
          </div>
        </div>
        <div className="posts">
          <div className="section-title">POST</div>
          <div className="section-item">
            <h1>HELLO</h1>
            <h1>HELLO</h1>
          </div>
        </div>
        {/* <div className="likes">Likes</div>
        <div className="collection">Collection</div> */}
      </div>
    </div>
  );
};

export default Profile;
