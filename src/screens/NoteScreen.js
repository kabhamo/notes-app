import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../config';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button'
import NoteCard from '../components/NoteCard';
import { useNavigation } from '@react-navigation/native';

const NoteScreen = ({ route }) => {
  const navigation = useNavigation();
  const {id,title,body,date, coordinates, imageUri } = route.params
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
          alert("Title can not be empty!")
      }
  }

  const handleDelete = () => { 
    firebase.firestore().collection('notes')
      .doc(id).delete()
      .then((res) => navigation.navigate('HomeScreen'))
      .catch((ex) => alert(`Error while deleting the note, ${ex}`))
  }

  return (
    <View style={styles.container}>
      <Header title={'Note Details'} />

      <Input
        styleInput={styles.TitleInput}
        placeholder='Title'
        value={newTitle}
        onChangeText={(text) => setTitle(text)}/>
      
      <Input
        styleInput={styles.BodyInput}
        placeholder='Body'
        value={newBody}
        multiline
        onChangeText={(text) => setBody(text)}/>

      {imageUri ? <View style={styles.imageContainer}>
      <Image
          source={{uri: imageUri}}
          style={{
            height: "100%",
            width: '100%',
          }}
           />
      </View> :
        <NoteCard item={{ title: `No image was added to ${newTitle} note`, descripcion: null }}
          cardStyle={styles.NoteCard} titleStyle={styles.NoteCardTitle} />}
      
      <NoteCard item={{ title: noteDate.toUTCString(), descripcion: null }}
        cardStyle={styles.NoteCard} titleStyle={styles.NoteCardTitle} />
      
      <View style={{ flexDirection: 'row', columnGap: '35%', justifyContent: 'center' }}>
        <Button
          styleButton={{  width: '40%' }}
          title={'Save'} onPress={handleUpdate} />
        <Button styleButton={{ backgroundColor: '#CE5959', width: '30%' }}
          title={'Delete'} onPress={handleDelete} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 18
  },
  TitleInput: {
    marginTop: 0,
    fontSize: 18,
    paddingVertical: 10,
  },
  BodyInput: {
    marginTop: 0,
    height: '20%',
    fontSize: 18,
  },
  NoteCard: {
    marginTop: 0,
    width:'80%'
  },
  NoteCardTitle: {
    fontSize: 16,
  },
  imageContainer: {
    width: '90%',
    height: '25%',
    margin: 8,
    marginTop : 0,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#6c63ff",
    alignItems: 'flex-end',
    padding: '3%'
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center' 
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