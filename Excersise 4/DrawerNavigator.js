import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomTabNavigator from './BottomTabNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Main" component={BottomTabNavigator} options={{ title: 'Trang chính' }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
