import React from 'react';
import {StyleSheet} from 'react-native';
import MainLayout from './src/components/layouts/MainLayouts';
import EnterScreen from './src/components/screens/EnterScreen';
import {NativeBaseProvider} from 'native-base';
import theme from './theme';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <MainLayout>
        <EnterScreen />
      </MainLayout>
    </NativeBaseProvider>
  );
}

export default App;
