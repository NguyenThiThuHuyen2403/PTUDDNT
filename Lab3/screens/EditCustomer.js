import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function EditCustomer({ route, navigation })
{
    const { customer } = route.params;
    const [name, setName] = useState(customer.name);
    const [email, setEmail] = useState(customer.email);
    const [phone, setPhone] = useState(customer.phone);
    const [address, setAddress] = useState(customer.address);

    const handleUpdate = async () =>
    {
        if (!name || !email || !phone || !address)
        {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try
        {
            await updateDoc(doc(db, 'users', customer.id), {
                name,
                email,
                phone,
                address
            });

            Alert.alert('Thành công', 'Thông tin khách hàng đã được cập nhật');
            navigation.goBack();
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Chỉnh sửa thông tin khách hàng</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e91e63',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#f6f6f6',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    button: {
        backgroundColor: '#e91e63',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
}); 