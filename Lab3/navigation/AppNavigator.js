import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUser } from '../screens/UserContext';

// Import các màn hình
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import Services from '../screens/Services';
import ServiceDetail from '../screens/ServiceDetail';
import AddNewService from '../screens/AddNewService';
import EditService from '../screens/EditService';
import Appointments from '../screens/Appointments';
import Customers from '../screens/Customers';
import EditCustomer from '../screens/EditCustomer';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

const AppNavigator = () =>
{
    useUser(); // vẫn giữ để context hoạt động, nhưng không cần điều kiện

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Services" component={Services} />
                <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
                <Stack.Screen name="AddNewService" component={AddNewService} />
                <Stack.Screen name="EditService" component={EditService} />
                <Stack.Screen name="Appointments" component={Appointments} />
                <Stack.Screen name="Customers" component={Customers} />
                <Stack.Screen name="EditCustomer" component={EditCustomer} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; 