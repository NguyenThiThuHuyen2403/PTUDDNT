// screens/Contacts.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactListItem from '../components/ContactListItem';
import { fetchContacts } from '../utility/api';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../redux/store';

const Contacts = ({ navigation }) => {
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then((data) => dispatch(fetchContactsSuccess(data)))
      .catch(() => dispatch(fetchContactsError()));
  }, [dispatch]);

  const contactsSorted = contacts?.slice()?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  const renderContact = ({ item }) => (
    <ContactListItem
      name={item.name}
      avatar={item.avatar}
      onPress={() => navigation.navigate('Profile', { contact: item })}
    />
  );

  if (loading) return <ActivityIndicator color="blue" size="large" />;
  if (error) return <Text>Error loading contacts...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={contactsSorted}
        renderItem={renderContact}
        keyExtractor={(item) => item.phone.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Contacts;
