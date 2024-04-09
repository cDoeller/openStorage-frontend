import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import "../styles/Login.css";

import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/login`, body)
      .then((response) => {
        // save token in local storage
        const token = response.data.authToken;
        console.log(token);
        localStorage.setItem("authToken", token);

        // check if token correct: verify route & local storage
        authenticateUser();

        // navigate to profile page
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-page-wrapper">
      <h1 className="signup-headline">Welcome to Open Storage</h1>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="signup-form"
      >
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