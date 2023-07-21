import React from 'react';
import EnterScreen from './src/components/screens/EnterScreen';
import {NavigationContainer} from '@react-navigation/native';
import theme from './src/styles/theme';
import SignUpScreen from './src/components/screens/SignUpScreen';
import {Provider} from 'react-redux';
import {persistore, store} from './src/store';
import Toast from 'react-native-toast-message';
import SignInScreen from './src/components/screens/SignInScreen';
import MainScreen from './src/components/screens/MainScreen';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from './src/components/screens/ContactScreen';
import {ContactScreenProps} from './src/components/screens/ContactScreen/ContactScreen';
import {NativeBaseProvider} from 'native-base';

export type RootStackParamList = {
  EnterScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  MainScreen: undefined;
  ContactScreen: ContactScreenProps;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <NavigationContainer>
          <NativeBaseProvider theme={theme}>
            <Stack.Navigator
              initialRouteName={'EnterScreen'}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="EnterScreen" component={EnterScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
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
            <Toast />
          </NativeBaseProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
