import React, { Component, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import "./share.css";
import Cookies from "js-cookie";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";

const Share = () => {
  let userId = Cookies.get("userId");
  let [file, setFile] = useState(null);
  let content = useRef();
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: userId,
      content: document.getElementById("content").value,
    };
    try {
      await axios.post("/api/v1/posts/create", newPost);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={handleSubmit}>
        <div className="shareTop">
          <TextField
            className="shareInput"
            multiline
            variant="standard"
            maxRows={4}
            label="What's on your mind?"
            id="content"
          />
        </div>
        <div className="shareBottom">
          <Stack direction="row" spacing={1} marginLeft={1}>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png, .jpeg, .jpg"

            />
            <label htmlFor="file">
              <IconButton>
                <AddPhotoAlternateIcon htmlColor="tomato" />
              </IconButton>
            </label>
            <IconButton>
              <AddLocationIcon htmlColor="green" />
            </IconButton>
          </Stack>
          <Button
            type="submit"
            className="shareButton"
            variant="contained"
            color="primary"
            size="small"
            endIcon={<SendIcon />}
          >
            Share
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Share;