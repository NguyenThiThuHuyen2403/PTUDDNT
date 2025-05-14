import React from 'react';
import { List } from 'react-native-paper';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function TodoItem({ item }) {
  const toggleTodo = async () => {
    const todoDoc = doc(db, 'todos', item.id);
    await updateDoc(todoDoc, { complete: !item.complete });
  };

  return (
    <List.Item
      title={item.title}
      onPress={toggleTodo}
      left={props => <List.Icon {...props} icon={item.complete ? 'check' : 'cancel'} />}
    />
  );
}
