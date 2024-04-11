import React, { useContext } from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
        <h3 className="nav-signup-login-text"> {user && user.user_name} </h3>
      </Link>
      <div className="nav-logo-container" onClick={logOutUser}>
        <img
          className="nav-logo-img"
          src="../../public/img/signout.png"
          alt=""
        />
      </div>
    </div>
  );

  return (
    <nav className="nav">
      <div className="nav-logo-container">
        <Link to="/">
          <img
            src="../../public/img/logo-placeholder-image.png"
            alt="open-storage-logo"
            className="nav-logo-img"
          />
        </Link>
      </div>
      {!isLoggedIn && publicNav}
      {isLoggedIn && privateNav}
    </nav>
  );
}

export default NavBar;
