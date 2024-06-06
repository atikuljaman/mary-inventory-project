import { IoNotifications, IoNotificationsOffSharp } from "react-icons/io5";
import { ChatContext } from "../../context/chatContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { unreadNotificationFunc } from "../../utils/unreadNotification";
import moment from "moment";
import "./Notification.css";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  const unreadNotification = unreadNotificationFunc(notifications);

  const modifiedNotifications = notifications.map((notification) => {
    const sender = allUsers?.find(
      (user) => user?._id === notification?.senderId
    );

    return {
      ...notification,
      senderName: sender?.firstName + " " + sender?.lastName,
      senderImage: sender?.image,
    };
  });

  return (
    <div className="notification-wrapper">
      <button className="notification-btn" onClick={() => setIsOpen(!isOpen)}>
        <IoNotifications />

        {unreadNotification?.length > 0 && (
          <div className="notification-count">{unreadNotification?.length}</div>
        )}
      </button>

      {isOpen && (
        <div className="notification-box">
          <div className="notification-header">
            <h6>Notifications</h6>
            <div
              className="mark-all-as-read-btn"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark all
            </div>
          </div>

          <div className="notification-body">
            {modifiedNotifications?.length < 1 ? (
              <p className="no-notification">
                <IoNotificationsOffSharp className="no-notification-icon" />
                No notification found
              </p>
            ) : (
              modifiedNotifications?.map((notification, index) => (
                <div
                  className={
                    notification?.isRead
                      ? "notification read"
                      : "notification unread"
                  }
                  key={index}
                  onClick={() => {
                    markNotificationAsRead(
                      notification,
                      userChats,
                      user,
                      notifications
                    );

                    setIsOpen(false);
                  }}
                >
                  <div
                    className="notification-image"
                    style={{
                      backgroundImage: `url(${notification?.senderImage})`,
                    }}
                  ></div>
                  <div className="notification-content">
                    <h5>
                      <span>{notification?.senderName}</span> sent you a new
                      message
                    </h5>
                    <p>{moment(notification?.date).fromNow()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
