
import { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import { db, TODOS_REF } from './firebase/Config';
import style from './styles/style';
import { TodoItem } from './components/TodoItem';

export default function App() {

  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const q = query(collection(db, TODOS_REF), orderBy('todoItem'))
    onSnapshot(q, (querySnapshot) => {
      setTodos(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })    
  }, [])
  
  const addNewTodo = async () => {
    try {
      if (newTodo.trim() !== '') {
        await addDoc(collection(db, TODOS_REF), {
          done: false,
          todoItem: newTodo
        })
        setNewTodo('')
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const removeTodo = async(id) => {
    try {
      await deleteDoc(doc(db, TODOS_REF, id));
    } catch (error) {
      console.log(error.message);
    }
  }

  const removeTodoS = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, TODOS_REF))
      querySnapshot.forEach((todo) => {
        removeTodo(todo.id)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const filterTodos = (done) => {
    return todos.filter((obj) => obj.done === done).length
  }

  const createTwoButtonAlert = () => Alert.alert(
    'Todolist', 'Remove all items?', [{
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  {text: 'OK', onPress: () => removeTodoS()
  }],
  {cancelable: false}
  )

  let todosKeys = Object.keys(todos)

  return (
    <View style={style.container}>
      <Text style={style.header}>Todolist ({todosKeys.length})</Text>
      <View style={style.newItem}>
        <TextInput 
        style={style.textInput} 
        placeholder='Add new todo'
        value={newTodo}
        onChangeText={setNewTodo}/>
      </View>
      <View style={style.buttonStyle}>
        <Button
        title='Add new todo item'
        onPress={() => addNewTodo()}
        />
      </View>
      <Text style={style.subheader}>
        UnChecked ({filterTodos(false)})
      </Text>
      <View style={style.todosContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {todosKeys.length > 0 ? (
            todosKeys.map((key, i) => (
              !todos[i].done &&
              <TodoItem
              key={key}
              todoItem={todos[i].todoItem}
              done={todos[i].done}
              todoId={todos[key].id}
              />
            ))
          ) : (
            <Text style={style.infoText}>
              There are no items.
            </Text>
          )}
        </ScrollView>
      </View>
      <Text style={style.subheader}>
        Checked ({filterTodos(true)})
      </Text>
      <View style={style.todosContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {todosKeys.length > 0 ? (
            todosKeys.map((key, i) => (
              todos[i].done &&
              <TodoItem
              key={key}
              todoItem={todos[i].todoItem}
              done={todos[i].done}
              todoId={todos[key].id}
              />
            ))
          ) : (
            <Text style={style.infoText}>
              There are no items.
            </Text>
          )}
        </ScrollView>
      </View>
      <View style={style.buttonStyle}>
        <Button
        title='remove all todos'
        onPress={() => createTwoButtonAlert()}
        />
      </View>
    </View>
  );
}

