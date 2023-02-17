import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillCamera,
  AiOutlineClose,
  AiOutlineVideoCameraAdd,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Images } from "../../assets/images";
import { bucket } from "../../rtk/bucketSlice";
import { getTimelineContents } from "../../rtk/contentSlice";
import { API_URI, BUCKET_URI } from "../../utils/constant";
import { message } from "antd";

export default function ContentShare() {
  const user = useSelector((state) => state.authReducer.data).user;
  const publishloading = useSelector((state) => state.contentReducer.loading);

  const [image, setImage] = useState(null);

  const imageRef = useRef();
  const description = useRef();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getTimelineContents(user._id));
  }, []);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const warning = () => {
      messageApi.open({
        type: "warning",
        content: "Write something!",
      });
    };

    if (description.current.value === "" && image === null) {
      warning();
    } else {
      messageApi.open({
        type: "loading",
        content: "Uploading in progress...",
      });
      const newPost = {
        userId: user._id,
        desc: description.current.value,
        users: user._id,
      };

      if (image) {
        const data = new FormData();
        const fileName = Date.now() + image.name;
        data.append("name", fileName);
        data.append("file", image);
        newPost.image = fileName;
        try {
          dispatch(bucket(data));
        } catch (err) {}
      }
      axios
        .post(`${API_URI}/content`, newPost)
        .then((res) => {
          dispatch(getTimelineContents({}));
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: "Uploading finished.",
          });
        })
        .catch((err) => {
          messageApi.destroy();
        });

      reset();
    }
  };

  const reset = () => {
    setImage(null);
    description.current.value = "";
  };

  return (
    <div className="PostShare">
      {contextHolder}
      <img
        src={
          user.profilePicture
            ? BUCKET_URI + user.profilePicture
            : Images.DEFAULT_PROFILE
        }
        alt="Profile"
      />
      <div>
        <input
          ref={description}
          type="text"
          placeholder={`What's on your mind, ${user?.username} ?`}
          required
        />
        <div className="postOptions">
          <div
            onClick={() => imageRef.current.click()}
            className="option"
            style={{ color: "var(--photo)" }}
          >
            <AiFillCamera style={{ marginRight: "3px" }} size={25} />
            <span className="option-title"> Photo</span>
          </div>

          <div className="option" style={{ color: "var(--shedule)" }}>
            <AiOutlineVideoCameraAdd style={{ marginRight: "3px" }} size={25} />
            <span className="option-title"> Video</span>
          </div>
          <button
            disabled={publishloading}
            onClick={handleUpload}
            className="button ps-button"
          >
            {publishloading ? "uploading" : "Publish"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <AiOutlineClose onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
}
