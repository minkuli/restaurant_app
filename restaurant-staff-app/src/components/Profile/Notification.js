import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Notification.module.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchStaffPerson = async () => {
      const response = await fetch("/staff/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const newestNotifications = responseData
        .filter((res) => res.notification !== "No new orders")
        .slice(-5);

      console.log(newestNotifications);

      const loadedNotifications = [];
      for (let i in newestNotifications) {
        loadedNotifications.push({
          id: newestNotifications[i].id,
          role: newestNotifications[i].role,
          name: newestNotifications[i].name,
          notification: newestNotifications[i].notification,
        });
      }

      setNotifications(loadedNotifications);
    };

    fetchStaffPerson()
      .then()
      .catch((err) => console.log(err));
  }, []);

  const notificationsList = notifications.map((notification) => {
    return (
      <li className={classes.item} key={notification.id}>
        <span>
          {notification.role} {notification.name} says "
          {notification.notification}"
        </span>
      </li>
    );
  });

  return (
    <div className={classes.container}>
      <div className={classes.background}>
        <div className={classes.notifications}>
          <Card>
            <h2>Notifications</h2>
            <div>
              <ul>{notificationsList}</ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notification;
