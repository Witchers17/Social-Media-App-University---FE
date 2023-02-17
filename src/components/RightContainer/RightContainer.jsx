import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavigationBar from "../NavigationBar/NavigationBar";
import { PERSON } from "./dummy";
import "./style.css";

export default function RightContainer() {
  return (
    <div className="RightSide">
      <NavigationBar />
      <div className="FollowersCard">
        <h3 className="around-people-text">People you may know</h3>
        {PERSON.map((person, id) => {
          return (
            <div className="follower">
              <div>
                <img
                  src="https://img.etimg.com/thumb/msid-72224533,width-1200,height-900,imgsize-408708,overlay-etpanache/photo.jpg"
                  alt="profile"
                  className="followerImage"
                />
                <div className="name">
                  <span>{person.firstname}</span>
                  <span>@{person.username}</span>
                </div>
              </div>
              <button className={"button fc-button"}>
                <AiOutlinePlus className="plus-icon" /> Follow
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
