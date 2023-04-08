import {
  View, SafeAreaView, StyleSheet,
  Keyboard, TouchableWithoutFeedback,
  TouchableOpacity, Platform, KeyboardAvoidingView,
  Dimensions
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config'
import useLocation from '../services/useLocation';
import { pickImageAsync } from '../services/uploadImage';
import ImageLoad from 'react-native-image-placeholder';
import Input from '../components/Input';
import Button from '../components/Button'
import Header from '../components/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddNoteScreen = () => {
  const navigation = useNavigation();
  const [coordinates] = useLocation();
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const now = new Date();

  const handleAdd = () => { 
    if (title && title.length > 0) { 
      firebase.firestore().collection('notes')
        .add({
          title: title, body: body, date: now, coordinates: coordinates,
          imageData: selectedImageData
        })
      .then((res) => { 
        setTitle('')
        setBody('')
        setSelectedImageData(null)
        Keyboard.dismiss();
        navigation.navigate('HomeScreen')
      })
      .catch((ex) => console.log(`Error saving data, ${ex}`))//alert
    } else {
      alert("Title can not be empty!")
    }
  }

  const uploadImageHandler = async () => { 
    const imageData = await pickImageAsync();
    //console.log("uploadImageHandler: ", url)
    if (imageData) {
      setSelectedImageData(imageData);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
          <View style={styles.container}>
            
            <View style={styles.headerContainer}>
                <Header title={'New Note'}/>
            </View>
              
              <Input
                styleInput={styles.inputTitle}
                placeholder='Title'
                value={title}
                onChangeText={(text) => setTitle(text)}/>
            
              <Input
                styleInput={styles.inputBody}
                placeholder='Body'
                value={body}
                multiline
                onChangeText={(text) => setBody(text)}/>
            
              <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={uploadImageHandler} >
                    <ImageLoad
                    style={styles.image}
                    loadingStyle={{ size: 'large', color: 'blue' }}
                    isShowActivity={false}
                    placeholderSource={require('../../assets/add-photo-icon-on-white-260nw-221329180.webp')}
                    placeholderStyle={styles.placeholderStyle}
                    source={{ uri: selectedImageData?.url}}
                  />
              </TouchableOpacity>

              <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Button styleButton={{width:'50%'}} title={'Save'} onPress={handleAdd} />
                <Button styleButton={{backgroundColor:'#FA9884'}} title={'Cancele'} onPress={() => navigation.navigate('HomeScreen')} />
              </View>
              
          </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: Platform.OS == 'android' && 'center',
    alignItems: 'center',
    //gap: Platform.OS == 'android' ? 0 : '8%', //!check
  },
  headerContainer: {
    width: windowWidth,
    marginBottom: '3%',
    //marginBottom:10,
  },
  imageContainer: {
    width: windowWidth* 0.8,
    height: windowHeight* 0.3,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#6c63ff",
    padding: '3%',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  placeholderStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  inputTitle: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.08
  },
  inputBody: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
  },
})

export default AddNoteScreen