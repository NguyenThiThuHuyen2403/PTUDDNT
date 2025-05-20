import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'; // màn danh sách dịch vụ (đã đổi sang Home.js mới)
import Transaction from '../screens/Transaction';
import Customer from '../screens/Customer';
import Setting from '../screens/Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function CustomerTabNavigator()
{
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size }) =>
        {
          let iconName;

          switch (route.name)
          {
            case 'Home':
              iconName = 'home';
              break;
            case 'Transaction':
              iconName = 'receipt-long';
              break;
            case 'Customer':
              iconName = 'person';
              break;
            case 'Setting':
              iconName = 'settings';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Customer" component={Customer} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}
