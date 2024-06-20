import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import HomeScreen from '../screens/home/HomeScreen';
import AddMedicationScreen from '../screens/medication/MedicationScreen';
import TrackingScreen from '../screens/tracking/TrackingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {

  return (
      <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Medication" component={AddMedicationScreen} />
          <Tab.Screen name="Track Progress" component={TrackingScreen} />
      </Tab.Navigator>
  );
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Welcome" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;