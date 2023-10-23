import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

class PushNotificationService {
  async initialize() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const alert = remoteMessage.data?.alert as string;
      await this.showNotify(alert);
    });
  }

  async showNotify(message: string) {
    await notifee.displayNotification({
      title: 'Notification Title',
      body: message,
      android: {
        channelId: 'default',
      },
    });
  }
}

export default new PushNotificationService();
