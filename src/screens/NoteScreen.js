import { View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../config';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button'
import NoteCard from '../components/NoteCard';
import { useNavigation } from '@react-navigation/native';
import { pickImageAsync } from '../services/uploadImage';
import ImageLoad from 'react-native-image-placeholder';
import { getStorage, ref, deleteObject } from "firebase/storage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NoteScreen = ({ route }) => {
  const navigation = useNavigation();
  const {id,title,body,date, imageData } = route.params
  const [newTitle, setTitle] = useState(title);
  const [newBody, setBody] = useState(body);
  const [noteDate, setDate] = useState(new Date(date.seconds * 1000));
  const [selectedImageData, setSelectedImageData] = useState(imageData);
  const now = new Date();

  const handleUpdate = () => { 
      if (newTitle && newTitle.length > 0) {
          firebase.firestore().collection('notes')
              .doc(id).update({
                  title: newTitle,
                  body: newBody,
                  date: now,
                  imageData: selectedImageData
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
    const storage = getStorage();
    const toDeleteImageRef = ref(storage, imageData?.path)
    deleteObject(toDeleteImageRef)
      .then(() => console.log('File deleted successfully'))
      .catch((ex) => alert(`Error while deleting the image, ${ex}`))
    
    firebase.firestore().collection('notes')
      .doc(id).delete()
      .then((res) => navigation.navigate('HomeScreen'))
      .catch((ex) => alert(`Error while deleting the note, ${ex}`))
  }

  const uploadImageHandler = async () => { 
    const result = await pickImageAsync();
    if (result) {
      setSelectedImageData(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        
        <View style={styles.headerContainer}>
          <Header title={'Note Details'} />
        </View>

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

        {imageData ?
         <TouchableOpacity
          style={styles.imageContainer}
          onPress={uploadImageHandler} >
            <ImageLoad
            style={styles.image}
            loadingStyle={{ size: 'large', color: 'blue' }}
            isShowActivity={true}
            placeholderStyle={styles.placeholderStyle}
            source={{ uri: selectedImageData.url}}
          />
        </TouchableOpacity>
          :
          <NoteCard
            item={{ title: `No image was added to ${newTitle} note`, descripcion: null }}
            cardStyle={styles.NoteCard} titleStyle={styles.NoteCardTitle} />
        }
          
        <NoteCard item={{ title: noteDate.toUTCString(), descripcion: null }}
          cardStyle={styles.NoteCard} titleStyle={styles.NoteCardTitle} />
        
        <View style={styles.btnsContainer}>
          <Button
            styleButton={styles.updateBtn}
            title={'Save'} onPress={handleUpdate} />
          <Button styleButton={styles.deleteBtn}
            title={'Delete'} onPress={handleDelete} />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    width: windowWidth,
    marginBottom: '3%',
    //marginBottom:10,
  },
  TitleInput: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.08,
  },
  BodyInput: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
  },
  NoteCard: {
    width: windowWidth * 0.8,
  },
  NoteCardTitle: {
    fontSize: 16,
  },
  imageContainer: {
    width: windowWidth* 0.8,
    height: windowHeight* 0.3,
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
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center' 
  },
  updateBtn: {
    width: windowWidth*0.4
  },
  deleteBtn: {
    backgroundColor: '#CE5959',
    width: windowWidth*0.3
  },
  placeholderStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
})

export default NoteScreen