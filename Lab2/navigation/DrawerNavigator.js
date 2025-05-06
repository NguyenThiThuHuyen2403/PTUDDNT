import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Favorites from '../screens/Favorites';
import User from '../screens/User';
import Options from '../screens/Options';
import colors from '../utility/colors';

// Hàm để lấy icon cho tab
const getTabBarItemIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={22} style={{ color }} />
);

// Khai báo Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Các màn hình Stack
const ContactsScreens = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Contacts" component={Contacts} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const FavoritesScreens = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const UserScreens = ({ navigation }) => (
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
        headerRight: () => (
          <MaterialIcons
            name="settings"
            size={24}
            style={{ color: 'white', marginRight: 10 }}
            onPress={() => navigation.navigate('Options')} // Điều hướng tới Options
          />
        ),
      }}
    />
    <Stack.Screen
      name="Options"
      component={Options}
      options={{ title: "Options" }}
    />
  </Stack.Navigator>
);

// Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="ContactsScreens"
    screenOptions={{
      tabBarActiveTintColor: colors.blue,
      tabBarInactiveTintColor: colors.grey,
    }}
  >
    <Tab.Screen
      name="ContactsScreens"
      component={ContactsScreens}
      options={{
        title: 'Contacts',
        tabBarIcon: getTabBarItemIcon('list'),
      }}
    />
    <Tab.Screen
      name="FavoritesScreens"
      component={FavoritesScreens}
      options={{
        title: 'Favorites',
        tabBarIcon: getTabBarItemIcon('star'),
      }}
    />
    <Tab.Screen
      name="UserScreens"
      component={UserScreens}
      options={{
        title: 'Me',
        tabBarIcon: getTabBarItemIcon('person'),
      }}
    />
  </Tab.Navigator>
);

// Drawer Navigator
const DrawerNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{ drawerIcon: getTabBarItemIcon('home') }}
      />
      <Drawer.Screen
        name="Options"
        component={Options}
        options={{
          title: 'Options',
          drawerIcon: getTabBarItemIcon('settings'),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default DrawerNavigator;
