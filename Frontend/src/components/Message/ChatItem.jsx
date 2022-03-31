import "./chatItem.css";
import { format } from "timeago.js";

export default function MessageItem({ message, own }) {
  console.log(message)
  return (
    <div className={own ? "chatItem own" : "chatItem"}>
      <p className="chatName">{own ? "You" : message.senderName}</p>
      <div className={own ? "chatTop own" : "chatTop"}>
        <span className="chatText">{message.content}</span>
      </div>
      <div className="chatBottom">{format(new Date(message.createdAt))}</div>
    </div>
  );
}