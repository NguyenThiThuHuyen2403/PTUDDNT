// CatComponent.js
import React from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';

const CatComponent = ({ catName, toggleName }) => {
  return (
    <View>
      <Text style={styles.catText}>Meow! I am {catName}</Text>
      <Button title="Đổi tên mèo" onPress={toggleName} />
    </View>
  );
};

const styles = StyleSheet.create({
  catText: {
    fontSize: 24,
    color: 'purple',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CatComponent;
