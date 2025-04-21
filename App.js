//----Code Exersise 3-------
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider as PaperProvider } from 'react-native-paper';

// import Login from './Excersise 3/Login';
// import CreateNewAccount from './Excersise 3/CreateNewAccount';
// import ResetPassword from './Excersise 3/ResetPassword';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
//           <Stack.Screen name="ResetPassword" component={ResetPassword} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

//-----Code Lab1------
// App.js
import React from 'react';
import { Button, ScrollView, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các project
import Project1 from './Lab1/Project1';
import Project2 from './Lab1/Project2';
import Project3 from './Lab1/Project3';
import Project4 from './Lab1/Project4';
import Project5 from './Lab1/Project5';
import Project6 from './Lab1/Project6';
import Project7 from './Lab1/Project7';
import Project8 from './Lab1/Project8';

const Stack = createNativeStackNavigator();

// Menu chính
function MenuScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.menuContainer}>
      <Button title="Project 1 - Hello World" onPress={() => navigation.navigate('Project1')} />
      <Button title="Project 2 - Capturing Tap" onPress={() => navigation.navigate('Project2')} />
      <Button title="Project 3 - Custom Component" onPress={() => navigation.navigate('Project3')} />
      <Button title="Project 4 - State & Props" onPress={() => navigation.navigate('Project4')} />
      <Button title="Project 5 - Styling" onPress={() => navigation.navigate('Project5')} />
      <Button title="Project 6 - ScrollView" onPress={() => navigation.navigate('Project6')} />
      <Button title="Project 7 - Form Input" onPress={() => navigation.navigate('Project7')} />
      <Button title="Project 8 - SectionList" onPress={() => navigation.navigate('Project8')} />
    </ScrollView>
  );
}

// App chính
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Project1" component={Project1} />
        <Stack.Screen name="Project2" component={Project2} />
        <Stack.Screen name="Project3" component={Project3} />
        <Stack.Screen name="Project4" component={Project4} />
        <Stack.Screen name="Project5" component={Project5} />
        <Stack.Screen name="Project6" component={Project6} />
        <Stack.Screen name="Project7" component={Project7} />
        <Stack.Screen name="Project8" component={Project8} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    padding: 20,
    gap: 10,
  },
});
