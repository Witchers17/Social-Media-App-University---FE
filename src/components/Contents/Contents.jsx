import React, { useEffect } from "react";
// import { getTimelinePosts } from "../../actions/PostsAction";
// import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
// import "./Posts.css";
import { Spin } from "antd";
import { getTimelineContents } from "../../rtk/contentSlice";
import Content from "../Content/Content";

const Contents = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.contentReducer.data);
  const contentloading = useSelector(
    (state) => state.contentReducer.contentloading
  );

  useEffect(() => {
    dispatch(getTimelineContents({}));
  }, []);
  //   if (!posts) return "No Posts";
  //   if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {contentloading ? (
        <Spin tip="Loading" />
      ) : (
        content?.map((post, id) => {
          return <Content content={post} key={id} />;
        })
      )}
    </div>
  );
};

export default Contents;
