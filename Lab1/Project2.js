import React from 'react';
import {View, Button, Text, Alert, StyleSheet, TouchableOpacity,} from 'react-native';

const App = () => {
    return (
      <View style={MyStyle.container}>
        <Button title="Button 1" onPress={() => Alert.alert('Hello 1')} />
        <TouchableOpacity
          style={MyStyle.button}
          onPress={() => Alert.alert('Hello 2')}>
          <Text style={MyStyle.text}>Button 2</Text>
        </TouchableOpacity>
      </View>
    );
  };

const MyStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
