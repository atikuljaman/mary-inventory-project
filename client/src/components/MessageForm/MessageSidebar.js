import { IoIosSearch } from "react-icons/io";
import "./MessageSidebar.css";
// import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// import axios from "axios"; // Import axios for making HTTP requests
import { TbMessagesOff } from "react-icons/tb";
import moment from "moment";
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/authContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";
import { unreadNotificationFunc } from "../../utils/unreadNotification";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";

const UserChatCard = ({ chat, user, latestMessage, handleIsChatOpen }) => {
  const {
    updateCurrentChat,
    onlineUsers,
    notifications,
    markThisUserNotificationAsRead,
  } = useContext(ChatContext);

  // console.log("Handle back to chat list", handleIsChatOpen);

  // const { latestMessage } = useFetchLatestMessage(chat);

  // console.log("latestMessage", latestMessage);

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

  // const latestMessageTime = formatTimeAgo(latestMessage?.createdAt);

  // State to hold the formatted time for the latest message or chat creation
  const [latestMessageTime, setLatestMessageTime] = useState(
    formatTimeAgo(latestMessage?.createdAt || chat.createdAt)
  );

  // Update the time immediately when latestMessage changes
  useEffect(() => {
    setLatestMessageTime(
      formatTimeAgo(latestMessage?.createdAt || chat.createdAt)
    );
  }, [latestMessage?.createdAt, chat.createdAt]);

  // Use useEffect to set up an interval to update the formatted time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLatestMessageTime(
        formatTimeAgo(latestMessage?.createdAt || chat.createdAt)
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [latestMessage?.createdAt, chat.createdAt]);

  return (
    <div
      className="conversation-item"
      onClick={() => {
        updateCurrentChat(chat);
        handleIsChatOpen();

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

const MessageSidebar = ({ handleIsChatOpen }) => {
  const { user } = useContext(AuthContext);
  const { userChats, isLoading, error } = useContext(ChatContext);

  // console.log("userChats", userChats);

  const { latestMessages } = useFetchLatestMessage(userChats);

  // const sortedChats = userChats
  //   ?.map((chat) => ({
  //     ...chat,
  //     latestMessage: latestMessages.find((msg) => msg?.chatId === chat._id),
  //   }))
  //   .sort((a, b) => {
  //     // Check if latestMessage is undefined
  //     if (!a.latestMessage && !b.latestMessage) return 0; // No difference if both are undefined
  //     if (!a.latestMessage) return 1; // Chat with no latestMessage goes after chat with latestMessage
  //     if (!b.latestMessage) return -1; // Chat with latestMessage goes before chat with no latestMessage

  //     // Compare latestMessage timestamps
  //     return (
  //       new Date(b.latestMessage?.createdAt) -
  //       new Date(a.latestMessage?.createdAt)
  //     );
  //   });

  // const sortedChats = userChats
  //   ?.map((chat) => ({
  //     ...chat,
  //     latestMessage: latestMessages.find((msg) => msg?.chatId === chat._id),
  //   }))
  //   .sort((a, b) => {
  //     // Check if latestMessage is undefined
  //     if (!a.latestMessage && !b.latestMessage) {
  //       // Sort based on chat creation timestamp if no latest message
  //       return new Date(b.createdAt) - new Date(a.createdAt);
  //     }
  //     if (!a.latestMessage) return 1; // Chat with no latestMessage goes after chat with latestMessage
  //     if (!b.latestMessage) return -1; // Chat with latestMessage goes before chat with no latestMessage

  //     // Compare latestMessage timestamps
  //     return (
  //       new Date(b.latestMessage?.createdAt) -
  //       new Date(a.latestMessage?.createdAt)
  //     );
  //   });

  const sortedChats = userChats
    ?.map((chat) => ({
      ...chat,
      latestMessage: latestMessages.find((msg) => msg?.chatId === chat._id),
    }))
    .sort((a, b) => {
      // Sort based on latest message timestamp or chat creation timestamp if no latest message
      const aTime = a.latestMessage?.createdAt || a.createdAt;
      const bTime = b.latestMessage?.createdAt || b.createdAt;
      return new Date(bTime) - new Date(aTime);
    });

  return (
    <div className="message-sidebar-container">
      <div className="message-search-bar">
        <IoIosSearch className="icon" />{" "}
        <input type="text" placeholder="Search" />
      </div>

      {isLoading && (
        <div className="loading-conversations">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="loading-conversation" key={index}>
              <div className="loading-conversation-item-image"></div>
              <div className="loading-conversation-info">
                <h5></h5>
                <p className="m-0"></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedChats?.length === 0 && (
        <div className="no-conversations">
          <TbMessagesOff className="icon" />
          <span>No conversations yet</span>
        </div>
      )}

      <div className="message-sidebar">
        {sortedChats?.map((chat, index) => (
          <UserChatCard
            chat={chat}
            user={user}
            key={index}
            latestMessage={chat?.latestMessage}
            handleIsChatOpen={handleIsChatOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
