//----Code Excersise 5----------------------------------------------------------------
import React from 'react';
import TodoList from './Excersise 5/TodoList';

export default function App() {
  return <TodoList />;
}

//----Code Lab2----------------------------------------------------------------
// import React from 'react';
// import { Provider } from 'react-redux';
// import DrawerNavigator from './Lab2/navigation/DrawerNavigator';  // Giả sử DrawerNavigator được định nghĩa trong `routes.js`
// import store from './Lab2/redux/store';  // Giả sử bạn đã cấu hình Redux store trong file `store.js`

// const App = () => {
//   return (
//     <Provider store={store}>
//       <DrawerNavigator />
//     </Provider>
//   );
// };

// export default App;



// //----Code Excersise 4----------------------------------------------------------------
// import React from 'react'
// import 'react-native-gesture-handler'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { Provider as PaperProvider } from 'react-native-paper'

// import Login from './Excersise 3/Login'
// import CreateNewAccount from './Excersise 3/CreateNewAccount'
// import ResetPassword from './Excersise 3/ResetPassword'
// import DrawerNavigator from './Excersise 4/DrawerNavigator'

// const Stack = createNativeStackNavigator()

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <PaperProvider>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
//             <Stack.Screen name="ResetPassword" component={ResetPassword} />
//             <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </PaperProvider>
//     </GestureHandlerRootView>
//   )
// }




//----Code Lap1.2----------------------------------------------------------------
// import React from 'react';
// import Calculator from './Lab1.2/Calculator';

// export default function App() {
//   return <Calculator />;
// }

//-----Code Lab1----------------------------------------------------------------
// import React from 'react';
// import { Button, ScrollView, View, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import Project1 from './Lab1/Project1';
// import Project2 from './Lab1/Project2';
// import Project3 from './Lab1/Project3';
// import Project4 from './Lab1/Project4';
// import Project5 from './Lab1/Project5';
// import Project6 from './Lab1/Project6';
// import Project7 from './Lab1/Project7';
// import Project8 from './Lab1/Project8';

// const Stack = createNativeStackNavigator();

// // Menu chính
// function MenuScreen({ navigation }) {
//   return (
//     <ScrollView contentContainerStyle={styles.menuContainer}>
//       <Button title="Project 1 - Hello World" onPress={() => navigation.navigate('Project1')} />
//       <Button title="Project 2 - Capturing Tap" onPress={() => navigation.navigate('Project2')} />
//       <Button title="Project 3 - Custom Component" onPress={() => navigation.navigate('Project3')} />
//       <Button title="Project 4 - State & Props" onPress={() => navigation.navigate('Project4')} />
//       <Button title="Project 5 - Styling" onPress={() => navigation.navigate('Project5')} />
//       <Button title="Project 6 - ScrollView" onPress={() => navigation.navigate('Project6')} />
//       <Button title="Project 7 - Form Input" onPress={() => navigation.navigate('Project7')} />
//       <Button title="Project 8 - SectionList" onPress={() => navigation.navigate('Project8')} />
//     </ScrollView>
//   );
// }

// // App chính
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Menu">
//         <Stack.Screen name="Menu" component={MenuScreen} />
//         <Stack.Screen name="Project1" component={Project1} />
//         <Stack.Screen name="Project2" component={Project2} />
//         <Stack.Screen name="Project3" component={Project3} />
//         <Stack.Screen name="Project4" component={Project4} />
//         <Stack.Screen name="Project5" component={Project5} />
//         <Stack.Screen name="Project6" component={Project6} />
//         <Stack.Screen name="Project7" component={Project7} />
//         <Stack.Screen name="Project8" component={Project8} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   menuContainer: {
//     padding: 20,
//     gap: 10,
//   },
// });

//----Code Exersise 3-----------------------------------------------------------
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

//-----Code Exersise 2----------------------------------------------------------------
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     alert(`Username: ${username}\nPassword: ${password}`);
//   };

//   return (
//     <ImageBackground
//       source={require('./assets/lacay.jpg')} 
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <LinearGradient
//         colors={['transparent', '#d1ae00']}
//         style={styles.gradient}
//       />

//       <View style={styles.centerBox}>
//         <Image
//           source={require('./assets/pokemon.jpg')} 
//           style={styles.logo}
//           resizeMode="contain"
//         />

//         <View style={styles.formBox}>
//           <TextInput
//             style={styles.input}
//             placeholder="USERNAME"
//             placeholderTextColor="#333"
//             value={username}
//             onChangeText={setUsername}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="PASSWORD"
//             placeholderTextColor="#333"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />

//           <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//             <Text style={styles.loginText}>LOGIN</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   gradient: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   centerBox: {
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   logo: {
//     width: 300,
//     height: 150,
//     marginBottom: 30,
//   },
//   formBox: {
//     width: '100%',
//     backgroundColor: '#d1ae00cc',
//     padding: 20,
//     borderRadius: 10,
//   },
//   input: {
//     height: 45,
//     backgroundColor: '#f2d34f',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     color: '#000',
//   },
//   loginBtn: {
//     height: 45,
//     backgroundColor: '#b25d5d',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   loginText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

