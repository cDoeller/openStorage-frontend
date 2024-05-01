import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/NotificationCard.css";
import userService from "../services/user.services";

function NotificationCard(props) {
  const { notification, setNotifications, userId } = props;

  // NOTIFICATION TITLE
  const notificationTitle = getNotificationTitle();
  function getNotificationTitle() {
    if (notification) {
      switch (notification.type) {
        case "new-request":
          return <>New Request</>;
        case "new-rental":
          return <>New Rental</>;
        case "change-request":
          return <>User Request</>;
        case "confirm":
          return <>Please Note</>;
      }
    }
  }

  // NOTIFICATION BUTTON TYPE AND FUNCTIONALITY
  function handleOkayClick() {
    // delete notification
    userService
      .deleteNotification(userId, notification._id)
      .then((response) => {
        // console.log(response.data.notifications);
        setNotifications(response.data.notifications);
      })
      .catch((err) => console.log(err));
  }

  const notificationButton = getNotificationButton();
  function getNotificationButton() {
    if (notification) {
      switch (notification.type) {
        case "new-request":
          return (
            <Link to={`/request/${notification.request._id}/details`}>
              <button className="notification-card-button">SHOW REQUEST</button>
            </Link>
          );
        case "new-rental":
          return (
            <Link to={`/request/${notification.request._id}/details`}>
              <button className="notification-card-button">SHOW RENTAL</button>
            </Link>
          );
        case "change-request":
          return (
            <>
              <button className="notification-card-button">ACCEPT</button>
              <button className="notification-card-button">REJECT</button>
            </>
          );
        case "confirm":
          return (
            <button
              onClick={handleOkayClick}
              className="notification-card-button"
            >
              OKAY
            </button>
          );
      }
    }
  }

  // NOTIFICATION TEXT CONTENT
  const notificationText = getNotificationText();
  function getNotificationText() {
    if (notification) {
      switch (notification.type) {
        case "new-rental":
          return (
            <>
              <p className="notification-card-text">
                Congratulations – You are now renting the artwork{" "}
                {notification.request.artwork.title}!
              </p>
              {notification.message && (
                <p className="notification-card-text">
                  The artist has left you a
                  message: <i>{notification.message}</i>
                </p>
              )}
            </>
          );
        case "new-request":
          return (
            <>
              <p className="notification-card-text">
                User {notification.request.user_borrowing.user_name} would like
                to rent your artwork {notification.request.artwork.title} –
                click on the button below to view the request!
              </p>
            </>
          );
        case "change-request":
          return (
            <>
              {/* <p className="notification-card-text"></p>
              User {notification.request.user_borrowing.user_name} would like to
              change the{" "}
              <Link
                className="notification-card-link"
                to={`/request/${notification.request._id}/details`}
              >
                rental agreement
              </Link>{" "}
              for your artwork {notification.request.artwork.title}.
              {notification.message && (
                <p className="notification-card-text">
                  "{notification.message}"
                </p>
              )} */}
            </>
          );
        case "confirm":
          return (
            <p className="notification-card-text">{notification.message}</p>
          );
      }
    }
  }

  // JSX
  return (
    <div className="notification-card-wrapper">
      {notification && (
        <>
          <div
            className={
              "notification-card-title-wrapper " + (notification.isNew && "new")
            }
          >
            <div className="notification-card-title-icon-wrapper">
              <img src="/img/bell-icon.png" alt="" />
            </div>
            <h3 className="notification-card-headline">{notificationTitle}</h3>
          </div>
          <div className="notification-card-text-wrapper">
            {notificationText}
          </div>
          <div className="notification-card-button-wrapper">
            {notificationButton}
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationCard;
