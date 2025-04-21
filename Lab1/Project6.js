import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Square = ({ text, bgColor = '#7ce0f9' }) => (
  <View style={[styles.box, { backgroundColor: bgColor }]}>
    <Text>{text}</Text>
  </View>
);

const data = Array.from({ length: 20 }, (_, i) => i + 1);

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {data.map((item) => (
        <Square key={item} text={`Square ${item}`} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default App;
