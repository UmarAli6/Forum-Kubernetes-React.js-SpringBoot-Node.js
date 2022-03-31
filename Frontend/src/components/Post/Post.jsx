import React from "react";
import "./post.css";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Cookies from "js-cookie";
import { format } from "timeago.js";

const Post = ({ post, user }) => {
  let pic = "/assets/profile/" + (Cookies.get("lastId") - user.id) + ".jpg"
  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={pic}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{user.name}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.content}</span>
          <img src={"pic"} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpOffAltIcon className="likeIcon"></ThumbUpOffAltIcon>
            <ThumbDownOffAltIcon className="likeIcon"></ThumbDownOffAltIcon>
            <span className="likeCounter">{getRandomInt(120)} Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default Post;