import { useState, useEffect } from "react";

export const useNotification = (notification) => {
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    if (notification) {
      setNotificationData(notification);
      alert(`Notification: ${notification}`);
    }
  }, [notification]);

  return notificationData;
};
