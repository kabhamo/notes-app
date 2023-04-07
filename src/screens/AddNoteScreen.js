import {
  View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback,
  TouchableOpacity, Platform, KeyboardAvoidingView
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useLocation from '../services/useLocation';
import * as ImagePicker from 'expo-image-picker';
import ImageLoad from 'react-native-image-placeholder';

const AddNoteScreen = () => {
  const navigation = useNavigation();
  const [coordinates] = useLocation()
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const now = new Date();

  const handleAdd = () => { 
    if (title && title.length > 0) { 
      firebase.firestore().collection('notes')
      .add({ title: title, body: body, date: now, coordinates:coordinates, imageUri: selectedImage})
      .then((res) => { 
        setTitle('')
        setBody('')
        setSelectedImage(null)
        Keyboard.dismiss();
        navigation.navigate('HomeScreen')
      })
      .catch((ex) => console.log(`Error saving data, ${ex}`))//alert
    } else {
      alert("Title can not be empty!")
    }
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      
      <View style={ styles.container }>
      
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
            style={{alignItems:'flex-end', padding:'3%'}}
            onPress={pickImageAsync} >
              <ImageLoad
              style={{ width: 320, height: 200, alignSelf:'center' }}
              loadingStyle={{ size: 'large', color: 'blue' }}
              isShowActivity={false}
              placeholderSource={require('../../assets/add-photo-icon-on-white-260nw-221329180.webp')}
              placeholderStyle={{ width: 320, height: 200, alignSelf:'center' }}
              source={{ uri: selectedImage}}
            />
        </TouchableOpacity>
        

        <TouchableOpacity
          style={styles.btn}
          onPress={handleAdd}>
          <Text>Save</Text>
        </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  image: {
    width: '70%',
    height: '30%',
    alignSelf:'center'
  },
})

export default AddNoteScreen