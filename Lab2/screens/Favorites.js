// screens/Favorites.js
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactThumbnail from '../components/ContactThumbnail';
import { fetchContacts } from '../utility/api';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../redux/store';

const Favorites = ({ navigation }) => {
  const { contacts, loading, error } = useSelector((state) => state.contacts); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then((data) => dispatch(fetchContactsSuccess(data)))
      .catch(() => dispatch(fetchContactsError()));
  }, [dispatch]);

  const favorites = contacts?.filter((contact) => contact.favorite) || [];

  const renderFavoriteThumbnail = ({ item }) => (
    <ContactThumbnail
      avatar={item.avatar}
      onPress={() => navigation.navigate('Profile', { contact: item })}
    />
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && (
        <View style={styles.errorContainer}>
          <Text>Error loading contacts...</Text>
          <Button
            title="Retry"
            onPress={() => {
              dispatch(fetchContactsLoading());
              fetchContacts()
                .then((data) => dispatch(fetchContactsSuccess(data)))
                .catch(() => dispatch(fetchContactsError()));
            }}
          />
        </View>
      )}
      {!loading && !error && favorites.length === 0 && <Text>No favorite contacts</Text>}
      {!loading && !error && favorites.length > 0 && (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.phone.toString()}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favorites;
