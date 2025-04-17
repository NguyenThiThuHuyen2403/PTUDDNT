import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './Excersise 3/Login';
import CreateNewAccount from './Excersise 3/CreateNewAccount';
import ResetPassword from './Excersise 3/ResetPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
