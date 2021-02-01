import React from 'react';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';


const GuestRoutes = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>

  );
};

export default GuestRoutes;
