/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import Providers from './src/navigation';
import {
  StatusBar,
  Platform,
  View,
} from 'react-native';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: "#ececec" }}>
      <View style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }} />
      <StatusBar barStyle="light-content" />
      <Providers />
    </View>
  );
};


export default App;
