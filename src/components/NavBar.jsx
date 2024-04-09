import React from "react";
import "../styles/NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("userName");

  const publicNav = (
    <div className="nav-signup-login">
      <Link to="/signup">
        <h3 className="nav-signup-login-text"> Sign up </h3>
      </Link>
      <Link to="/login">
        <h3 className="nav-signup-login-text"> Log In </h3>
      </Link>
    </div>
  );

  const privateNav = (
    <div className="nav-signup-login">
      <Link to="/">
        <h3 className="nav-signup-login-text"> {userName} </h3>
      </Link>
      <Link to="/">
        <div className="nav-logo-container">
          <img
            className="nav-logo-img"
            src="../../public/img/signout.png"
            alt=""
          />
        </div>
      </Link>
    </div>
  );

  return (
    <nav className="nav">
        <div className="nav-logo-container">
          <img
            src="../../public/img/logo-placeholder-image.png"
            alt="open-storage-logo"
            className="nav-logo-img"
          />
        </div>
        {!isLoggedIn && publicNav}
        {isLoggedIn && privateNav}
    </nav>
  );
}

export default NavBar;
