import { View, Text, Keyboard, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config'

const AddNoteScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const now = new Date();

  const handleAdd = () => { 
    if (title && title.length > 0) { 
      firebase.firestore().collection('notes')
      .add({ title: title, body: body, date: now })
      .then((res) => { 
        setTitle('')
        setBody('')
        Keyboard.dismiss();
        navigation.navigate('HomeScreen')
      })
      .catch((ex) => console.log(`Error saving data, ${ex}`))//alert
    } else {
      alert("Title can not be empty!")
    }
  }
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>New Note</Text>

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
        multiline
        onChangeText={(text) => setBody(text)} />
      
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
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#009FBD',
  },
  title: {
    marginTop: 0,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#20232a',
    backgroundColor: '#0B2447',
    color: '#A5D7E8',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
})

export default AddNoteScreen