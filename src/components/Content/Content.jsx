import moment from "moment";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { Images } from "../../assets/images";
import { BUCKET_URI } from "../../utils/constant";

export default function Content({ content }) {
  return (
    <div className="Post">
      <div className="post-user-container">
        <div className="post-user-left">
          <img
            className="post-user-profile"
            src={
              content.users.profilePicture
                ? BUCKET_URI + content.users.profilePicture
                : Images.DEFAULT_PROFILE
            }
            alt="profile"
          />
          <div className="post-user-details">
            <span className="post-username">{content.users.username}</span>
            <span className="post-time">
              {moment(content.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div>
          <FiMoreHorizontal />
        </div>
      </div>
      <span className="post-desc">{content.desc}</span>
      {content.image && (
        <img src={BUCKET_URI + content.image} alt="Timeline Content" />
      )}

      <div className="like-row">
        <div className="postReact">
          <AiOutlineLike size={20} />
        </div>
        <span className="like-text">0 likes</span>
      </div>
    </div>
  );
}
