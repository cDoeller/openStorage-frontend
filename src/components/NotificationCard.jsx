import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotificationCard.css";

function NotificationCard(props) {
  const { notification } = props;

  console.log(notification);

  const notificationTitle = getNotificationTitle();
  function getNotificationTitle() {
    if (notification) {
      switch (notification.type) {
        case "new-request":
          return <>New Request</>;
        case "extend-request":
          return <>User Request</>;
        case "confirm":
          return <>Please Note</>;
      }
    }
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
        case "extend-request":
          return (
            <>
              <button className="notification-card-button">ACCEPT</button>
              <button className="notification-card-button">REJECT</button>
            </>
          );
        case "confirm":
          return <button className="notification-card-button">OKAY</button>;
      }
    }
  }

  const notificationText = getNotificationText();
  function getNotificationText() {
    if (notification) {
      switch (notification.type) {
        case "new-request":
          return (
            <>
              User {notification.request.user_borrowing.user_name} would like to
              rent your artwork {notification.request.artwork.title} – click on
              the button below to view the request!
            </>
          );
        case "extend-request":
          return (
            <>
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
              )}
            </>
          );
        case "confirm":
          return <>Please Note</>;
      }
    }
  }

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
          <p className="notification-card-text">{notificationText}</p>
          <div className="notification-card-button-wrapper">
            {notificationButton}
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationCard;
