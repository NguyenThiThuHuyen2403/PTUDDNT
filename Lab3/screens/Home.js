import React, { useState, useCallback } from 'react';
import
{
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
    TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { taoDuLieuMau } from '../utils/InitServices';
import { useUser } from './UserContext';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) =>
{
    const [dichVu, setDichVu] = useState([]);
    const [dangTai, setDangTai] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useUser();

    const layDichVu = async () =>
    {
        setDangTai(true);
        try
        {
            const querySnapshot = await getDocs(collection(db, 'services'));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDichVu(data);
        } catch (error)
        {
            console.error('Lỗi khi lấy dịch vụ:', error);
        } finally
        {
            setDangTai(false);
        }
    };

    // Luôn reload khi Home được focus
    useFocusEffect(
        useCallback(() =>
        {
            taoDuLieuMau().then(() =>
            {
                layDichVu();
            });
        }, [])
    );

    // Lọc dịch vụ theo tên
    const filteredDichVu = dichVu.filter(item =>
        item.ten.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
            .includes(search.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, ''))
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
            activeOpacity={0.7}
        >
            <Text style={styles.ten} numberOfLines={2}>{item.ten}</Text>
            <Text style={styles.gia}>{Number(item.gia).toLocaleString()} đ</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
            {/* Header */}
            <View style={styles.headerBar}>
                <Text style={styles.headerTitle}>{user?.name || 'Chào mừng!'}</Text>
                <TouchableOpacity style={styles.headerIcon}>
                    <MaterialIcons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('./logolab3.png')} style={styles.logo} resizeMode="contain" />
            </View>
            {/* Ô tìm kiếm */}
            <View style={styles.searchBox}>
                <MaterialIcons name="search" size={22} color="#e91e63" style={{ marginRight: 6 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm dịch vụ..."
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor="#aaa"
                />
            </View>
            {/* Tiêu đề + nút cộng */}
            <View style={styles.titleRow}>
                <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
                {user?.role === 'admin' && (
                    <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddNewService')}>
                        <MaterialIcons name="add-circle" size={28} color="#e91e63" />
                    </TouchableOpacity>
                )}
            </View>
            {/* Danh sách dịch vụ */}
            <View style={styles.listContainer}>
                {dangTai ? (
                    <ActivityIndicator size="large" color="#e91e63" />
                ) : (
                    <FlatList
                        data={filteredDichVu}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e91e63',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    headerIcon: {
        padding: 4,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    logo: {
        width: 160,
        height: 60,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#222',
        paddingVertical: 8,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 8,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },
    addBtn: {
        marginLeft: 8,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 12,
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    ten: {
        fontSize: 15,
        flex: 1,
        flexWrap: 'wrap',
        color: '#222',
    },
    gia: {
        fontWeight: '600',
        marginLeft: 10,
        color: '#e91e63',
        fontSize: 15,
    },
}); 