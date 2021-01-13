import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  onAction: function (notification) {
    PushNotification.invokeApp(notification)
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const LocalNotification = ({message, date }) => {
  console.log(date)
  console.log(new Date(`${date}`))
  console.log('hi');

  try {
    PushNotification.localNotificationSchedule({
      autoCancel: true,
      message: `${message}`,
      date: new Date(date),
      allowWhileIdle: true,
      bigText: message,
      subText: message,
      title: 'Your Birds due for Vaccination in 24 hours',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Launch App"]',
      
    });
  } catch (error) {
    console.log('eror---------', error);
  }
};
