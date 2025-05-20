import React from 'react';
import
{
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUser } from './UserContext';

const Customer = ({ navigation }) =>
{
  const { user } = useUser();
  const handleLogout = () =>
  {
    // TODO: Thêm logic đăng xuất thực tế ở đây
    // Ví dụ: xóa token, gọi firebase.auth().signOut(), ...
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>{user?.name || 'THÔNG TIN CÁ NHÂN'}</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <MaterialIcons name="person" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Avatar + Info */}
      <View style={styles.infoContainer}>
        <Image source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?img=3' }} style={styles.avatar} />
        <Text style={styles.name}>{user?.name || 'Chưa đăng nhập'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>
      {/* Logout button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <MaterialIcons name="logout" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Customer;

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
  infoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e91e63',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#e91e63',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
