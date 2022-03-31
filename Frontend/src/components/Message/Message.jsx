import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageItem from "./ChatItem";
import "./message.css";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Message = ({ user }) => {
  let loggedInUser = {
    id: Cookies.get("userId"),
    username: Cookies.get("name"),
  };
  let [unread, setUndread] = useState([]);
  let [conversation, setConversation] = useState([]);
  let selectedUser = user;
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/messages/get/unread/" + loggedInUser.id)
      .then((res) => {
        setUndread(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (selectedUser.id !== undefined) {
      axios
        .get(
          "/api/v1/messages/get/sender/" +
          selectedUser.id +
          "/receiver/" +
          loggedInUser.id
        )
        .then((res) => {
          setConversation(res.data);
          let convoDiv = document.getElementById("convoDiv")
          convoDiv.scrollTop = convoDiv.scrollHeight;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = {
      content: document.getElementById("content").value,
      senderId: loggedInUser.id,
      receiverId: selectedUser.id,
      senderName: loggedInUser.username,
    };

    document.getElementById("content").value = ""
    try {
      await axios.post("/api/v1/messages/create", newMessage).then(() => {
        axios
          .get(
            "/api/v1/messages/get/sender/" +
            selectedUser.id +
            "/receiver/" +
            loggedInUser.id
          )
          .then((res) => {
            setConversation(res.data);
            let convoDiv = document.getElementById("convoDiv")
            convoDiv.scrollTop = convoDiv.scrollHeight;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="message">
      <div className="messageWrapper">
        {selectedUser.id ? (
          <>
            <div className="messageBoxTop" id="convoDiv">
              {conversation.map((m) => (
                <div key={m.id}>
                  <MessageItem
                    message={m}
                    own={m.senderId == loggedInUser.id}
                  />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                id="content"
                label="Write a message"
                fullWidth
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="primary" type="submit">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </form>
          </>
        ) : (
          <span className="noConversationText">Select user to chat</span>
        )}
      </div>
      <div className="messagerightbar">
        <div className="messagerightbarWrapper">
          <h4>New messages from</h4>
          <hr className="rightbarHr" />
          <ul>
            {unread.map((u) => (
              <li
                key={u.id}
                className="rightbarUserItem"
                onClick={() => {
                  navigate("/home", {
                    state: { comp: "message", userId: u.id, username: u.name },
                  });
                }}
              >
                <img
                  className="rightbarUserImg"
                  src={
                    "/assets/profile/" + (Cookies.get("lastId") - u.id) + ".jpg"
                  }
                  alt=" "
                />
                <span className="rightbarUsername">{u.username}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Message;