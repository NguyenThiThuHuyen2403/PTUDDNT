import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter = ({ initial }) => {
  const [count, setCount] = useState(initial);

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text>You’ve pressed the button: {count} time(s)</Text>
      <Button
        title={`Pressed me`}
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <Counter initial={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  counterContainer: { alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 10 },
});

export default App;
