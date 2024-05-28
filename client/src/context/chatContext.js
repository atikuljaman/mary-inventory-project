import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import io from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  // console.log("online users", onlineUsers);
  // console.log("Notifications", notifications);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [user]);

  // Add online users
  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", user?._id);

    socket.on("getOnlineUsers", (response) => {
      setOnlineUsers(response);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // Send messages
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members?.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // Receive messages and notifications
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (response) => {
      if (currentChat?._id !== response?.chatId) return;

      setMessages((prevMessages) => [...prevMessages, response]);
    });

    socket.on("getNotification", (response) => {
      const isChatOpen = currentChat?.members.some(
        (id) => id === response.senderId
      );

      if (isChatOpen) {
        setNotifications((prevNotifications) => [
          { ...response, isRead: true },
          ...prevNotifications,
        ]);
      } else {
        setNotifications((prevNotifications) => [
          response,
          ...prevNotifications,
        ]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users/users`);

      if (response.error) {
        return console.log("Failed to fetch users", response);
      }

      const chats = response.filter((item) => {
        let isChatCreated = false;

        if (user?._id === item?._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return (
              chat?.members[0] === item?._id || chat?.members[1] === item?._id
            );
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(chats);
      setAllUsers(response);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const fetchUserChats = async () => {
      if (user?._id) {
        setIsLoading(true);

        const response = await getRequest(
          `${baseUrl}/chats/chat/start/${user?._id}`
        );

        setIsLoading(false);

        if (response.error) {
          return setError(response);
        }

        setUserChats(response);
      }
    };

    fetchUserChats();
  }, [user, notifications]);

  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);

      const response = await getRequest(
        `${baseUrl}/messages/chat/start/${currentChat?._id}`
      );

      setIsLoading(false);

      if (response.error) {
        return setError(response);
      }

      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("Please enter a message");

      const response = await postRequest(`${baseUrl}/messages/chat/start`, {
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
      });

      if (response.error) {
        console.log("Failed to send message", response);
        return setError(response);
      }

      setNewMessage(response);
      setMessages((prevMessages) => [...prevMessages, response]);
      setTextMessage("");
    },

    []
  );

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`${baseUrl}/chats/chat/start`, {
      firstId,
      secondId,
    });

    if (response.error) {
      console.log("Failed to create chat", response);
    }

    setUserChats((prevChats) => [...prevChats, response]);
  });

  const markAllNotificationsAsRead = useCallback((notifications) => {
    const markedNotifications = notifications.map((item) => {
      return { ...item, isRead: true };
    });

    setNotifications(markedNotifications);
  }, []);

  const markNotificationAsRead = useCallback(
    (n, userChats, user, notifications) => {
      // Find the chat that the notification belongs to

      const desiredChat = userChats?.find((chat) => {
        const chatMembers = [user?._id, n?.senderId];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });

        return isDesiredChat;
      });

      // Mark the notification as read
      const modifiedNotifications = notifications.map((item) => {
        if (n.senderId === item.senderId) {
          return { ...n, isRead: true };
        } else {
          return item;
        }
      });

      updateCurrentChat(desiredChat);
      setNotifications(modifiedNotifications);

      // Navigate to the chat/start path
      if (desiredChat) {
        navigate("/chat/start");
      }
    },
    []
  );

  const markThisUserNotificationAsRead = useCallback(
    (thisUserNotifications, notifications) => {
      // Mark the notification as read

      const modifiedNotifications = notifications.map((item) => {
        let notification;

        thisUserNotifications.forEach((n) => {
          if (n.senderId === item.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = item;
          }
        });

        return notification;
      });

      setNotifications(modifiedNotifications);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isLoading,
        error,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        markThisUserNotificationAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
