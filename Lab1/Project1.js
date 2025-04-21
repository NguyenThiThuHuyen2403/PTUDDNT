import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Project1 = () => {
  return (
    <View style={myStyle.container}>
      <View style={myStyle.box}>
        <Text style={myStyle.text}>Hello</Text>
      </View>
    </View>
  );
};

export default Project1;

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
