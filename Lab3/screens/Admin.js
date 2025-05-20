// lab3/screens/Admin.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Admin({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Trang Admin</Text>
      <Button title="Quản lý dịch vụ" onPress={() => navigation.navigate('Services')} />
    </View>
  );
}
