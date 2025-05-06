// screens/Options.js
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import DetailListItem from '../components/DetailListItem';

const Options = ({ navigation }) => (
  <View style={styles.container}>
    <DetailListItem
      title="Update Profile"
      onPress={() => navigation.navigate('UpdateProfile')}
    />
    <DetailListItem
      title="Change Language"
      onPress={() => Alert.alert('Change Language clicked')}
    />
    <DetailListItem
      title="Sign Out"
      onPress={() => Alert.alert('Signed out')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Options;
