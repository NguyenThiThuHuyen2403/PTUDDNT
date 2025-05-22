import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ForgotPassword({ navigation })
{
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () =>
    {
        if (!phone || !newPassword || !confirmPassword)
        {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (newPassword !== confirmPassword)
        {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }

        try
        {
            const q = query(collection(db, 'users'), where('phone', '==', phone));
            const snapshot = await getDocs(q);

            if (snapshot.empty)
            {
                Alert.alert('Lỗi', 'Không tìm thấy tài khoản với số điện thoại này');
                return;
            }

            const userDoc = snapshot.docs[0];
            await updateDoc(doc(db, 'users', userDoc.id), {
                password: newPassword
            });

            Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
            navigation.navigate('Login');
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quên mật khẩu</Text>

            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 40,
        color: '#e91e63'
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
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    linkText: {
        color: '#e91e63',
        textAlign: 'center'
    }
}); 