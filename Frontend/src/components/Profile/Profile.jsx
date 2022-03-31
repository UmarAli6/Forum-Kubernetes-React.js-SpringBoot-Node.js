import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Post/Post";
import "./profile.css";
import Cookies from "js-cookie";
import { Stack, Typography } from "@mui/material";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ProfileRightbar from "../ProfileRightbar/ProfileRightbar";

const Profile = ({ user }) => {
  let pic = "/assets/profile/" + (Cookies.get("lastId") - user.id) + ".jpg";
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/posts/get/" + user.id)
      .then((res) => {
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Activity = () => {
    if (posts.length == 0) {
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography>No Activity</Typography>
          <PlaylistRemoveIcon></PlaylistRemoveIcon>
        </Stack>
      );
    }
    return (
      <ul className="profilefeedList">
        {posts.map((p) => (
          <Post key={p.id} post={p} user={user} />
        ))}
      </ul>
    );
  };

  return (
    <div className="profileparent">
      <div className="profile">
        <div className="profileTop">
          <div className="profileCover">
            <img src="assets/post/10.png" alt="" className="profileBanner" />
            <img src={pic} alt="" className="profilePic" />
          </div>
          <h2 className="profileusername">{user.name}</h2>
        </div>
        <div className="profileBottom">
          <Activity />
        </div>
      </div>
      <div className="profilerightbar">
        <div className="rightbarWrapper">
          <div className="statsContainer">
            <ProfileRightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;