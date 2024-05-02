import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/FooterProfile.css";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.services";
import Popup from "./Popup";

function FooterProfile(props) {
  const { pathname } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newNotificationsAmount, setNewNotificationsAmount] = useState(0);

  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      userService
        .getUser(user._id)
        .then((response) => {
          // console.log(response.data);
          setIsArtist(response.data.isArtist);
          return userService.hasNewNotifications(user._id);
        })
        // get the amount of new notifications
        .then((res) => {
          console.log(res.data);
          setNewNotificationsAmount(res.data.newNotifications);
        })
        .catch((err) => console.log(err));
    }
  }, [user, pathname]);

  // * "MORE" - MENU ELEMENTS
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
      <button
        onClick={() => {
          setShowPopup(true);
          handleMenuClick();
        }}
        className="footer-profile-menu-button"
      >
        Delete Account
      </button>
    </div>
  );

  function handleMenuClick() {
    setShowMenu(!showMenu);
  }

  // * DELETE ACCOUNT
  function handleDeleteAccount() {
    if (user) {
      userService
        .deleteUser(user._id)
        .then((response) => {
          logOutUser();
        })
        .catch((err) => console.log(err));
    }
  }

  // data for popup
  const deletePopupHeadline = "Delete Account";
  const deletePopupText =
    "Are you sure you want to delete your account, all your artworks and personal information be deleted from our data base?";
  const deletePopupButton = (
    <button onClick={handleDeleteAccount} className="popup-button">
      OK
    </button>
  );

  return (
    <>
      <Popup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        headline={deletePopupHeadline}
        text={deletePopupText}
        button={deletePopupButton}
      />
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
            {newNotificationsAmount != 0 && (
              <div className="footer-profile-icon-notifications-display-wrapper">
                <p className="footer-profile-icon-notifications-display-number">
                  {newNotificationsAmount}
                </p>
              </div>
            )}
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
