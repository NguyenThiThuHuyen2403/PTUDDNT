import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Favorites from '../screens/Favorites';
import User from '../screens/User';
import Options from '../screens/Options'; // ✅ Thêm dòng này

import colors from '../utility/colors';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const getTabBarIcon = (iconName) => ({ color }) => (
  <MaterialIcons name={iconName} size={26} color={color} />
);

// ✅ Settings button dùng useNavigation hook
import { useNavigation } from '@react-navigation/native';
const SettingsButton = () => {
  const navigation = useNavigation();
  return (
    <MaterialIcons
      name="settings"
      size={24}
      style={{ color: 'white', marginRight: 10 }}
      onPress={() => navigation.navigate('Options')}
    />
  );
};

const ContactsScreens = () => (
  <Stack.Navigator
    initialRouteName="Contacts"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: 'tomato' },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen name="Contacts" component={Contacts} />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ route }) => {
        const { contact } = route.params;
        const { name } = contact;
        return {
          title: name.split(' ')[0],
          headerStyle: { backgroundColor: colors.blue },
          headerTintColor: 'white',
        };
      }}
    />
  </Stack.Navigator>
);

const FavoritesScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const UserScreens = () => (
  <Stack.Navigator initialRouteName="User">
    <Stack.Screen
      name="User"
      component={User}
      options={{
        headerTitle: "Me",
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.blue,
        },
        headerRight: () => <SettingsButton />, // ✅ dùng component có navigation
      }}
    />
    <Stack.Screen
      name="Options"
      component={Options}
      options={{ title: 'Options' }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      barStyle={{ backgroundColor: colors.blue }}
      activeColor={colors.greyLight}
      inactiveColor={colors.greyDark}
      labeled={false}
    >
      <Tab.Screen
        name="ContactsScreens"
        component={ContactsScreens}
        options={{ tabBarIcon: getTabBarIcon('list') }}
      />
      <Tab.Screen
        name="FavoritesScreens"
        component={FavoritesScreens}
        options={{ tabBarIcon: getTabBarIcon('star') }}
      />
      <Tab.Screen
        name="UserScreens"
        component={UserScreens}
        options={{ tabBarIcon: getTabBarIcon('person') }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default TabNavigator;
