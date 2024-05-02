import React, { useContext, useState } from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  // const [showPopup, setShowPopup] = useState(false);

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const publicNav = (
    <div className="nav-top-signup-login">
      <Link to="/signup">
        <h3 className="nav-top-signup-login-text"> Sign up </h3>
      </Link>
      <Link to="/login">
        <h3 className="nav-top-signup-login-text"> Log In </h3>
      </Link>
    </div>
  );

  const privateNav = (
    <div className="nav-top-signup-login">
      <Link to="/profile">
        <h3 className="nav-top-signup-login-text">{user && user.user_name}</h3>
      </Link>
      <div className="nav-top-logo-container" onClick={logOutUser}>
        <img className="nav-top-logo-img" src="/img/signout.png" alt="" />
      </div>
    </div>
  );

  // const popup = (
  //   <div className="nav-bottom-popup">
  //     <Link to="#">
  //       <button
  //         onClick={togglePopup}
  //         className="nav-bottom-popup-button nav-bottom-link"
  //       >
  //         Artist
  //       </button>
  //     </Link>
  //     <Link to="#">
  //       <button
  //         onClick={togglePopup}
  //         className="nav-bottom-popup-button nav-bottom-link"
  //       >
  //         Art Lover
  //       </button>
  //     </Link>
  //   </div>
  // );

  // function togglePopup() {
  //   if (showPopup) {
  //     setShowPopup(false);
  //   } else {
  //     setShowPopup(true);
  //   }
  // }

  return (
    <nav className="nav">
      <div className="nav-top">
        <div className="nav-top-logo-container">
          <Link to="/">
            <img
              src="/img/logo-V1.png"
              alt="open-storage-logo"
              className="nav-top-logo-img"
            />
          </Link>
        </div>
        {!isLoggedIn && publicNav}
        {isLoggedIn && privateNav}
      </div>
      <div className="nav-bottom">
        <Link to="/artworks">
          <h3 className="nav-bottom-link">Artworks</h3>
        </Link>
        {/* <div className="nav-bottom-link-container"> */}
        <Link to="/manual">
          <h3 className="nav-bottom-link">How it works</h3>
        </Link>
        {/* {showPopup && popup} */}
        {/* </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
