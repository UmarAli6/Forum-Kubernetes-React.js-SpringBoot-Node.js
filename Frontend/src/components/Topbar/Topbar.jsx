import React, { useState } from "react";
import { Badge, Button, IconButton, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import BrushIcon from "@mui/icons-material/Brush";
import FeedIcon from "@mui/icons-material/Feed";
import axios from "axios";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Topbar = ({ comp }) => {
  let navigation = useNavigate();
  const [locationTitle, setLocationTitle] = useState("Feed");
  let [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/messages/get/unread/" + Cookies.get("userId"))
      .then((res) => {
        setNewMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFeedNav = () => {
    if (comp !== "feed") {
      setLocationTitle("Feed");
      navigation("/home", { state: { comp: "feed" } });
    }
  };

  const handleDrawspaceNav = () => {
    if (comp !== "drawspace") {
      setLocationTitle("Drawspace");
      navigation("/home", { state: { comp: "drawspace" } });
    }
  };

  const handleMessageNav = () => {
    if (comp !== "message") {
      setLocationTitle("Messages");
      navigation("/home", { state: { comp: "message" } });
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">musuSocial</span>
      </div>
      <div className="topbarCenter">
        <span className="location">{locationTitle}</span>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <Stack direction="row" spacing={3}>
            <IconButton sx={{ color: "#ffffff" }} onClick={handleFeedNav}>
              <HomeIcon />
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }} onClick={handleMessageNav}>
              <Badge badgeContent={newMessages.length} color="success">
                <ChatIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }} onClick={handleDrawspaceNav}>
              <BrushIcon />
            </IconButton>
          </Stack>
        </div>
        <Button
          variant="text"
          sx={{ color: "#ffffff" }}
          onClick={() => navigation("/")}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Topbar;