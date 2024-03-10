import { Pressable, Text, View } from "react-native"
import style from '../styles/style'
import { useState } from 'react'
import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db, TODOS_REF } from '../firebase/Config'
import { MaterialIcons } from '@expo/vector-icons'
import EnTypo from '@expo/vector-icons/Entypo'

const unchecked_background = '#c8e6f1'
const checked_background = '#e1f1c3'

export const TodoItem = ({todoItem: todoItem, done: done, todoId: todoId}) => {

    const [doneState, setDone] = useState(done)

    const onCheck = async() => {
        try {
            setDone(!doneState)
            await updateDoc(doc(db, TODOS_REF, todoId), {
                done: !doneState
            })
        }
        catch (error) {
            console.log(error.message);
        }}

        const onRemove = async() => {
            try {
                await deleteDoc(doc(db, TODOS_REF, todoId))
            }
            catch (error) {
                console.log(error.message);
            }
        }

    return(
        <View style={style.todoItem}>
            <Pressable onPress={onCheck}>
                {doneState 
                ? <MaterialIcons name={'check-box'} size={32}/>
                : <MaterialIcons name={'check-box-outline-blank'} size={32}/>
                }
            </Pressable>
            <Text
            style={{backgroundColor: done ? checked_background : unchecked_background}}
            onPress={onCheck}
            >
              {todoItem}  
            </Text>
            {done &&
            <Pressable>
                <EnTypo name={'trash'} size={32} color={'black'} onPress={onRemove}/>
            </Pressable>
            }
        </View>
    )
}