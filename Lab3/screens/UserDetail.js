import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function UserDetail({ route, navigation })
{
    const { user } = route.params;
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');
    const [role, setRole] = useState(user.role || 'customer');
    const [editing, setEditing] = useState(false);

    const handleUpdate = async () =>
    {
        if (!name || !email || !phone || !address || !role)
        {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try
        {
            await updateDoc(doc(db, 'users', user.id), {
                name, email, phone, address, role
            });
            Alert.alert('Thành công', 'Đã cập nhật thông tin người dùng!');
            setEditing(false);
            navigation.goBack();
        } catch (err)
        {
            Alert.alert('Lỗi', err.message);
        }
    };

    const handleDelete = async () =>
    {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa người dùng này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa', style: 'destructive', onPress: async () =>
                {
                    try
                    {
                        await deleteDoc(doc(db, 'users', user.id));
                        Alert.alert('Đã xóa người dùng!');
                        navigation.goBack();
                    } catch (err)
                    {
                        Alert.alert('Lỗi', err.message);
                    }
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin người dùng</Text>
            {editing ? (
                <>
                    <TextInput style={styles.input} placeholder="Họ và tên" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    <TextInput style={styles.input} placeholder="Địa chỉ" value={address} onChangeText={setAddress} />
                    <TextInput style={styles.input} placeholder="Role (admin/customer)" value={role} onChangeText={setRole} />
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#aaa' }]} onPress={() => setEditing(false)}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.label}>Họ và tên: <Text style={styles.value}>{name}</Text></Text>
                    <Text style={styles.label}>Email: <Text style={styles.value}>{email}</Text></Text>
                    <Text style={styles.label}>Số điện thoại: <Text style={styles.value}>{phone}</Text></Text>
                    <Text style={styles.label}>Địa chỉ: <Text style={styles.value}>{address}</Text></Text>
                    <Text style={styles.label}>Role: <Text style={styles.value}>{role}</Text></Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => setEditing(true)}>
                            <Text style={styles.buttonText}>Cập nhật</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#e74c3c' }]} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e91e63',
        marginBottom: 18,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
        fontSize: 16,
    },
    value: {
        color: '#222',
        fontSize: 16,
        fontWeight: 'normal',
    },
    input: {
        width: '100%',
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#e91e63',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 14,
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },
}); 