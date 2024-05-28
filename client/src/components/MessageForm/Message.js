import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import { Route, Routes } from "react-router-dom";
import MessageSidebar from "./MessageSidebar";
import MessageFormTwo from "./MessageFormTwo";
import "./Message.css";
import { AuthContext } from "../../context/authContext";

const Message = ({ chats, isAdmin }) => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <div className="message-wrapper">
      <div className="message-wrapper-left">
        <MessageSidebar chats={chats} />
      </div>
      <div className="message-wrapper-center">
        <MessageFormTwo isAdmin={isAdmin} />
      </div>
      <div className="message-wrapper-right">
        {/* <h1>{potentialChats?.length} Chats</h1> */}

        {potentialChats?.map((item) => (
          <div
            className="conversation-item"
            onClick={() => createChat(user?._id, item?._id)}
          >
            <div
              className="conversation-item-image"
              style={{ backgroundImage: `url(${item?.image})` }}
            >
              <div
                className={
                  onlineUsers?.some((user) => user?.userId === item?._id)
                    ? "this-user-online"
                    : "this-user-offline"
                }
              ></div>
            </div>
            <div className="conversation-info">
              <h5>{item?.firstName + " " + item?.lastName}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
