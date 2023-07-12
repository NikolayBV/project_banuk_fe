import React from 'react';
import EnterScreen from './src/components/screens/EnterScreen';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import theme from './theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/components/screens/SignUpScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import Toast from 'react-native-toast-message';
import SignInScreen from './src/components/screens/SignInScreen';
import MainScreen from './src/components/screens/MainScreen';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <Stack.Navigator
            initialRouteName="Enter"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Enter" component={EnterScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
          </Stack.Navigator>
          <Toast />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
