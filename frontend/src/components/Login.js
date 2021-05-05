import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import '../styles/login.css'

import logoDrive from "../images/logo.png";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div class="login_form">
      <div className="">
        <img
           src={logoDrive}
          alt="profile-img"
          className="profile-img-card"
        />
        
        <Form className="form-login" onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label className="label-login" htmlFor="username">Nazwa użytkownika</label>
            <Input
              type="text"
              className="login-input"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}

            />
          </div>
          <div className="form_border"></div>
          <div className="form-group">
            <label className="label-login" htmlFor="password">Hasło</label>
            <Input
              type="password"
              className="login-input"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form_border"></div>

          <div className="form-group">
            <button className="button-login" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Zaloguj</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div class="column_nav">
          <a class="register" link>Zarejestruj się</a>
        </div>
      </div>
    </div>
  );
};

export default Login;