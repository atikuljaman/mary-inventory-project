// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import moment from "moment";
// import axios from "axios";
// import notificationSound from "./../../assets/notification.mp3";

// import { IoCall, IoAttachSharp } from "react-icons/io5";
// import { FaPaperPlane } from "react-icons/fa";
// import "./MessageFormTwo.css";

// const socket = io("http://yourserverurl");

// const MessageFormTwo = ({ isAdmin }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const { id: chatId } = useParams();
//   const messagesEndRef = useRef(null);
//   const notificationRef = useRef(null);

//   const isGroupChat = chatId.startsWith("group-");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const senderId = localStorage.getItem("user_id");

//     const newMessage = { message, senderId, chatId, timestamp: new Date() };
//     socket.emit("message", { ...newMessage, isGroupChat });

//     setMessages([...messages, { ...newMessage, senderName: "ME" }]);
//     setMessage("");
//   };

//   const getMessages = async () => {
//     const endpoint = isGroupChat ? `/api/chats/groupChats/${chatId}` : `/api/chats/privateChats/${chatId}`;
//     const data = await axios.get(endpoint);
//     setMessages(data.data.data);
//   };

//   useEffect(() => {
//     getMessages();
//   }, [chatId]);

//   useEffect(() => {
//     socket.on("messageArrived", (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       notificationRef.current.play();
//     });
//   }, [messages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/chats/${id}`);
//       getMessages();
//       socket.emit("messageDeleted");
//     } catch (error) {
//       alert("Delete Failed");
//     }
//   };

//   return (
//     <div className="message-form-wrapper">
//       <div className="message-form-wrapper-top">
//         <div className="message-form-top-user-info">
//           <div className="avatar"></div>
//           <div>
//             <h3>Chat with {chatId}</h3>
//             <div className="status">
//               <div className="status-online"></div>
//               <span>Online</span>
//             </div>
//           </div>
//         </div>

//         <div className="message-form-top-options">
//           <button>
//             <IoCall className="icon" /> Call
//           </button>
//         </div>
//       </div>

//       <audio src={notificationSound} ref={notificationRef}></audio>

//       <div className="message-form-wrapper-bottom">
//         <div className="messages-output">
//           {messages.map((item) => (
//             <div
//               className={`messageContainer ${
//                 (localStorage.getItem("user_id") === item.senderId || item.senderName === "ME") &&
//                 "ownMessage"
//               }`}
//               key={item._id}
//             >
//               <p className="senderName">{item.senderName}</p>
//               <p className="messageText">{item.message}</p>
//               <p className="messageTime">{moment(item.timestamp).fromNow()}</p>

//               {isAdmin && (
//                 <Button onClick={() => handleDelete(item._id)} variant="danger">
//                   <i className="fa fa-trash" aria-hidden="true"></i>{" "}
//                 </Button>
//               )}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <form className="message-form" onSubmit={handleSubmit}>
//           <div className="attachment">
//             <IoAttachSharp className="icon" />
//             {/* <input type="file" /> */}
//           </div>
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message here..."
//             className="message-input"
//           />
//           <button disabled={!message}>
//             <FaPaperPlane className="icon" /> Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MessageFormTwo;

import React, { useState, useRef, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import axios from "axios";
import notificationSound from "./../../assets/notification.mp3";
import { IoCall, IoAttachSharp } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa";
import InputEmoji from "react-input-emoji";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";
import "./MessageFormTwo.css";

const socket = io("/");

const MessageFormTwo = ({ isAdmin }) => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isLoading, sendTextMessage, onlineUsers } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  const isOnline = onlineUsers.some(
    (user) => user.userId === recipientUser?._id
  );

  // Scroll to bottom message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser) {
    return (
      <div className="message-not-selected">
        <p>Select a user to start messaging</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="message-not-selected">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="message-form-wrapper">
      <div className="message-form-wrapper-top">
        <div className="message-form-top-user-info">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${recipientUser?.image})` }}
          ></div>
          <div>
            <h3>{recipientUser?.firstName + " " + recipientUser?.lastName}</h3>
            <div className="status">
              <div
                className={isOnline ? "status-online" : "status-offline"}
              ></div>
              <span>{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>

        <div className="message-form-top-options">
          <button>
            <IoCall className="icon" /> Call
          </button>
        </div>
      </div>

      {/* <audio src={notificationSound} ref={notificationRef}></audio> */}

      <div className="message-form-wrapper-bottom">
        <div className="messages-output">
          {messages?.map((message, index) => (
            <div
              className={`${
                message?.senderId === user?._id ? "message own" : "message"
              }`}
              key={index}
              ref={scroll}
            >
              <p>{message?.text}</p>
              <p className="messageTime">
                {moment(message?.createdAt).fromNow()}
              </p>
            </div>
          ))}
        </div>

        <div className="message-form">
          <div className="attachment">
            <IoAttachSharp className="icon" />
          </div>

          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            placeholder="Type a message here..."
            background="transparent"
            borderColor="transparent"
            className="custom-input-emoji"
          />

          <button
            onClick={() =>
              sendTextMessage(
                textMessage,
                user,
                currentChat._id,
                setTextMessage
              )
            }
          >
            <FaPaperPlane className="icon" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageFormTwo;
