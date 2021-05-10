import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import {Form, Button} from "react-bootstrap";
import AuthService from "../services/auth.service"
import '../styles/quiz.css';

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [formState, setFormState] = useState({
    question: '',
    answears: [
      {
        isCorrect: false,
        answear: ''
      }
    ],
    photo: null
  })
  const [data, setData] = useState()


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

  useEffect(() => {
    AuthService.getData().then(data => {
      setData(data)
      console.log(data)
    })

  }, []);

  return (
    <div>Data:
        {data && data.map(question => {
          let data = '';
          if (question.img.data) {
            data = Buffer.from(question.img.data.data).toString()
          }

          return  (<div>
            <p>{question.question}</p>
            <img src={data} />
          </div>)

        })}
        </div>
    
  );
};

export default BoardUser;