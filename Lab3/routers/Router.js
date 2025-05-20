// lab3/routers/Router.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Admin from '../screens/Admin';
import CustomerTabNavigator from './CustomerTabNavigator';
import Services from '../screens/Services';
import AddNewService from '../screens/AddNewService';
import ServiceDetail from '../screens/ServiceDetail';
import EditService from '../screens/EditService';

const Stack = createNativeStackNavigator();

export default function Router()
{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Customer" component={CustomerTabNavigator} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="AddNewService" component={AddNewService} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ headerShown: true }} />
        <Stack.Screen name="EditService" component={EditService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
