import { View, Text, Keyboard, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState} from 'react'
import { firebase } from '../../config'

const AddNoteScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [data, setData] = useState('');

  const handleAdd = () => { 
    firebase.firestore().collection('notes')
      .add({ title: title, body: body, data: data })
      .then((res) => { 
        setTitle('')
        setBody('')
        setData('')
        Keyboard.dismiss();
      })
      .catch((ex) => console.log(`Error saving data, ${ex}`))//alert
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#A5D7E8'}
        placeholder='Title'
        value={title}
        onChangeText={(text) => setTitle(text)} />
      <TextInput
        style={[styles.input, {height:'25%'}]}
        placeholderTextColor={'#A5D7E8'}
        placeholder='Body'
        value={body}
        onChangeText={(text) => setBody(text)} />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#A5D7E8'}
        placeholder='Data'
        value={data}
        onChangeText={(text) => setData(text)} />
      
      <TouchableOpacity
        style={styles.btn}
        onPress={handleAdd}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderColor: '#009FBD',
    borderWidth:1,
    width: '100%',
    height:'8%'
  },
  btn: {},
})

export default AddNoteScreen