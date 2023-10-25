import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

class PushNotificationService {
  async initialize() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const alert = remoteMessage.data?.alert as string;
      await this.showNotify(alert, channelId);
    });
    messaging().onMessage(async remoteMessage => {
      const alert = remoteMessage.data?.alert as string;
      await this.showNotify(alert, channelId);
    });
  }

  async showNotify(message: string, channelId: string) {
    await notifee.displayNotification({
      title: 'Notification Title',
      body: message,
      android: {
        channelId,
      },
    });
  }
}

export default new PushNotificationService();
