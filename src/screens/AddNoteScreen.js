import {
  View, SafeAreaView, ScrollView, StyleSheet,
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
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const now = new Date();

  const handleAdd = () => { 
    if (title && title.length > 0) { 
      firebase.firestore().collection('notes')
      .add({ title: title, body: body, date: now, coordinates:coordinates, imageUri: selectedImageUri})
      .then((res) => { 
        setTitle('')
        setBody('')
        setSelectedImageUri(null)
        Keyboard.dismiss();
        navigation.navigate('HomeScreen')
      })
      .catch((ex) => console.log(`Error saving data, ${ex}`))//alert
    } else {
      alert("Title can not be empty!")
    }
  }

  //source code: 
  //https://dev.to/adii9/uploading-images-to-firebase-storage-in-react-native-with-expo-workflow-24kj
  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (ex) {
        console.log("xhr.onerror:" ,ex);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; // use BlobModule's UriHandler
      xhr.open("GET", uri, true); // fetch the blob from uri in async mode
      xhr.send(null);  // no initial data
    });

    const fileRef = firebase.database().ref().child('imageUri')
    const snapshot = fileRef.set(blob) //Add the blob to database
      .then((res) => console.log("snapshot adding result: ", res))
      .catch((ex)=>console.log("Error while adding to database: ", ex))
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => { 
        //setUploading(true)
      }, (error) => { 
        //setUploading(false)
        console.log("Error snapshot: ", error)
        blob.close()
        return
    },
      () => { 
        snapshot.snapshot.ref.getDownloadURL().then((url) => { 
          //setUploading(false)
          console.log("Download URL: ", url)
          setSelectedImageUri(url)
          blob.close()
          return url
        })
      })
  }

  const pickImageAsync = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,   
    });
    if (!result.canceled) {
      setSelectedImageUri(result.assets[0].uri);
      const uploadUrl = await uploadImageAsync(result.assets[0].uri);
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
                    source={{ uri: selectedImageUri}}
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