import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import {Form, Button} from "react-bootstrap";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service"

import '../styles/addQuestion.css';

const BoardAdmin = () => {
    const [content, setContent] = useState("");
    const form = useRef();
    const checkBtn = useRef();
    const [question, setQuestion] = useState("");
    const [answear1, setAnswear1] = useState("");
    const [answear2, setAnswear2] = useState("");
    const [image, setImage] = useState("");
    
    const data = AuthService.getData();

    const onChangeQuestion = (e) => {
      setQuestion(e.target.value);
    };

    const onChangeAnswear1 = (e) => {
      setAnswear1(e.target.value);
    };

    const onChangeAnswear2 = (e) => {
      setAnswear2(e.target.value);
    };

    const onChangeImage = (e) => {
      setImage(e.target.value);
    };

    useEffect(() => {
      UserService.getAdminBoard().then(
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
    
    const handleSubmit = (e) => {
      e.preventDefault();
        AuthService.submit(question, answear1, answear2, image)
    }

    return (
      <div className="question-background">

        <Form onSubmit={handleSubmit} ref={form}>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label className="label-question">Treść pytania</Form.Label>
          <Form.Control type="text" 
             placeholder="Pytanie" 
             onChange={onChangeQuestion} />
          <Form.Text className="text-muted" >
            Podaj tresc pytania egzaminacyjnego. 
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicAnswer">
            <Form.Label className="label-question">Poprawna Odpowiedź na pytanie</Form.Label>
            <Form.Control type="text" 
              placeholder="Odpowiedź poprawna" 
              onChange={onChangeAnswear1}/>
            <Form.Text className="text-muted" >
                Podaj poprawna odpowiedź na pytanie.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicAnswer">
            <Form.Label className="label-question">Niepoprawna odpowiedź na pytanie.</Form.Label>
            <Form.Control type="text" 
                placeholder="Odpowiedź niepoprawna" 
                onChange={onChangeAnswear2}/>
            <Form.Text className="text-muted">
                Podaj niepoprawną odpowiedź.
            </Form.Text>
        </Form.Group>

        <Form className="button-file">
            <Form.Group>
            <Form.File id="exampleFormControlFile1" 
               onChange={onChangeImage} 
               label="Dodaj zdjęcie" />
            </Form.Group>
        </Form>
        <button>
          Dodaj
        </button>
        <div>Data:
       {data}
      
        </div>
        </Form>
      </div>
    );
  };
  
  export default BoardAdmin;