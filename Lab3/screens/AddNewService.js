// lab3/screens/AddNewService.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';

export default function AddNewService({ navigation })
{
  const [tenDichVu, setTenDichVu] = useState('');
  const [gia, setGia] = useState('0');
  const { user } = useUser();

  const handleAdd = async () =>
  {
    if (!tenDichVu || !gia)
    {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try
    {
      await addDoc(collection(db, 'services'), {
        ten: tenDichVu,
        gia: Number(gia),
        nguoiTao: user?.name || 'Unknown',
        thoiGianTao: serverTimestamp(),
        capNhatLanCuoi: serverTimestamp(),
      });
      Alert.alert('Thành công', 'Đã thêm dịch vụ mới!');
      navigation.goBack();
    } catch (err)
    {
      Alert.alert('Lỗi', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Service</Text>
      </View>
      <Text style={styles.label}>Service name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Input a service name"
        value={tenDichVu}
        onChangeText={setTenDichVu}
      />
      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        value={gia}
        onChangeText={setGia}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerBar: {
    backgroundColor: '#e91e63',
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f6f6f6',
    fontSize: 16,
    color: '#222',
  },
  button: {
    backgroundColor: '#e91e63',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
