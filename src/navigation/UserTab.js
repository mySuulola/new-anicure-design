import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/tabs/HomeScreen';
import ChatScreen from '../screens/protected/Appointment/ChatScreen';
import TabBar from './TabBar';
import More from '../screens/tabs/More';
import Appointment from '../screens/tabs/Appointment';
import Search from '../screens/tabs/Search';
import DoctorDetail from '../screens/protected/DoctorDetail';
import VideoChat from '../screens/protected/VideoChat';
import PastAppointmentDetail from '../screens/protected/Appointment/PastAppointmentDetail';
import messaging from '@react-native-firebase/messaging';
import VoiceCall from '../screens/protected/Appointment/VoiceCall';
import AppointmentForm from '../screens/protected/Forms/AppointmentForm';
import { connect } from 'react-redux';
import apiFetch from '../utils/apiFetch';

import { navigationRef } from './RootNavigation';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const saveTokenToDatabase = async (token, mobileNumber) => {
  console.log('----------TOKEN----------')
  console.log(token)
  console.log('----------TOKEN----------')
  const networkRequest = await apiFetch.post("users/token", { fcmToken: token, mobileNumber });
  console.log(networkRequest)
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  )
}

const UserTab = ({ mobileNumber }) => {
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token, mobileNumber);
      });

    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token, mobileNumber);
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Landing" headerMode="none">
        <Stack.Screen name="Landing" component={TabNavigator} />
        <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="VideoCall" component={VideoChat} />
        <Stack.Screen name="VoiceCall" component={VoiceCall} />
        <Stack.Screen name="PastAppointmentDetail" component={PastAppointmentDetail} />
        <Stack.Screen name="AppointmentForm" component={AppointmentForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  mobileNumber: state.user.userDetail.mobileNumber,
})

export default connect(mapStateToProps)(UserTab);
