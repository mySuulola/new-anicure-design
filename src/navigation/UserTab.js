import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
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


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const UserTab = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Landing" headerMode="none">
        <Stack.Screen name="Landing" component={TabNavigator} />
        <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="VideoChat" component={VideoChat} />
        <Stack.Screen name="PastAppointmentDetail" component={PastAppointmentDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserTab;
