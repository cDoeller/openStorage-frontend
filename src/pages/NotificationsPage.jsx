import React, { useEffect, useContext, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import "../styles/NotificationsPage.css";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.services";

function Notifications() {
  //isNew
  const [notifications, setNotifications] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      userService
        .getNotifications(user._id)
        .then((response) => {
          // console.log(response.data.notifications);
          setNotifications(response.data.notifications);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="page-wrapper mobile-dvh">
      <div className="notifications-wrapper">
        {notifications &&
          notifications.map((notification) => {
            return (
              <NotificationCard
                key={notification._id}
                notification={notification}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Notifications;

//
