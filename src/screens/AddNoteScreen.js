import {
  View, Text, SafeAreaView, ScrollView, StyleSheet,
  Keyboard, TouchableWithoutFeedback,
  TouchableOpacity, Platform, KeyboardAvoidingView
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config'
import useLocation from '../services/useLocation';
import * as ImagePicker from 'expo-image-picker';
import ImageLoad from 'react-native-image-placeholder';
import Input from '../components/Input';
import Button from '../components/Button'
import Header from '../components/Header';

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
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
            <View style={ styles.container }>
    
              <Header title={'New Note'}/>
              <Input
                placeholder='Title'
                value={title}
                onChangeText={(text) => setTitle(text)}/>
            
              <Input
                styleInput={{height:'30%'}}
                placeholder='Body'
                value={body}
                multiline
                onChangeText={(text) => setBody(text)}/>
            
              <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={pickImageAsync} >
                    <ImageLoad
                    style={styles.image}
                    loadingStyle={{ size: 'large', color: 'blue' }}
                    isShowActivity={false}
                    placeholderSource={require('../../assets/add-photo-icon-on-white-260nw-221329180.webp')}
                    placeholderStyle={styles.placeholderStyle}
                    source={{ uri: selectedImage}}
                  />
              </TouchableOpacity>

              <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Button styleButton={{width:'50%'}} title={'Save'} onPress={handleAdd} />
                <Button styleButton={{backgroundColor:'#FA9884'}} title={'Cancele'} onPress={() => navigation.navigate('HomeScreen')} />
              </View>
              
              </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: '8%',
  },
  imageContainer: {
    width: '90%',
    height: '70%',
    margin: 8,
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
  placeholderStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center' 
  },
})

export default AddNoteScreen