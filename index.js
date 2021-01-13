/**
 * @format
 */

import React from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
