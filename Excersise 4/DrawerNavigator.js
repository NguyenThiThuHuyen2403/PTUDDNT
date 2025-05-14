import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './Home'
import Profile from './Profile'
import Setting from './Setting'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // 👈 Quan trọng
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
