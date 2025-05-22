// lab3/screens/Login.js
import React, { useState } from 'react';
import
{
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
    StatusBar,
    Image,
} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUser } from './UserContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }) =>
{
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();

    const handleLogin = async () =>
    {
        if (!phone || !password)
        {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try
        {
            const q = query(collection(db, 'users'), where('phone', '==', phone));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty)
            {
                Alert.alert('Lỗi', 'Số điện thoại không tồn tại');
                return;
            }

            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            if (userData.password !== password)
            {
                Alert.alert('Lỗi', 'Mật khẩu không đúng');
                return;
            }

            // Lưu user vào context (bao gồm role)
            const userWithRole = {
                id: userDoc.id,
                ...userData,
                role: userData.role || 'customer', // Mặc định là customer nếu không có role
            };

            console.log('User data before set:', userWithRole); // Debug log
            setUser(userWithRole);
            console.log('User set in context'); // Debug log

            if (userWithRole.role === 'admin')
            {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AdminTab' }],
                });
            } else
            {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Customer' }],
                });
            }

            Alert.alert('Thành công', 'Đăng nhập thành công');
        } catch (error)
        {
            console.error('Login error:', error); // Debug log
            Alert.alert('Lỗi', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('./logolab3.png')} style={styles.logo} resizeMode="contain" />
                </View>

                {/* Form đăng nhập */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Đăng nhập</Text>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="phone" size={24} color="#e91e63" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Số điện thoại"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#e91e63" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLink}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 80,
    },
    formContainer: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e91e63',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#222',
        paddingVertical: 12,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#e91e63',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#e91e63',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#e91e63',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
