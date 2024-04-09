import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/SignUp.css";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
  };

  return (
    <>
      <h1 className="signup-headline">Welcome to Open Storage</h1>
      <form action="" className="signup-form">
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
        <button type="submit" className="signup-form-button">
          Sign Up
        </button>
        <Link to="/login">
          <p className="singup-login-link">Already have an Acoount?</p>
        </Link>
      </form>
    </>
  );
}

export default SignUpPage;
