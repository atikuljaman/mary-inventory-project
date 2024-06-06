// CHAT GPT FIRST RESPONSE
// import { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/chatContext";
// import { baseUrl, getRequest } from "../utils/services";

// export const useFetchLatestMessage = (chats) => {
//   const { newMessage, notifications, userChats } = useContext(ChatContext);
//   const [latestMessages, setLatestMessages] = useState([]);

//   useEffect(() => {
//     const getMessages = async () => {
//       if (!chats) return;

//       const promises = chats.map((chat) =>
//         getRequest(`${baseUrl}/messages/chat/start/${chat._id}`)
//       );

//       const responses = await Promise.all(promises);

//       const messages = responses
//         .map((response) => {
//           if (response.error) {
//             console.log("Failed to fetch messages", response);
//             return null;
//           }
//           return response[response.length - 1];
//         })
//         .filter(Boolean);

//       setLatestMessages(messages);
//     };

//     getMessages();
//   }, [chats, newMessage, notifications, latestMessages, userChats]);

//   return { latestMessages };
// };

// GIMINI SECOND RESPONSE
// import { useContext, useEffect, useState, useRef } from "react";
// import { ChatContext } from "../context/chatContext";
// import { baseUrl, getRequest } from "../utils/services";

// export const useFetchLatestMessage = (chats) => {
//   const { newMessage, notifications, userChats } = useContext(ChatContext);
//   const [latestMessages, setLatestMessages] = useState([]);
//   const latestMessagesRef = useRef([]);

//   useEffect(() => {
//     const getMessages = async () => {
//       if (!chats) return;

//       const promises = chats.map((chat) =>
//         getRequest(`${baseUrl}/messages/chat/start/${chat._id}`)
//       );

//       const responses = await Promise.all(promises);

//       const messages = responses
//         .map((response) => {
//           if (response.error) {
//             console.log("Failed to fetch messages", response);
//             return null;
//           }
//           return response[response.length - 1];
//         })
//         .filter(Boolean);

//       latestMessagesRef.current = messages; // Update the ref value
//       setLatestMessages(messages);
//     };

//     getMessages();
//   }, [chats, newMessage, notifications, userChats, latestMessagesRef.current]); // Include latestMessagesRef.current in the dependency array

//   return { latestMessages };
// };

// CHAT GPT THIRD RESPONSE

import { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../context/chatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chats) => {
  const { newMessage, notifications, userChats } = useContext(ChatContext);
  const [latestMessages, setLatestMessages] = useState([]);
  const latestMessagesRef = useRef([]);

  useEffect(() => {
    const getMessages = async () => {
      if (!chats) return;

      const promises = chats.map((chat) =>
        getRequest(`${baseUrl}/messages/chat/start/${chat._id}`)
      );

      const responses = await Promise.all(promises);

      const messages = responses
        .map((response) => {
          if (response.error) {
            console.log("Failed to fetch messages", response);
            return null;
          }
          return response[response.length - 1];
        })
        .filter(Boolean);

      latestMessagesRef.current = messages; // Update the ref value
      setLatestMessages(messages);
    };

    getMessages();
  }, [chats, newMessage, notifications, userChats]);

  // console.log("latestMessages", latestMessages);

  return { latestMessages };
};
