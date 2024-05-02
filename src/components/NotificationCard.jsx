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

  function handleNewClick() {
    // change notification new = false
    userService
      .updateNotificationNew(userId, notification._id, {new: false})
      .then(() => {
        console.log("read")
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
              <button onClick={handleNewClick} className="notification-card-button">SHOW REQUEST</button>
            </Link>
          );
        case "new-rental":
          return (
            <Link to={`/request/${notification.request._id}/details`}>
              <button onClick={handleNewClick} className="notification-card-button">SHOW RENTAL</button>
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
      return (
        <>
          <p className="notification-card-text">{notification.text}</p>
          {notification.message && (
            <p className="notification-card-text">
              <i>{notification.message}</i>
            </p>
          )}
        </>
      );
    }
  }

  // JSX
  return (
    <div className="notification-card-wrapper">
      {notification && (
        <>
          <div
            className={
              "notification-card-title-wrapper " + (notification.new && "new")
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
