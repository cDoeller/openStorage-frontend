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
          console.log(response.data.notifications);
          setNotifications(response.data.notifications);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className={"page-wrapper mobile-dvh " + ((!notifications || notifications.length === 0) &&"flex-column")}>
      <div className="notifications-wrapper">
        {(!notifications || notifications.length === 0) && (
          <div className="notifications-none-wrapper">
            <div className="notifications-none-icon-wrapper">
              <img src="/img/bell-icon.png" alt="" />
            </div>
            <h3 className="notifications-none-text">No Notifications Available</h3>
          </div>
        )}
        {notifications &&
          notifications.map((notification) => {
            return (
              <NotificationCard
                key={notification._id}
                notification={notification}
                setNotifications={setNotifications}
                userId={user._id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Notifications;

//
