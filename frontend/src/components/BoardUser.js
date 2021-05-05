import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import {Form, Button} from "react-bootstrap";

import '../styles/quiz.css';

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
        {content}
    </div>
    
  );
};

export default BoardUser;