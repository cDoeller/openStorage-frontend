import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FooterProfile.css";

function FooterProfile() {
  const [showMenu, setShowMenu] = useState(true);

  const profileMenuElement = (
    <div className="footer-profile-menu-wrapper">
      <Link to="#">
        <button className="footer-profile-menu-button">
          Verify Artist Account
        </button>
      </Link>
      {/* <button className="footer-profile-menu-button">Another Button</button> */}
    </div>
  );

  function handleMenuClick() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className="footer-profile-wrapper">
        <Link
          onClick={() => {
            setShowMenu(false);
          }}
          to="#"
        >
          <div className="footer-profile-icon-wrapper">
            <img src="/img/star-icon.png" alt="" />
          </div>
        </Link>
        <Link
          onClick={() => {
            setShowMenu(false);
          }}
          to="/notifications"
        >
          <div className="footer-profile-icon-wrapper">
            <img src="/img/bell-icon.png" alt="" />
          </div>
        </Link>
        <Link
          onClick={() => {
            setShowMenu(false);
          }}
          to="/faq"
        >
          <div className="footer-profile-icon-wrapper">
            <img src="/img/question-icon.png" alt="" />
          </div>
        </Link>
        <div
          onClick={handleMenuClick}
          className={"footer-profile-icon-wrapper " + (showMenu && "rotated")}
        >
          <img src="/img/more-icon.png" alt="" />
        </div>
      </div>
      {showMenu && profileMenuElement}
    </>
  );
}

export default FooterProfile;
