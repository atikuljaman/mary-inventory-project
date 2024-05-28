import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import axios from "axios";
import notificationSound from "./../../assets/notification.mp3";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";

const socket = io("/");

const MessageForm = ({ isAdmin }) => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isLoading } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  console.log("recipient", recipientUser);

  if (!recipientUser) {
    return (
      <div className="message-not-selected">
        <p>Select a user to start messaging</p>
      </div>
    );
  } else {
    return (
      <>
        {/* <audio src={notificationSound} ref={notificationRef}></audio> */}
        <div className="messages-output">
          {/* {messages?.map((item) => (
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
          ))} */}

          {/* <div ref={messagesEndRef} /> */}
        </div>
        <Form>
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              display: "flex",
              backgroundColor: "#f6f7f9",
            }}
          >
            <Col md={10}>
              <Form.Group>
                <Form.Control
                  // value={message}
                  // onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Your Message"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                // disabled={message ? false : true}
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
  }
};

export default MessageForm;
