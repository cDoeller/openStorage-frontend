import React from "react";
import "../styles/NotificationCard.css";

function NotificationCard(props) {
  const { notificationTitle, notificationText, notificationType, isNew } =
    props;

  const buttonWrapperOkay = (
    <div className="notification-card-button-wrapper">
      <button className="notification-card-button">OKAY</button>
    </div>
  );

  const buttonWrapperAcceptReject = (
    <div className="notification-card-button-wrapper">
      <button className="notification-card-button">ACCEPT</button>
      <button className="notification-card-button">REJECT</button>
    </div>
  );

  const buttonWrapperRequest = (
    <div className="notification-card-button-wrapper">
      <button className="notification-card-button">SHOW REQUEST</button>
    </div>
  );

  function renderNotificationButtons(type) {
    switch (type) {
      case "okay":
        return buttonWrapperOkay;
      case "accept-reject":
        return buttonWrapperAcceptReject;
      case "request":
        return buttonWrapperRequest;
    }
  }

  return (
    <div className="notification-card-wrapper">
      <div className={"notification-card-title-wrapper " + (isNew && "new")}>
        <div className="notification-card-title-icon-wrapper">
          <img src="/img/bell-icon.png" alt="" />
        </div>
        <h3 className="notification-card-headline">{notificationTitle}</h3>
      </div>
      <p className="notification-card-text">{notificationText}</p>
      {renderNotificationButtons(notificationType)}
    </div>
  );
}

export default NotificationCard;
