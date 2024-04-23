import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../styles/Login.css";

import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.services";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    authService
      .login(body)
      .then((response) => {
        // save token in local storage
        const token = response.data.authToken;
        console.log(token);
        localStorage.setItem("authToken", token);

        // check if token correct: verify route & local storage
        authenticateUser();

        // navigate to profile page
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
  };

  const errorMessageElement = (
    <>
      <h3 className="page-error-messages">{errorMessage}</h3>
    </>
  );

  return (
    <div className="signup-page-wrapper page-wrapper">
      <h1 className="signup-headline">Welcome to Open Storage</h1>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="signup-form"
        id="login-form"
      >
        <label htmlFor="" className="signup-form-label">
          email
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            className="signup-form-input"
          />
        </label>
        <label htmlFor="" className="signup-form-label">
          password
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
            className="signup-form-input"
          />
        </label>
        {errorMessage && errorMessageElement}
        <button type="submit" className="signup-form-button">
          Log In
        </button>
        <Link to="#">
          <p className="login-bottom-link">Forgot password?</p>
        </Link>
        <Link to="#">
          <p className="login-bottom-link">Privacy</p>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
