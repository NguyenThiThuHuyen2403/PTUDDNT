// lab3/screens/ServiceDetail.js
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';

export default function ServiceDetail({ route, navigation })
{
  const { service } = route.params;
  const { user } = useUser();

  const formatDate = (timestamp) =>
  {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('vi-VN');
  };

  const handleDelete = async () =>
  {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa dịch vụ này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa', style: 'destructive', onPress: async () =>
        {
          try
          {
            await deleteDoc(doc(db, 'services', service.id));
            Alert.alert('Đã xóa dịch vụ!');
            navigation.goBack();
          } catch (err)
          {
            Alert.alert('Lỗi', err.message);
          }
        }
      }
    ]);
  };

  const handleEdit = () =>
  {
    navigation.navigate('EditService', { service });
  };

  useLayoutEffect(() =>
  {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {user?.role === 'admin' && (
            <>
              <TouchableOpacity onPress={handleEdit} style={{ padding: 8 }}>
                <MaterialIcons name="edit" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={{ padding: 8 }}>
                <MaterialIcons name="more-vert" size={26} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      ),
      headerStyle: { backgroundColor: '#e91e63' },
      headerTintColor: '#fff',
      headerTitle: 'Service detail',
    });
  }, [navigation, service, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}><Text style={styles.bold}>Service name:</Text> {service.ten}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Price:</Text> {Number(service.gia).toLocaleString()} đ</Text>
      <Text style={styles.label}><Text style={styles.bold}>Creator:</Text> {service.nguoiTao}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Time:</Text> {formatDate(service.thoiGianTao)}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Final update:</Text> {formatDate(service.capNhatLanCuoi)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  label: { fontSize: 16, marginBottom: 10 },
  bold: { fontWeight: 'bold' },
});
