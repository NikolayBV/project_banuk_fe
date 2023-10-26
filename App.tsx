import React, {useEffect} from 'react';
import EnterScreen from './src/screens/EnterScreen';
import {NavigationContainer} from '@react-navigation/native';
import theme from './src/styles/theme';
import SignUpScreen from './src/screens/SignUpScreen';
import Toast from 'react-native-toast-message';
import SignInScreen from './src/screens/SignInScreen';
import MainScreen from './src/screens/MainScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from './src/screens/ContactScreen';
import {ContactScreenProps} from './src/screens/ContactScreen/ContactScreen';
import {NativeBaseProvider} from 'native-base';
import {useAuth} from './src/utils/hooks/useAuth';
import PushNotificationService from './src/components/common/services/pushNotification.service';

export type RootStackParamList = {
  EnterScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  MainScreen: undefined;
  ContactScreen: ContactScreenProps;
};

const Stack = createStackNavigator<RootStackParamList>();

const NonAuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'EnterScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="EnterScreen" component={EnterScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'MainScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={({route}) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: '#DEB887',
          },
          title: route.params.name,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </Stack.Navigator>
  );
};

function App() {
  const auth = useAuth();

  useEffect(() => {
    PushNotificationService.initialize();
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        {auth ? <AuthNavigator /> : <NonAuthNavigator />}
        <Toast />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
