import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function Appointments({ navigation })
{
    const { user } = useUser();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editDate, setEditDate] = useState('');
    const [editHour, setEditHour] = useState('08');
    const [editMinute, setEditMinute] = useState('00');

    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) =>
    {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return d.toISOString().split('T')[0];
    });

    const loadAppointments = async () =>
    {
        try
        {
            let q;
            if (user.role === 'admin')
            {
                // Admin xem tất cả lịch hẹn
                q = query(collection(db, 'appointments'));
            } else
            {
                // Customer chỉ xem lịch hẹn của mình
                q = query(collection(db, 'appointments'), where('userId', '==', user.id));
            }

            const snapshot = await getDocs(q);
            const appointmentsData = await Promise.all(
                snapshot.docs.map(async (appointmentDoc) =>
                {
                    const data = appointmentDoc.data();
                    // Lấy thông tin dịch vụ
                    const serviceDocSnap = await getDoc(doc(db, 'services', data.serviceId));
                    const serviceData = serviceDocSnap.data ? serviceDocSnap.data() : {};
                    // Lấy thông tin khách hàng
                    const userDocSnap = await getDoc(doc(db, 'users', data.userId));
                    const userData = userDocSnap.data ? userDocSnap.data() : {};

                    return {
                        id: appointmentDoc.id,
                        ...data,
                        service: serviceData,
                        user: userData
                    };
                })
            );
            setAppointments(appointmentsData);
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        } finally
        {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() =>
        {
            loadAppointments();
        }, [])
    );

    const handleAccept = async (appointmentId) =>
    {
        try
        {
            await updateDoc(doc(db, 'appointments', appointmentId), {
                status: 'accepted'
            });
            loadAppointments();
            Alert.alert('Thành công', 'Đã chấp nhận lịch hẹn');
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        }
    };

    const handleDelete = async (appointmentId) =>
    {
        try
        {
            await deleteDoc(doc(db, 'appointments', appointmentId));
            loadAppointments();
            Alert.alert('Thành công', 'Đã xóa lịch hẹn');
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        }
    };

    const renderAppointment = ({ item }) => (
        <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
                <Text style={styles.serviceName}>{item.service.ten}</Text>
                <Text style={[
                    styles.status,
                    {
                        color: item.status === 'pending' ? '#f39c12' :
                            item.status === 'accepted' ? '#27ae60' : '#e74c3c'
                    }
                ]}>
                    {item.status === 'pending' ? 'Chờ xác nhận' :
                        item.status === 'accepted' ? 'Đã xác nhận' : 'Đã hủy'}
                </Text>
            </View>

            <Text style={styles.info}>Ngày: {item.date}</Text>
            <Text style={styles.info}>Giờ: {item.time}</Text>
            <Text style={styles.info}>Giá: {item.service.gia.toLocaleString()} đ</Text>
            <Text style={styles.info}>Khách hàng: {item.user.name}</Text>
            <Text style={styles.info}>SĐT: {item.user.phone}</Text>

            <View style={styles.actions}>
                {/* Admin có thể xác nhận, cập nhật, xóa mọi lịch hẹn */}
                {user.role === 'admin' && (
                    <>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => handleAccept(item.id)}
                        >
                            <Text style={styles.buttonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton, { marginLeft: 8 }]}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.buttonText}>Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#1976d2', marginLeft: 8 }]}
                            onPress={() =>
                            {
                                setEditId(item.id);
                                setEditDate(item.date);
                                const [h, m] = item.time.split(':');
                                setEditHour(h);
                                setEditMinute(m);
                                setEditModal(true);
                            }}
                        >
                            <Text style={styles.buttonText}>Cập nhật</Text>
                        </TouchableOpacity>
                    </>
                )}
                {/* Nếu là user, chỉ hiện nút hủy và cập nhật cho pending */}
                {user.role === 'customer' && item.status === 'pending' && (
                    <>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#1976d2', marginLeft: 8 }]}
                            onPress={() =>
                            {
                                setEditId(item.id);
                                setEditDate(item.date);
                                const [h, m] = item.time.split(':');
                                setEditHour(h);
                                setEditMinute(m);
                                setEditModal(true);
                            }}
                        >
                            <Text style={styles.buttonText}>Cập nhật</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={appointments}
                renderItem={renderAppointment}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={loadAppointments}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={editModal}
                onRequestClose={() => setEditModal(false)}
            >
                <View style={styles.modalBackground || { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0005' }}>
                    <View style={styles.modalContainer || { backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                        <Text style={styles.modalTitle || { fontSize: 20, fontWeight: 'bold', color: '#b71c1c', marginBottom: 12 }}>Cập nhật lịch hẹn</Text>
                        <Text style={styles.label}>Chọn ngày:</Text>
                        <Picker selectedValue={editDate || days[0]} onValueChange={setEditDate} style={{ width: 200, marginBottom: 12 }}>
                            {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
                        </Picker>
                        <Text style={styles.label}>Chọn giờ:</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Picker selectedValue={editHour} style={{ width: 100 }} onValueChange={setEditHour}>
                                {[...Array(24).keys()].map(h => (
                                    <Picker.Item key={h} label={h.toString().padStart(2, '0')} value={h.toString().padStart(2, '0')} />
                                ))}
                            </Picker>
                            <Text style={{ alignSelf: 'center' }}>:</Text>
                            <Picker selectedValue={editMinute} style={{ width: 100 }} onValueChange={setEditMinute}>
                                {[...Array(60).keys()].map(m => (
                                    <Picker.Item key={m} label={m.toString().padStart(2, '0')} value={m.toString().padStart(2, '0')} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.modalButtonRow || { flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                            <Pressable
                                style={[styles.deleteBtn || { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 4, backgroundColor: '#1976d2', marginRight: 8 }, { backgroundColor: '#1976d2' }]}
                                onPress={async () =>
                                {
                                    if (!editDate || !editHour || !editMinute)
                                    {
                                        Alert.alert('Vui lòng chọn ngày và giờ!');
                                        return;
                                    }
                                    try
                                    {
                                        await updateDoc(doc(db, 'appointments', editId), {
                                            date: editDate,
                                            time: `${editHour}:${editMinute}`
                                        });
                                        setEditModal(false);
                                        setEditId(null);
                                        setEditDate('');
                                        setEditHour('08');
                                        setEditMinute('00');
                                        loadAppointments();
                                        Alert.alert('Thành công', 'Đã cập nhật lịch hẹn!');
                                    } catch (err)
                                    {
                                        Alert.alert('Lỗi', err.message);
                                    }
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Xác nhận</Text>
                            </Pressable>
                            <Pressable style={styles.cancelBtn || { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 4, backgroundColor: 'transparent' }} onPress={() => setEditModal(false)}>
                                <Text style={styles.cancelText || { color: '#1976d2', fontWeight: 'bold', fontSize: 16 }}>Hủy</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    list: {
        padding: 16
    },
    appointmentCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    status: {
        fontSize: 14,
        fontWeight: '500'
    },
    info: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        gap: 8
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6
    },
    acceptButton: {
        backgroundColor: '#27ae60'
    },
    deleteButton: {
        backgroundColor: '#e74c3c'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#b71c1c',
        marginBottom: 12
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    deleteBtn: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 4,
        backgroundColor: '#1976d2',
        marginRight: 8
    },
    cancelBtn: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 4,
        backgroundColor: 'transparent'
    },
    cancelText: {
        color: '#1976d2',
        fontWeight: 'bold',
        fontSize: 16
    }
}); 