import React, { useState, useEffect } from "react";
import UserService from "../services/admin.service";
import { Form, Button } from "react-bootstrap";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service"
import {addQuestion} from './../services/admin.service'

import '../styles/addQuestion.css';

const BoardAdmin = () => {

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
 


  const onChangeQuestion = (e) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      question: value
    })
  };

  const onChangeAnswers = (type, index) => (e) => {
    const { value, checked } = e.target;

    const { answears } = formState;
    answears[index][type] = type === "isCorrect" ? checked : value
    setFormState({
      ...formState,
      answears
    })
  };

  const addNewAnswearField = (e) => {
    e.preventDefault()
    setFormState({
      ...formState,
      answears: [
        ...formState.answears,
        {
          isCorrect: false,
          answear: ''
        }
      ]
    })
  }

  const onChangeImage = (e) => {

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const file = e.target.files[0]
    
    toBase64(file).then(fileData => {
      
      console.log(fileData)
      setFormState({
        ...formState,
        photo: fileData
      })
    })

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion(formState)
  }

  return (
    <div className="question-background">

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label className="label-question">Treść pytania</Form.Label>
          <Form.Control type="text"
            placeholder="Pytanie"
            onChange={onChangeQuestion} />
          <Form.Text className="text-muted" >
            Podaj tresc pytania egzaminacyjnego.
          </Form.Text>
        </Form.Group>
        {formState.answears.map((answear, index) => (
          <Form.Group controlId="formBasicAnswer">
            <div>
              <Form.Label className="label-question">Odpowiedź na pytanie</Form.Label>
              <Form.Control type="text"
                placeholder="Odpowiedź"
                onChange={onChangeAnswers('answear', index)} />
              <Form.Text className="text-muted" >
                Podaj odpowiedź na pytanie.
            </Form.Text>
            </div>
            <div>
              <Form.Label className="label-question">Czy poprawne</Form.Label>
              <Form.Control type="checkbox"
                onChange={onChangeAnswers('isCorrect', index)} />
              <Form.Text className="text-muted" >
                Podaj odpowiedź na pytanie.
            </Form.Text>
            </div>

          </Form.Group>
        ))}

        <button onClick={addNewAnswearField}>Dodaj kolejna odpowiedz</button>
        <Form.Group>
          <Form.File id="exampleFormControlFile1"
            onChange={onChangeImage}
            label="Dodaj zdjęcie" />
        </Form.Group>


        <button>
          Dodaj
        </button>

      </Form>

    </div>
  );
};

export default BoardAdmin;