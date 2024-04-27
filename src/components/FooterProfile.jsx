import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FooterProfile.css";

function FooterProfile() {
  const [showMenu, setShowMenu] = useState(false);

  const profileMenuElement = (
    <div className="footer-profile-menu-wrapper">
      <Link to="/profile/become-artist">
        <button onClick={handleMenuClick} className="footer-profile-menu-button">
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
          to="/favorites"
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
          to="/profile/faq"
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
