import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';

export default function Calculator() {
  const [theme, setTheme] = useState('light');
  const [resultText, setResultText] = useState('');
  const [historyText, setHistoryText] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handlePress = (text) => {
    if (text === 'C') {
      setResultText('');
      setHistoryText('');
    } else if (text === '=') {
      calculateResult();
    } else {
      setResultText(resultText + text);
    }
  };

  const calculateResult = () => {
    try {
      setHistoryText(resultText + ' =');
      const result = eval(resultText);
      setResultText(result.toString());
    } catch (error) {
      setResultText('Error');
    }
  };

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=',]
  ];

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.darkBackground]}>
      <View style={styles.themeToggle}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>{isDark ? 'Dark' : 'Light'} Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <View style={styles.resultContainer}>
        <Text style={[styles.historyText, isDark && { color: '#aaa' }]}>{historyText}</Text>
        <Text style={[styles.resultText, isDark && { color: '#fff' }]}>{resultText}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  button === '=' && styles.equalsButton,
                  isDark && styles.darkButton
                ]}
                onPress={() => handlePress(button)}
              >
                <Text style={[styles.buttonText, isDark && { color: '#fff' }]}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  darkBackground: {
    backgroundColor: '#1e1e1e',
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultContainer: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  historyText: {
    fontSize: 24,
    color: '#666',
  },
  resultText: {
    fontSize: 40,
    color: '#000',
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    height: 70,
    borderRadius: 12,
  },
  darkButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
  equalsButton: {
    backgroundColor: '#4CAF50',
  },
});
