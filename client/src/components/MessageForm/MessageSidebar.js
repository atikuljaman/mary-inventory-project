import { IoIosSearch } from "react-icons/io";
import "./MessageSidebar.css";
// import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// import axios from "axios"; // Import axios for making HTTP requests
import moment from "moment";
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/authContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";
import { unreadNotificationFunc } from "../../utils/unreadNotification";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";

const UserChatCard = ({ chat, user }) => {
  const {
    updateCurrentChat,
    onlineUsers,
    notifications,
    markThisUserNotificationAsRead,
  } = useContext(ChatContext);

  const { latestMessage } = useFetchLatestMessage(chat);

  const { recipientUser } = useFetchRecipientUser(chat, user);

  const unreadNotifications = unreadNotificationFunc(notifications);

  const thisUserNotification = unreadNotifications?.filter(
    (notification) => notification?.senderId === recipientUser?._id
  );

  const isOnline = onlineUsers.some(
    (user) => user.userId === recipientUser?._id
  );

  const formatTimeAgo = (date) => {
    const now = moment();
    const timeDifference = now.diff(moment(date), "minutes");

    if (timeDifference < 1) return "Just now";
    if (timeDifference < 60) return `${timeDifference}m`;
    if (timeDifference < 1440) return `${Math.floor(timeDifference / 60)}h`;
    return `${Math.floor(timeDifference / 1440)}d`;
  };

  const latestMessageTime = formatTimeAgo(latestMessage?.createdAt);

  return (
    <div
      className="conversation-item"
      onClick={() => {
        updateCurrentChat(chat);

        if (thisUserNotification?.length > 0) {
          markThisUserNotificationAsRead(thisUserNotification, notifications);
        }
      }}
    >
      <div
        className="conversation-item-image"
        style={{ backgroundImage: `url(${recipientUser?.image})` }}
      >
        <div
          className={isOnline ? "this-user-online" : "this-user-offline"}
        ></div>
      </div>
      <div className="conversation-info">
        <h5>
          {recipientUser?.firstName + " " + recipientUser?.lastName}
          <span className="message-time">{latestMessageTime}</span>
        </h5>
        <div className="conversation-message">
          <p>{latestMessage?.text}</p>
          {thisUserNotification?.length > 0 && (
            <div className="this-user-notification">
              {thisUserNotification?.length > 0 && thisUserNotification?.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MessageSidebar = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isLoading, error } = useContext(ChatContext);

  console.log("userChats", userChats);

  return (
    <div className="message-sidebar-container">
      <div className="message-search-bar">
        <IoIosSearch className="icon" />{" "}
        <input type="text" placeholder="Search" />
      </div>

      <div className="message-sidebar">
        {userChats?.map((chat, index) => (
          <UserChatCard chat={chat} user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
