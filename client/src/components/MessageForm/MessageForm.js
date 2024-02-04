import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import axios from "axios";
import notificationSound from "./../../assets/notification.mp3";

const socket = io("/");

const MessageForm = ({ isAdmin }) => {
  const [message, setMessage] = useState("");
  const senderId = localStorage.getItem("user_id");
  const [messages, setMessages] = useState([]);
  const { id: receiverId } = useParams();
  const messagesEndRef = useRef(null);
  const notificationRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, receiverId, senderId });
    setMessages([...messages, { message, senderName: "ME" }]);
    setMessage("");
  };

  const getMessages = async () => {
    const data = await axios.get("/api/chats/allChats");
    setMessages(data.data.data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    socket.on("messageArrived", (message) => {
      setMessages([...messages, message]);
      notificationRef.current.play();
    });
    socket.on("fetchMessages", (message) => {
      setMessage(message);
    });
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDelete = async (id) => {
    try {
      await axios.get(`/api/chats/${id}`);
      getMessages();
      socket.emit("messageDeleted");
    } catch (error) {
      alert("Delete Failed");
    }
  };

  return (
    <>
      <audio src={notificationSound} ref={notificationRef}></audio>
      <div className="messages-output">
        {messages?.map((item) => (
          <div
            className={`messageContainer ${
              (localStorage.getItem("user_id") === item.senderId ||
                item.senderName == "ME") &&
              "ownMessage"
            } `}
            key={item._id}
          >
            <p className="senderName">{item.senderName}</p>
            <p className="messageText">{item.message}</p>
            <p className="messageTime">{moment(item.timestamp).fromNow()}</p>

            {isAdmin && (
              <Button onClick={() => handleDelete(item._id)} variant="danger">
                <i className="fa fa-trash" aria-hidden="true"></i>{" "}
              </Button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            display: "flex",
          }}
        >
          <Col md={10}>
            <Form.Group>
              <Form.Control
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Your Message"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button
              disabled={message ? false : true}
              variant="primary"
              type="submit"
              style={{ width: "100%", margin: "0" }}
            >
              Send <i className="fa fa-paper-plane" aria-hidden="true"></i>{" "}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
