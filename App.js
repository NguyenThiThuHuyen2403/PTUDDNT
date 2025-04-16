import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <ImageBackground
      source={require('./assets/lacay.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', '#d1ae00']}
        style={styles.gradient}
      />

      <View style={styles.centerBox}>
        <Image
          source={require('./assets/pokemon.jpg')} // ảnh logo Pokémon
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.formBox}>
          <TextInput
            style={styles.input}
            placeholder="USERNAME"
            placeholderTextColor="#333"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#333"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 30,
  },
  formBox: {
    width: '100%',
    backgroundColor: '#d1ae00cc',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 45,
    backgroundColor: '#f2d34f',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  loginBtn: {
    height: 45,
    backgroundColor: '#b25d5d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
