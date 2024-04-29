import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/FooterProfile.css";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.services";

function FooterProfile() {
  const [showMenu, setShowMenu] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      userService
        .getUser(user._id)
        .then((response) => {
          console.log(response.data);
          setIsArtist(response.data.isArtist);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const profileMenuElement = (
    <div className="footer-profile-menu-wrapper">
      {isArtist ? (
        ""
      ) : (
        <Link to="/profile/become-artist">
          <button
            onClick={handleMenuClick}
            className="footer-profile-menu-button"
          >
            Verify Artist Account
          </button>
        </Link>
      )}
      <Link to="/profile/become-artist">
        <button
          onClick={handleMenuClick}
          className="footer-profile-menu-button"
        >
          Delete Account
        </button>
      </Link>
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
