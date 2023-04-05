import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [noteCol, setNoteCol] = useState([]);

  //fetch datta from firebase
  useEffect(() => {
    firebase.firestore().collection('notes')
      .onSnapshot((querySnapshot) => { 
        const newNotes = [];
        querySnapshot.forEach((doc) => { 
          const { title, body, data } = doc.data()
          newNotes.push({id: doc.id, title: title, body:body, data:data})
        })
        setNoteCol(newNotes)
      })
  }, [])
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Notes</Text>
      
      <Pressable style={styles.btn} onPress={() => navigation.navigate('AddNoteScreen')} >
        <Text >Go NoteAdd Screen</Text>
      </Pressable>
      
      <FlatList
        //style={styles.fl}
        data={noteCol}
        renderItem={({ item }) => {
          return (
            <View style={ styles.noteView }>
              <Pressable
                onPress={() => navigation.navigate('NoteScreen',item)}>
                <Text style={styles.text} >{item.title}</Text>
              </Pressable>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  //row: {
  //  padding: 15,
  //  marginBottom: 5,
  //  backgroundColor: 'skyblue',
  //},
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
  text: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#F3E8FF',
  },
  noteView: {
    //backgroundColor:'red'
    //!make sure to put the flatlist in container 
  },

})

export default HomeScreen