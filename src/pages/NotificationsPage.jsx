import React from "react";
import NotificationCard from "../components/NotificationCard";
import "../styles/NotificationsPage.css"

function Notifications() {
  return (
    <div className="page-wrapper mobile-dvh">
      <div className="notifications-wrapper">
        <NotificationCard
          notificationTitle={"New Request"}
          notificationText={
            "user **USER** has sent a new request – Click on the button below to check it out!"
          }
          notificationType={"request"}
          isNew = {true}
        />
        <NotificationCard
          notificationTitle={"Rental Returned"}
          notificationText={
            "user **USER** has succesfully returned your artwork"
          }
          notificationType={"okay"}
          isNew = {false}
        />
        <NotificationCard
          notificationTitle={"New Request"}
          notificationText={
            "User X would like to extend the rental time of your artwork X."
          }
          notificationType={"accept-reject"}
          isNew = {false}
        />
      </div>
    </div>
  );
}

export default Notifications;
