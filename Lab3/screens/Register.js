// lab3/screens/Register.js
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';

export default function Register({ navigation })
{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useUser();

  const handleRegister = async () =>
  {
    if (!name || !email || !phone || !address || !password || !confirmPassword)
    {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword)
    {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    // Phân quyền: nếu email là admin@admin.com thì role là admin, ngược lại là user
    const role = email.trim().toLowerCase() === 'admin@admin.com' ? 'admin' : 'user';
    try
    {
      const docRef = await addDoc(collection(db, 'users'), {
        name,
        email,
        phone,
        address,
        password,
        role,
        createdAt: new Date(),
      });
      setUser({
        name,
        email,
        phone,
        address,
        password,
        id: docRef.id,
        role,
      });
      Alert.alert('Thành công', 'Tài khoản đã được đăng ký');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Customer' }],
      });
    } catch (error)
    {
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      <View style={styles.container}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 16 }}>
          <Text style={{ color: '#e91e63', textAlign: 'center' }}>
            Đã có tài khoản? Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: {
    padding: 24,
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#e91e63',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    marginBottom: 24,
    textAlign: 'center',
    color: '#e91e63',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e91e63',
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#222',
  },
  button: {
    backgroundColor: '#e91e63',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
