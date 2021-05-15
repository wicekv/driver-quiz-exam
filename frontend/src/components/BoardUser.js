import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import { Form, Button } from "react-bootstrap";
import '../styles/quiz.css';

const BoardUser = () => {
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



  useEffect(async () => {
    const data = await UserService.getQuestions();
    setData(data)
    console.log(data)
  }, []);

  return (
    <div>Data:
      {/* {data && data.map(question => {
        let data = '';
        if (question.img.data) {
          data = Buffer.from(question.img.data.data).toString()
        }

        return (<div>
          <p>{question.question}</p>
          <img src={data} />
        </div>)

      })} */}
    </div>

  );
};

export default BoardUser;