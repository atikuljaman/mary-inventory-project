import React from "react";
import "./Chat.css";
import { Col, Row, Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";

const Chat = () => {
  return (
    // <Container className="chat-container">
    //   <Row>
    // <Col>
    <Outlet />
    // </Col>
    //   </Row>
    // </Container>
  );
};

export default Chat;
