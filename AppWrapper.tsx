import React from 'react';
import {Provider} from 'react-redux';
import {persistore, store} from './src/store';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
