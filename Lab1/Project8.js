import React from 'react';
import {
  View,
  Text,
  SectionList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const PEOPLE = [
  { name: { first: 'Maeva', last: 'Scott' } },
  { name: { first: 'Maëlle', last: 'Henry' } },
  { name: { first: 'Mohamoud', last: 'Faaij' } },
];

const groupPeopleByLastName = (data) => {
  const grouped = data.reduce((acc, person) => {
    const key = person.name.last[0].toUpperCase();
    acc[key] = acc[key] || { title: key, data: [] };
    acc[key].data.push(person);
    return acc;
  }, {});
  return Object.values(grouped).sort((a, b) => a.title.localeCompare(b.title));
};

const App = () => {
  return (
    <SafeAreaView>
      <SectionList
        sections={groupPeopleByLastName(PEOPLE)}
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 1,
  },
  sectionHeader: {
    backgroundColor: '#aaa',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default App;
