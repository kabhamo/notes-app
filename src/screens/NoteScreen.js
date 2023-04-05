import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';

const NoteScreen = ({ route }) => {
  const navigation = useNavigation();
  const {id,title,body,date } = route.params
  const [newTitle, setTitle] = useState(title);
  const [newBody, setBody] = useState(body);
  const [noteDate, setDate] = useState(new Date(date.seconds*1000));
  const now = new Date();

  const handleUpdate = () => { 
      if (newTitle && newTitle.length > 0) {
          firebase.firestore().collection('notes')
              .doc(id).update({
                  title: newTitle,
                  body: newBody,
                  date: now,
              })
              .then((res) => {
                  navigation.navigate('HomeScreen')
              })
              .catch((ex) => console.log(`Error while updating note ${note.id} , ${ex}`))
      } else { 
          Alert.alert("Title can not be empty!")
      }
  }

  const handleDelete = () => { 
    firebase.firestore().collection('notes')
      .doc(id).delete()
      .then((res) => navigation.navigate('HomeScreen'))
      .catch((ex) => Alert.alert(`Error while deleting the note, ${ex}`))
  }
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Note Details</Text>

      <TextInput
          placeholder='Title'
          value={newTitle}
          onChangeText={(text) => setTitle(text)}
          style={ styles.input }
      />
      <TextInput
          placeholder='Body'
          value={newBody}
          multiline
          onChangeText={(text) => setBody(text)}
          style={[styles.input, {height:'25%'}]}
      />

      <Text style={ styles.date }>Date: {noteDate.toISOString()}</Text>

      <View style={{flexDirection:'row' , columnGap:'50%', justifyContent:'center'}}>
        <TouchableOpacity style={styles.btn}
          onPress={handleUpdate}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#CE5959' }]}
          onPress={handleDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      

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
  date: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#F3E8FF',
    textAlign:'center'
  },
})

export default NoteScreen