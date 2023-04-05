import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';

const NoteScreen = ({ route }) => {
    const navigation = useNavigation();
    const {id,title,body,data } = route.params
    const [newTitle, setTitle] = useState(title);
    const [newBody, setBody] = useState(body);
    const [newData, setData] = useState(data);

    const handleUpdate = () => { 
        if (newTitle && newTitle.length > 0) {
            firebase.firestore().collection('notes')
                .doc(id).update({
                    title: newTitle,
                    body: newBody,
                    data: newData,
                })
                .then((res) => {
                    navigation.navigate('HomeScreen')
                })
                .catch((ex) => console.log(`Error while updating note ${note.id} , ${ex}`))
        } else { 
            Alert.alert("Title is empty!")
        }
    }

  return (
      <View style={ styles.container }>
        <TextInput
            placeholder='Title'
            value={newTitle}
            onChangeText={(text) => setTitle(text)}
            style={ styles.input }
        />
        <TextInput
            placeholder='Body'
            value={newBody}
            onChangeText={(text) => setBody(text)}
            style={ styles.input }
        />
        <TextInput
            placeholder='Data'
            value={newData}
            onChangeText={(text) => setData(text)}
            style={ styles.input }
        />
          <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
            <Text>Update</Text>
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
  })

export default NoteScreen