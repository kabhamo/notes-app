import { View, Text, FlatList, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { Entypo } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [noteCol, setNoteCol] = useState([]);

  //fetch datta from firebase
  useEffect(() => {
    firebase.firestore().collection('notes')
      .onSnapshot((querySnapshot) => { 
        const newNotes = [];
        querySnapshot.forEach((doc) => { 
          const { title, body, date } = doc.data()
          newNotes.push({id: doc.id, title: title, body:body, date:date})
        })
        setNoteCol(newNotes)
      })
  }, [])
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Notes</Text>

      <FlatList
        data={noteCol.length > 0 ? noteCol : [{id:0,text:""}]}
        renderItem={({ item }) => {
          if (noteCol.length > 0) {
            return (
              <View style={styles.noteView}>
                <Pressable
                  onPress={() => navigation.navigate('NoteScreen', item)}>
                  <Text style={styles.text} >{item.title}</Text>
                </Pressable>
              </View>
            )
          } else { 
            return (
              <View style={styles.noteView}>
                <Text style={styles.empty}>There is no notes, go and create new one</Text>      
              </View>
              )
          }
      }}
        keyExtractor={(item) => item.id}
      />
        
      <TouchableOpacity
        style={{alignItems:'flex-end', padding:'3%'}}
        onPress={() => navigation.navigate('AddNoteScreen')} >
        <Entypo name='plus' size={45} color='#A5D7E8'/>
      </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
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
  empty: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#F3E8FF',
    textAlign:'center'
    
    
  },

})

export default HomeScreen