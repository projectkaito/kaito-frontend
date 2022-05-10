import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsSystem, {
  atalhoTheme,
  baseTheme,
  dismissNotification,
  Theme,
  Notification as NotificationInterface,
} from "reapop";
import { RootState } from "src/state";

export const Notification = () => {
  const customTheme: Theme = {
    ...baseTheme,
    ...atalhoTheme,
    // container: (notification)=>({
    //   ...baseTheme.container(notification),
    //     background:"red"
    // }),
    notification: (notification: NotificationInterface) => ({
      display: "grid",
      borderRadius: 10,
      marginBottom: 15,
      background: `linear-gradient(90deg, hsla(179, 67%, 66%, 1) 0%, hsla(238, 74%, 61%, 1) 100%)`,
      minWidth: 320,
      padding: 2,
      gridTemplateColumns: "min-content 1fr",
      maxWidth: 500,
    }),
    notificationTitle: (notification: NotificationInterface) => ({
      color: "black",
      fontSize:14,
    }),
    notificationMessage: (notification: NotificationInterface) => ({
      color: "black",
      fontSize: 11,
    }),
    notificationDismissIcon: (notification: NotificationInterface) => ({
      color: "black",
      width: 15,
      height: 15,
      position: "absolute",
      top: "calc(50% - 9px)",
      right: 20,
      cursor: "pointer",
    }),
    notificationMeta: (notification: NotificationInterface) => ({
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      background: "white",
      padding: 7,
      paddingTop: 7,
      paddingBottom: 2,
    }),
    notificationIcon: ({ status }: NotificationInterface) => ({
      height: status === "loading"?17:13,
      width: status === "loading"?17:13,
      color: status === "success" ? "rgb(4,186,105)" : status === "error" ? "rgb(225,51,28)" : "black",
      position: "absolute",
      top: status === "loading" ? 19 : 32,
      left: status === "loading" ? "auto" : 35,
      right: status === "loading" ? 20 : "auto",
      background: !(status === "success" || status === "error") ? "transparent" : "white",
      borderRadius: 360,
    }),
    notificationImage: (notification: NotificationInterface) => ({
      width: "45px",
      height: "45px",
      display: "block",
      backgroundPosition: "center",
      backgroundColor: "white",
      backgroundRepeat: "no-repeat",
      backgroundSize: "80%",
      borderRadius: "40%",
    }),
    notificationImageContainer: (notification: NotificationInterface) => ({
      background: "white",
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      padding: 2,
      paddingRight: 0,
    }),
  };

  const dispatch = useDispatch();
  // 1. Retrieve the notifications to display.
  const notifications = useSelector((state: RootState) => state.notifications);

  return (
    <div>
      <NotificationsSystem
        // 2. Pass the notifications you want Reapop to display.
        notifications={notifications}
        // 3. Pass the function used to dismiss a notification.
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        // 4. Pass a builtIn theme or a custom theme.
        theme={customTheme}
      />
    </div>
  );
};

// container: (position: Position, singleContainer: boolean) => CSSProperties;
//     notificationDismissIcon: (notification: Notification) => CSSProperties;
//     notification: (notification: Notification) => CSSProperties;
//     notificationIcon: (notification: Notification) => CSSProperties;
//     notificationImageContainer: (notification: Notification) => CSSProperties;
//     notificationImage: (notification: Notification) => CSSProperties;
//     notificationMeta: (notification: Notification) => CSSProperties;
//     notificationTitle: (notification: Notification) => CSSProperties;
//     notificationMessage: (notification: Notification) => CSSProperties;
//     notificationButtons: (notification: Notification) => CSSProperties;
//     notificationButton: (notification: Notification, position: number, state: NotificationButtonState) => CSSProperties;
//     notificationButtonText: (notification: Notification, position: number, state: NotificationButtonState) => CSSProperties;
