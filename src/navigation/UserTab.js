import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VaccinationScreen from '../screens/tabs/VaccinationScreen';
import ChatScreen from '../screens/protected/ChatScreen';
import { createStackNavigator } from '@react-navigation/stack';
import VaccinationCreateScreen from '../screens/protected/VaccinationCreateScreen';
import VaccinationDetailScreen from '../screens/protected/VaccinationDetailScreen';
import WebsiteScreen from '../screens/public/WebsiteScreen';
import TipsScreen from '../screens/public/TipsScreen';
import ScheduleScreen from '../screens/protected/ScheduleScreen';
import FeedbackScreen from '../screens/protected/FeedbackScreen';
import TipsDetailScreen from '../screens/public/TipsDetailScreen';
import BillingScreen from '../screens/tabs/BillingScreen';
import TabBar from './TabBar';
import More from '../screens/tabs/More';
import Appointment from '../screens/tabs/Appointment';
import Search from '../screens/tabs/Search';
import DoctorDetail from '../screens/protected/DoctorDetail';


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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserTab;
