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
  const [passwordsMatching, setPasswordsMatching] = useState(true);

  const navigate = useNavigate();

  const passwordError = (
    <>
      <h3 className="signup-password-error">
        Your passwords do not match. <br /> please try again.
      </h3>
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatedPassword) {
      setPasswordsMatching(false);
      setPassword("");
      setRepeatedPassword("");
      return;
    } else {
      setPasswordsMatching(true);
    }

    const newUser = {
      email: email,
      password: password,
      user_name: userName,
    };

    // ******* TO DO: ERROR HANDLING
    // axios
    //   .post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, newUser)
    authService
      .signup(newUser)
      .then((createdUser) => {
        console.log(createdUser);
        navigate("/login");
      })
      .catch((err) => console.log(err));
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
        <label htmlFor="" className="signup-form-label">
          repeat password
          <input
            type="password"
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
            }}
            value={repeatedPassword}
            required
            className="signup-form-input"
          />
        </label>
        {!passwordsMatching && passwordError}
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
