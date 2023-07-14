import React, {useCallback, useEffect, useState} from 'react';
import EnterScreen from './src/components/screens/EnterScreen';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import theme from './theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/components/screens/SignUpScreen';
import {Provider} from 'react-redux';
import {persistore, store} from './src/store';
import Toast from 'react-native-toast-message';
import SignInScreen from './src/components/screens/SignInScreen';
import MainScreen from './src/components/screens/MainScreen';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <Stack.Navigator
              initialRouteName={'EnterScreen'}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Enter" component={EnterScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
            <Toast />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
