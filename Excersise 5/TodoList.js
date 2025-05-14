import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const todosRef = collection(db, 'todos');

  useEffect(() => {
    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(list);
    });
    return unsubscribe;
  }, []);

  const addTodo = async () => {
    if (todo.trim().length === 0) return;
    await addDoc(todosRef, { title: todo, complete: false });
    setTodo('');
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem item={item} />}
      />
      <TextInput
        label={'New Todo'}
        value={todo}
        onChangeText={setTodo}
      />
      <Button onPress={addTodo}>Add TODO</Button>
    </View>
  );
}
