import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import "../styles/SignUp.css";
import authService from "../services/auth.services";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const errorMessageElement = (
    <>
      <h3 className="page-error-messages">{errorMessage}</h3>
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatedPassword) {
      setErrorMessage("Passwords do not match.");
      setPassword("");
      setRepeatedPassword("");
      return;
    }

    const newUser = {
      email: email,
      password: password,
      user_name: userName,
    };

    // ******* TO DO: ERROR HANDLING
    authService
      .signup(newUser)
      .then((createdUser) => {
        console.log(createdUser);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="signup-page-wrapper page-wrapper">
      <h1 className="signup-headline">Welcome to Open Storage</h1>
      <form
        action=""
        className="signup-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="" className="signup-form-label">
          user name
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            required
            className="signup-form-input"
          />
        </label>
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
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
            className="signup-form-input"
          />
        </label>
        <label htmlFor="" className="signup-form-label">
          repeat password
          <input
            type="password"
            name="passwordRepeat"
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
            }}
            value={repeatedPassword}
            required
            className="signup-form-input"
          />
        </label>
        {errorMessage && errorMessageElement}
        <button type="submit" className="signup-form-button">
          Sign Up
        </button>
        <Link to="/login">
          <p className="singup-login-link">Already have an Acoount?</p>
        </Link>
      </form>
    </div>
  );
}

export default SignUpPage;
