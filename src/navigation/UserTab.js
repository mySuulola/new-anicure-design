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


const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const VaccinationStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />
      <HomeStack.Screen
        name="Website"
        component={WebsiteScreen}
        options={{
          title: 'eVet',
        }}
      />
      <HomeStack.Screen
        name="Tips"
        component={TipsScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="TipsDetail"
        component={TipsDetailScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
const Vaccination = () => {
  return (
    <VaccinationStack.Navigator initialRouteName="Vaccination">
      <VaccinationStack.Screen
        name="Vaccination"
        component={VaccinationScreen}
        options={{headerShown: false}}
      />
      <VaccinationStack.Screen
        name="VCreate"
        component={VaccinationCreateScreen}
        options={{headerShown: false}}
      />
      <VaccinationStack.Screen
        name="VDetail"
        component={VaccinationDetailScreen}
        options={{headerShown: false}}
      />
      <VaccinationStack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{headerShown: false}}
      />
      <VaccinationStack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{headerShown: false}}
      />
    </VaccinationStack.Navigator>
  );
};

const UserTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Store"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconColor;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Vaccination') {
              // iconColor = focused ? 'red' : 'green';
              iconName = 'medical-bag';
            } else if (route.name === 'Profile') {
              iconName = 'account'; 
            }else {
              iconName = "cash"
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'rgba(9, 20, 175, 0.7)',
          inactiveTintColor: 'rgba(146, 144, 146, 0.3)',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Vaccination" component={Vaccination} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Plans" component={BillingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserTab;
