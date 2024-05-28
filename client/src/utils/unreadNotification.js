export const unreadNotificationFunc = (notifications) => {
  return notifications.filter((notification) => notification.isRead === false);
};
