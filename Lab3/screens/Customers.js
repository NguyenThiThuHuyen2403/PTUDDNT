import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Customers({ navigation })
{
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const loadCustomers = async () =>
    {
        try
        {
            // Chỉ lấy users có role là customer
            const q = query(collection(db, 'users'), where('role', '==', 'customer'));
            const snapshot = await getDocs(q);
            const customersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCustomers(customersData);
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        } finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        loadCustomers();
    }, []);

    const handleUpdateCustomer = async (customerId, updatedData) =>
    {
        try
        {
            await updateDoc(doc(db, 'users', customerId), updatedData);
            loadCustomers();
            Alert.alert('Thành công', 'Thông tin khách hàng đã được cập nhật');
        } catch (error)
        {
            Alert.alert('Lỗi', error.message);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
    );

    const renderCustomer = ({ item }) => (
        <View style={styles.customerCard}>
            <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{item.name}</Text>
                <Text style={styles.customerDetail}>SĐT: {item.phone}</Text>
                <Text style={styles.customerDetail}>Email: {item.email}</Text>
                <Text style={styles.customerDetail}>Địa chỉ: {item.address}</Text>
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditCustomer', { customer: item })}
            >
                <MaterialIcons name="edit" size={24} color="#e91e63" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredCustomers}
                renderItem={renderCustomer}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={loadCustomers}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    searchIcon: {
        marginRight: 8
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16
    },
    list: {
        padding: 16
    },
    customerCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    customerInfo: {
        flex: 1
    },
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8
    },
    customerDetail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4
    },
    editButton: {
        padding: 8
    }
}); 