import PushNotification from "react-native-push-notification";
import { navigateMovement } from "../navigation/RootNavigation"

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onAction: async function (notification) {
    try {

      console.log(notification.userInfo)
      if (notification.action.toLowerCase() === "answer") {

        PushNotification.invokeApp(notification)
        const parsedData = await JSON.parse(notification.userInfo);

        if (parsedData.route === "call") {
          // const payload = { channelName: notification.userInfo.channelName, agoraToken: notification.userInfo.agoraToken }
          // navigateMovement("VideoCall", { payload });
          navigateMovement("Appointment",);
        } else if(parsedData.route === "chat") {
          const payload = { name: parsedData.name, sender: parsedData.sender, recipient: parsedData.recipient }
          navigateMovement("Chat", { payload });
        }
      }
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION DATA:", notification.userInfo);

    } catch (error) {
      console.log("ACTION ERROR:", error);
    }
    // process the action
  },
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    try {
      console.log("REMOTE NOTIFICATION:", notification);
      launchPushNotification(notification);
    } catch (error) {
      console.log("REMOTE NOTIFICATION ERROR:", notification);
    }
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const launchPushNotification = (
  {
    bigPictureUrl,
    subText,
    channelId,
    data,
    id,
    largeIconUrl,
    message,
    priority,
    tag,
    title
  }
) => {
console.log(data.callType)
  try {
    PushNotification.localNotification({
      // channelId: channelId,
      allowWhileIdle: true,
      ticker: title, // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: largeIconUrl ?? "ic_launcher", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: message, // (optional) default: "message" prop
      subText: subText ?? "Anicure", // (optional) default: none
      bigPictureUrl: bigPictureUrl ?? undefined, // (optional) default: undefined
      bigLargeIcon: "ic_launcher", // (optional) default: undefined
      bigLargeIconUrl: "https://res.cloudinary.com/dxmewvier/image/upload/v1614332753/dot.png", // (optional) default: undefined
      color: "#8AC760", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: tag, // (optional) add tag to message
      group: "group", // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      messageId: id, // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

      actions: ["Answer", "Cancel"], // (Android only) See the doc for notification actions to know more
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      category: "", // (optional) default: empty string

      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: title, // (optional)
      message: message, // (required)
      userInfo: data, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.

    });
  } catch (error) {
    console.log('error---------', error);
  }
};
