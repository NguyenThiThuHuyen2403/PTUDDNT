// lab3/screens/ServiceDetail.js
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Modal, Pressable, TextInput, Platform, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { doc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';
import { Picker } from '@react-native-picker/picker';

export default function ServiceDetail({ route, navigation })
{
  const { service } = route.params;
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [hour, setHour] = useState('08');
  const [minute, setMinute] = useState('00');

  const formatDate = (timestamp) =>
  {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('vi-VN');
  };

  const handleDelete = async () =>
  {
    setModalVisible(true);
  };

  const confirmDelete = async () =>
  {
    setModalVisible(false);
    try
    {
      await deleteDoc(doc(db, 'services', service.id));
      Alert.alert('Đã xóa dịch vụ!');
      navigation.goBack();
    } catch (err)
    {
      Alert.alert('Lỗi', err.message);
    }
  };

  const handleEdit = () =>
  {
    navigation.navigate('EditService', { service });
  };

  // Tạo mảng ngày (7 ngày tới)
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) =>
  {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  useLayoutEffect(() =>
  {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete} style={{ padding: 8 }}>
          <MaterialIcons name="more-vert" size={26} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: '#e91e63' },
      headerTintColor: '#fff',
      headerTitle: 'Service detail',
    });
  }, [navigation, service, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}><Text style={styles.bold}>Tên dịch vụ:</Text> {service.ten}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Giá:</Text> {Number(service.gia).toLocaleString()} đ</Text>
      <Text style={styles.label}><Text style={styles.bold}>Người tạo:</Text> {service.nguoiTao}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Thời gian tạo:</Text> {formatDate(service.thoiGianTao)}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Cập nhật lần cuối:</Text> {formatDate(service.capNhatLanCuoi)}</Text>

      {/* Nút đặt lịch hẹn cho user */}
      {user?.role !== 'admin' && (
        <TouchableOpacity
          style={{ backgroundColor: '#e91e63', padding: 14, borderRadius: 8, marginTop: 24, alignItems: 'center' }}
          onPress={() => setBookingModal(true)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Đặt lịch hẹn</Text>
        </TouchableOpacity>
      )}

      {/* Modal xác nhận xóa */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Warning</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to remove this service? This operation cannot be returned
            </Text>
            <View style={styles.modalButtonRow}>
              <Pressable style={styles.deleteBtn} onPress={confirmDelete}>
                <Text style={styles.deleteText}>DELETE</Text>
              </Pressable>
              <Pressable style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal đặt lịch hẹn */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bookingModal}
        onRequestClose={() => setBookingModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Đặt lịch hẹn</Text>
            <Text style={styles.label}>Chọn ngày:</Text>
            <Picker selectedValue={selectedDate || days[0]} onValueChange={setSelectedDate} style={{ width: 200, marginBottom: 12 }}>
              {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
            </Picker>
            <Text style={styles.label}>Chọn giờ:</Text>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Picker selectedValue={hour} style={{ width: 100 }} onValueChange={setHour}>
                {[...Array(24).keys()].map(h => (
                  <Picker.Item key={h} label={h.toString().padStart(2, '0')} value={h.toString().padStart(2, '0')} />
                ))}
              </Picker>
              <Text style={{ alignSelf: 'center' }}>:</Text>
              <Picker selectedValue={minute} style={{ width: 100 }} onValueChange={setMinute}>
                {[...Array(60).keys()].map(m => (
                  <Picker.Item key={m} label={m.toString().padStart(2, '0')} value={m.toString().padStart(2, '0')} />
                ))}
              </Picker>
            </View>
            <View style={styles.modalButtonRow}>
              <Pressable
                style={[styles.deleteBtn, { backgroundColor: '#e91e63', marginRight: 8 }]}
                onPress={async () =>
                {
                  const dateToSave = selectedDate || days[0];
                  if (!dateToSave || !hour || !minute)
                  {
                    Alert.alert('Vui lòng chọn ngày và giờ!');
                    return;
                  }
                  try
                  {
                    await addDoc(collection(db, 'appointments'), {
                      userId: user.id,
                      serviceId: service.id,
                      date: dateToSave,
                      time: `${hour}:${minute}`,
                      status: 'pending',
                    });
                    setBookingModal(false);
                    setSelectedDate('');
                    setHour('08');
                    setMinute('00');
                    Alert.alert('Thành công', 'Đã đặt lịch hẹn!');
                  } catch (err)
                  {
                    Alert.alert('Lỗi', err.message);
                  }
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Xác nhận</Text>
              </Pressable>
              <Pressable style={styles.cancelBtn} onPress={() => setBookingModal(false)}>
                <Text style={styles.cancelText}>Hủy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  label: { fontSize: 16, marginBottom: 10 },
  bold: { fontWeight: 'bold' },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b71c1c',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  deleteBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 4,
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  deleteText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  cancelText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
