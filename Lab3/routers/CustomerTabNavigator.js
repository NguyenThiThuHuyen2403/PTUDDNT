import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'; // màn danh sách dịch vụ (đã đổi sang Home.js mới)
import Appointments from '../screens/Appointments';
import Profile from '../screens/Profile';
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
            case 'Appointment':
              iconName = 'event';
              break;
            case 'Profile':
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
      <Tab.Screen name="Appointment" component={Appointments} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}
