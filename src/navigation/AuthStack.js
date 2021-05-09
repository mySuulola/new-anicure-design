import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/public/LoginScreen';
import AppIntro from '../screens/public/AppIntro';
import CreateAccount from '../screens/public/CreateAccount';
import RegisterPhoneNumber from '../screens/public/RegisterPhoneNumber';
import VerifyPhoneNumber from '../screens/public/VerifyPhoneNumber';
import AddProfileDetails from '../screens/public/AddProfileDetails';
import CreateFarm from '../screens/public/CreateFarm';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator initialRouteName="Intro" headerMode="none">
        <Stack.Screen name="Intro" component={AppIntro} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="AddProfileDetails" component={AddProfileDetails} />
        <Stack.Screen name="CreateFarm" component={CreateFarm} />
        <Stack.Screen name="RegisterPhoneNumber" component={RegisterPhoneNumber} />
        <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
      </Stack.Navigator>
  );
};

export default AuthStack;
