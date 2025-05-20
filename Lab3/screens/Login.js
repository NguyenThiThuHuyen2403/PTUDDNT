// lab3/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';

export default function Login({ navigation })
{
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  const handleLogin = async () =>
  {
    try
    {
      const q = query(collection(db, 'users'), where('phone', '==', phone));
      const snapshot = await getDocs(q);

      if (snapshot.empty)
      {
        Alert.alert('Lỗi', 'Tài khoản không tồn tại');
        return;
      }

      const userData = snapshot.docs[0].data();
      if (userData.password !== password)
      {
        Alert.alert('Lỗi', 'Sai mật khẩu');
        return;
      }

      // Lưu user vào context (bao gồm role)
      setUser({
        ...userData,
        id: snapshot.docs[0].id,
        role: userData.role || 'user',
      });

      Alert.alert('Đăng nhập thành công');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Customer' }],
      });

    } catch (err)
    {
      Alert.alert('Lỗi đăng nhập', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 40, color: '#e91e63' },
  input: {
    backgroundColor: '#f6f6f6',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { color: '#e91e63', textAlign: 'center' },
});
