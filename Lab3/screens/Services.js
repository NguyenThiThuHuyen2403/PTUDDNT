// lab3/screens/Services.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const sampleData = [
  { id: '1', name: 'Dịch vụ 1' },
  { id: '2', name: 'Dịch vụ 2' },
];

export default function Services({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Thêm dịch vụ" onPress={() => navigation.navigate('AddNewService')} />
      <FlatList
        data={sampleData}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.name}</Text>
            <Button title="Chi tiết" onPress={() => navigation.navigate('ServiceDetail', { id: item.id })} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
 