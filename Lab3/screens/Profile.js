import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, ScrollView } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';

export default function Profile({ navigation })
{
    const { user, setUser } = useUser();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdateProfile = async () =>
    {
        if (!name || !email || !phone || !address)
        {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try
        {
            await updateDoc(doc(db, 'users', user.id), {
                name,
                email,
                phone,
                address
            });

            setUser({
                ...user,
                name,
                email,
                phone,
                address
            });

            setShowEditModal(false);
            Alert.alert('Thành công', 'Thông tin đã được cập nhật');
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        }
    };

    const handleChangePassword = async () =>
    {
        if (!currentPassword || !newPassword || !confirmPassword)
        {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (currentPassword !== user.password)
        {
            Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng');
            return;
        }

        if (newPassword !== confirmPassword)
        {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }

        try
        {
            await updateDoc(doc(db, 'users', user.id), {
                password: newPassword
            });

            setUser({
                ...user,
                password: newPassword
            });

            setShowPasswordModal(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        }
    };

    const handleLogout = () =>
    {
        setUser(null);
        navigation.replace('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <View style={styles.infoBox}>
                <Text style={styles.label}>Họ và tên:</Text>
                <Text style={styles.value}>{user?.name}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email}</Text>
                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>{user?.phone}</Text>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.value}>{user?.address}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setShowEditModal(true)}>
                <Text style={styles.buttonText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowPasswordModal(true)}>
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>

            {/* Modal cập nhật thông tin */}
            <Modal visible={showEditModal} animationType="slide" transparent onRequestClose={() => setShowEditModal(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Cập nhật thông tin</Text>
                        <TextInput style={styles.input} placeholder="Họ và tên" value={name} onChangeText={setName} />
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                        <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                        <TextInput style={styles.input} placeholder="Địa chỉ" value={address} onChangeText={setAddress} />
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={handleUpdateProfile}>
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#aaa' }]} onPress={() => setShowEditModal(false)}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal đổi mật khẩu */}
            <Modal visible={showPasswordModal} animationType="slide" transparent onRequestClose={() => setShowPasswordModal(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
                        <TextInput style={styles.input} placeholder="Mật khẩu hiện tại" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />
                        <TextInput style={styles.input} placeholder="Mật khẩu mới" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
                        <TextInput style={styles.input} placeholder="Xác nhận mật khẩu mới" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={handleChangePassword}>
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#aaa' }]} onPress={() => setShowPasswordModal(false)}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e91e63',
        marginBottom: 24,
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        padding: 18,
        marginBottom: 24,
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    value: {
        color: '#222',
        fontSize: 16,
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#e91e63',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 14,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
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
    modalButtonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },
}); 