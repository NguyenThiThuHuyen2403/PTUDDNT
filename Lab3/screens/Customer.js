import React, { useEffect, useState, useCallback } from 'react';
import
{
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUser } from './UserContext';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const Customer = ({ navigation }) =>
{
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    if (user?.role === 'admin')
    {
      const fetchUsers = async () =>
      {
        try
        {
          const querySnapshot = await getDocs(collection(db, 'users'));
          const usersData = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(u => u.id !== user.id);
          setUsers(usersData);
        } catch (err)
        {
          Alert.alert('Lỗi', err.message);
        } finally
        {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [user]);

  useFocusEffect(
    useCallback(() =>
    {
      if (user?.role === 'admin')
      {
        const fetchUsers = async () =>
        {
          try
          {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersData = querySnapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(u => u.id !== user.id);
            setUsers(usersData);
          } catch (err)
          {
            Alert.alert('Lỗi', err.message);
          } finally
          {
            setLoading(false);
          }
        };
        fetchUsers();
      }
    }, [user])
  );

  if (user?.role === 'admin')
  {
    // Hiển thị danh sách người dùng cho admin
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.userCard} onPress={() => navigation.navigate('UserDetail', { user: item })}>
        <Image source={{ uri: item.avatar || 'https://i.pravatar.cc/150?img=3' }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.role}>Role: {item.role}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={28} color="#e91e63" />
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách người dùng</Text>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshing={loading}
          onRefresh={async () =>
          {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersData = querySnapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(u => u.id !== user.id);
            setUsers(usersData);
            setLoading(false);
          }}
        />
      </View>
    );
  }

  // Nếu là user thì giữ nguyên hiển thị thông tin cá nhân
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
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  role: {
    fontSize: 13,
    color: '#e91e63',
    fontWeight: 'bold',
  },
});
