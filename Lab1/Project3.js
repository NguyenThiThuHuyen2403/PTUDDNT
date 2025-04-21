import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          backgroundColor: "#ff637c",
          alignSelf: "center",
          padding: 10,
          margin: 10,
        },
        props.buttonStyle,
      ]}
    >
      <Text style={{ color: "#fff" }}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CustomButton text="Say hello" onPress={() => alert("hello!")} />
      <CustomButton
        text="Say goodbye"
        onPress={() => alert("goodbye!")}
        buttonStyle={{ backgroundColor: "#4dc2c2" }}
      />
    </View>
  );
};

export default App;
