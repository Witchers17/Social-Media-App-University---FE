import React, { useEffect, useState } from "react";
import "./style.css";
import { Modal } from "@mantine/core";
import { Images, IMAGE_EDIT } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateUser } from "../../rtk/authSlice";
import { bucket } from "../../rtk/bucketSlice";
import { BUCKET_URI } from "../../utils/constant";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.authReducer.data?.user);

  const [isVisible, setIsVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const { password, ...other } = user;
  const [formData, setFormData] = useState(other);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="center-text">Are you sure?</h1>
            <p className="center-text">You want to sign out?</p>
            <div className="button-row">
              <button className="button infoButton custom-no" onClick={onClose}>
                No
              </button>
              <button
                className="button infoButton custom-yes"
                onClick={() => {
                  dispatch(reset());
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });

    // confirmAlert({
    //   title: "Confirm to signout",
    //   message: "Are you sure to sign out?",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => dispatch(reset()),
    //     },
    //     {
    //       label: "No",
    //     },
    //   ],
    // });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImage(img);
      setProfileImageUrl(URL.createObjectURL(img));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(bucket(data));
      } catch (err) {}
    }
    dispatch(updateUser(UserData));
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setProfileImageUrl("");
      setProfileImage("");
    }, 600);
  };

  return (
    <div className="ProfileSide">
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img
            src={
              user.profilePicture
                ? BUCKET_URI + user.profilePicture
                : Images.DEFAULT_PROFILE
            }
            alt="CoverImage"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "22rem",
            }}
          />
        </div>
        <div className="ProfileName">
          <span className="name">{formData.firstname}</span>
          <span className="name">{formData.lastname}</span>
        </div>

        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>5</span>
              <span>Followers</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>3</span>
              <span>Following</span>
            </div>
          </div>
          <hr />
        </div>
        <button onClick={() => setIsVisible(true)} className="button r-button">
          Update Profile
        </button>
        <button onClick={handleSignOut} className="button signout-button">
          Sign Out
        </button>
      </div>

      <Modal
        title="Your Informations"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened={isVisible}
        onClose={handleClose}
      >
        <form className="infoForm">
          <label for="file-upload" class="custom-file-upload">
            <img
              alt="profile"
              src={
                profileImageUrl
                  ? profileImageUrl
                  : formData.profilePicture
                  ? BUCKET_URI + formData.profilePicture
                  : Images.IMAGE_EDIT
              }
              style={{ height: "100%", width: "100%", borderRadius: "50%" }}
            />
          </label>
          <input
            onChange={onImageChange}
            id="file-upload"
            type="file"
            name="profileImage"
          />

          <div>
            <input
              value={formData.firstname}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              name="firstname"
              className="infoInput"
            />
            <input
              value={formData.lastname}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              name="lastname"
              className="infoInput"
            />
          </div>

          <div>
            <input
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="Address"
              name="address"
              className="infoInput"
            />
            <input
              value={formData.email}
              onChange={handleChange}
              type="text"
              placeholder="Email"
              name="email"
              className="infoInput"
            />
          </div>

          <div>
            <input
              value={formData.phoneNumber}
              onChange={handleChange}
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              className="infoInput"
            />
            <input
              value={formData.emergencyContactNumber}
              onChange={handleChange}
              type="text"
              placeholder="Emergency Contact"
              name="emergencyContactNumber"
              className="infoInput"
            />
            <input
              value={formData.course}
              onChange={handleChange}
              type="text"
              placeholder="Course"
              name="course"
              className="infoInput"
            />
          </div>

          <div>
            <input
              value={formData.yearOfStudy}
              onChange={handleChange}
              type="text"
              placeholder="Year of Study"
              name="yearOfStudy"
              className="infoInput"
            />
            <input
              value={formData.specialization}
              onChange={handleChange}
              type="text"
              placeholder="Specialization"
              name="specialization"
              className="infoInput"
            />
          </div>

          {/* <div>
            <input
              value={formData.worksAt}
              onChange={handleChange}
              type="text"
              placeholder="Works at"
              name="worksAt"
              className="infoInput"
            />
          </div>

          <div>
            <input
              value={formData.livesIn}
              onChange={handleChange}
              type="text"
              placeholder="Lives in"
              name="livesIn"
              className="infoInput"
            />
            <input
              value={formData.country}
              onChange={handleChange}
              type="text"
              placeholder="Country"
              name="country"
              className="infoInput"
            />
          </div> */}

          {/* <div>
            <input
              value={formData.relationship}
              onChange={handleChange}
              type="text"
              className="infoInput"
              placeholder="Relationship status"
              name="relationship"
            />
          </div> */}

          <button
            onClick={handleSubmit}
            className="button infoButton"
            type="submit"
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileCard;
