import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import MessageSidebar from "./MessageSidebar";
import MessageFormTwo from "./MessageFormTwo";
import "./Message.css";
import { AuthContext } from "../../context/authContext";
import userImg from "../../assets/users-icon.svg";
import userNotOnlineImg from "../../assets/users-not-online.svg";
import { BsChatFill } from "react-icons/bs";

import { FaArrowLeft } from "react-icons/fa";
import useSmallDevice from "../../hooks/useSmallDevice";

const Message = ({ chats, isAdmin }) => {
  const { user } = useContext(AuthContext);
  const {
    potentialChats,
    createChat,
    onlineUsers,
    allUsers,
    updateCurrentChat,
    userChats,
  } = useContext(ChatContext);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState(false);

  const navigate = useNavigate();
  const isSmallDevice = useSmallDevice();

  // Function to find the online user by userId and get their details
  const getOnlineUserDetails = (userId) => {
    // Find the user from allUsers using userId
    return allUsers.find((user) => user._id === userId);
  };

  // Filter online users to exclude the currently logged-in user
  const onlineUsersExcludingCurrentUser = onlineUsers?.filter(
    (onlineUser) => onlineUser.userId !== user._id
  );

  // Function to handle back to chat list
  const handleIsChatOpen = () => {
    if (isSmallDevice) setIsChatOpen(true);
  };

  // Function to handle user click
  const handleUserClick = async (userId) => {
    const desiredChat = userChats?.find((chat) => {
      return chat.members.includes(userId) && chat.members.includes(user._id);
    });

    if (desiredChat) {
      updateCurrentChat(desiredChat);
      navigate("/chat/start");
    } else {
      await createChat(user._id, userId);
    }
  };

  return (
    <div className="message-wrapper">
      <div className="message-wrapper-bottom">
        {isChatOpen && (
          <button
            onClick={() => {
              setIsChatOpen(false);
              setIsUserOnline(false);
            }}
          >
            <FaArrowLeft />
          </button>
        )}

        {isUserOnline && (
          <button
            onClick={() => {
              setIsChatOpen(false);
              setIsUserOnline(false);
            }}
          >
            <FaArrowLeft />
          </button>
        )}

        <div className="message-wrapper-bottom-left">
          <div
            onClick={() => {
              if (isSmallDevice) {
                setIsUserOnline(true);
                setIsChatOpen(false);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <h6>
              Active{" "}
              <span>
                (
                {onlineUsersExcludingCurrentUser?.length > 0
                  ? onlineUsersExcludingCurrentUser?.length
                  : 0}
                )
              </span>
            </h6>
          </div>
          <div
            onClick={() => {
              if (isSmallDevice) {
                setIsUserOnline(true);
                setIsChatOpen(false);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <h6>
              New Users{" "}
              <span>
                ({potentialChats?.length > 0 ? potentialChats?.length : 0})
              </span>
            </h6>
          </div>
        </div>
      </div>

      {!isChatOpen && !isUserOnline && (
        <div className="message-wrapper-left">
          <MessageSidebar chats={chats} handleIsChatOpen={handleIsChatOpen} />
        </div>
      )}

      {/* {!isSmallDevice && (
        <div className="message-wrapper-left">
          <MessageSidebar chats={chats} handleIsChatOpen={handleIsChatOpen} />
        </div>
      )} */}

      {isChatOpen && (
        <div className="message-wrapper-center">
          <MessageFormTwo isAdmin={isAdmin} />
        </div>
      )}

      {!isSmallDevice && (
        <div className="message-wrapper-center">
          <MessageFormTwo isAdmin={isAdmin} />
        </div>
      )}

      {isUserOnline && (
        <div className="message-wrapper-right">
          {/* Display details of online users excluding the current user */}

          <div className="online-users-wrapper">
            <h6>
              Online Users{" "}
              <span>
                (
                {onlineUsersExcludingCurrentUser?.length > 0
                  ? onlineUsersExcludingCurrentUser?.length
                  : 0}
                )
              </span>
            </h6>

            {onlineUsersExcludingCurrentUser?.length === 0 && (
              <div className="no-users-found">
                <img src={userNotOnlineImg} alt="No users found" />
                <span>No online users</span>
              </div>
            )}

            {onlineUsersExcludingCurrentUser?.length !== 0 && (
              <ul>
                {onlineUsersExcludingCurrentUser?.map((onlineUser) => {
                  const userDetails = getOnlineUserDetails(onlineUser.userId);

                  return (
                    <li
                      key={onlineUser.userId}
                      onClick={() => handleUserClick(onlineUser.userId)}
                    >
                      <div
                        className="conversation-item"
                        // onClick={() => createChat(user?._id, item?._id)}
                      >
                        <div
                          className="conversation-item-image"
                          style={{
                            backgroundImage: `url(${userDetails?.image})`,
                          }}
                        >
                          <div
                            className={
                              onlineUsers?.some(
                                (user) => user?.userId === userDetails?._id
                              )
                                ? "this-user-online"
                                : "this-user-offline"
                            }
                          ></div>
                        </div>
                        <div className="conversation-info">
                          <h5>
                            {userDetails?.firstName +
                              " " +
                              userDetails?.lastName}
                          </h5>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* New users */}
          <div className="new-users-wrapper">
            <h6>
              New Users{" "}
              <span>
                ({potentialChats?.length > 0 ? potentialChats?.length : 0})
              </span>
            </h6>

            {potentialChats?.length === 0 && (
              <div className="no-users-found">
                <img src={userImg} alt="Users Icon" className="img-fluid" />
                <span>No New Users Available yet </span>
              </div>
            )}

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
      )}

      {!isSmallDevice && (
        <div className="message-wrapper-right">
          {/* Display details of online users excluding the current user */}

          <div className="online-users-wrapper">
            <h6>
              Online Users{" "}
              <span>
                (
                {onlineUsersExcludingCurrentUser?.length > 0
                  ? onlineUsersExcludingCurrentUser?.length
                  : 0}
                )
              </span>
            </h6>

            {onlineUsersExcludingCurrentUser?.length === 0 && (
              <div className="no-users-found">
                <img src={userNotOnlineImg} alt="No users found" />
                <span>No online users</span>
              </div>
            )}

            {onlineUsersExcludingCurrentUser?.length !== 0 && (
              <ul>
                {onlineUsersExcludingCurrentUser?.map((onlineUser) => {
                  const userDetails = getOnlineUserDetails(onlineUser.userId);

                  return (
                    <li
                      key={onlineUser.userId}
                      onClick={() => handleUserClick(onlineUser.userId)}
                    >
                      <div
                        className="conversation-item"
                        // onClick={() => createChat(user?._id, item?._id)}
                      >
                        <div
                          className="conversation-item-image"
                          style={{
                            backgroundImage: `url(${userDetails?.image})`,
                          }}
                        >
                          <div
                            className={
                              onlineUsers?.some(
                                (user) => user?.userId === userDetails?._id
                              )
                                ? "this-user-online"
                                : "this-user-offline"
                            }
                          ></div>
                        </div>
                        <div className="conversation-info">
                          <h5>
                            {userDetails?.firstName +
                              " " +
                              userDetails?.lastName}
                          </h5>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* New users */}
          <div className="new-users-wrapper">
            <h6>
              New Users{" "}
              <span>
                ({potentialChats?.length > 0 ? potentialChats?.length : 0})
              </span>
            </h6>

            {potentialChats?.length === 0 && (
              <div className="no-users-found">
                <img src={userImg} alt="Users Icon" className="img-fluid" />
                <span>No New Users Available yet </span>
              </div>
            )}

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
      )}
    </div>
  );
};

export default Message;
