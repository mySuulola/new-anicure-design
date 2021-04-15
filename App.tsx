/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen'
import Providers from './src/navigation';
import {
  View,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AnicureText from './src/components/AnicureText';
import { APP_GREEN } from './src/utils/constant';
import * as Sentry from "@sentry/react-native";


Sentry.init({
  dsn: "https://86ff2572e3bb41d39de38519dbfda232@o549513.ingest.sentry.io/5720733",
});

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
    return unsubscribe();
  }, [])

  const unsubscribe = NetInfo.addEventListener((state: any) => {
    if (isConnected !== state.isConnected) {
      setIsConnected(state.isConnected)
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      { isConnected === false && <AnicureText text={'Internet connectivity issues'} type="subTitle" otherStyles={{ marginTop: 0, paddingTop: 10, backgroundColor: APP_GREEN, color: "#FFFFFF", paddingVertical: 5, fontSize: 10 }} />}
      <Providers />
    </View>
  );
};


export default App;
