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
import Loader from './src/components/Loader';
import messaging from '@react-native-firebase/messaging';
import { launchPushNotification } from './src/services/LocalPushController';

const {store, persistor} = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  launchPushNotification(remoteMessage);
});

AppRegistry.registerComponent(appName, () => RNRedux);
