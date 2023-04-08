import { View, Text, FlatList, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import DisplayMode from '../components/DisplayComponent';
import MapDisplay from '../components/MapDisplay';
import { useNavigation } from '@react-navigation/native';
import { firebase, auth } from '../../config';
import { Octicons, Entypo } from '@expo/vector-icons';
import { storeData } from '../services/asyncStorage';
import useLocation from '../services/useLocation';
import NoteCard from '../components/NoteCard';
import Header from '../components/Header';

const KEEPLOGGEDIN = '@keepLoggedIn';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [coordinates] = useLocation()
  const [noteCol, setNoteCol] = useState([]);
  const [toggleMode, setToggleMode] = useState(false); //listMode is default
  const [online, setOnline] = useState(true)
  
  useEffect(() => { 
    navigation.addListener('beforeRemove', (e) => { 
      // Prevent default behavior of leaving the screen
      //we want to sign out only using the button
      e.preventDefault();
      if (!online) {
        navigation.dispatch(e.data.action)
      }
    })
  }, [online])
  
  //fetch datta from firebase
  useEffect(() => {
    firebase.firestore().collection('notes')
      .onSnapshot((querySnapshot) => { 
        const newNotes = [];
        querySnapshot.forEach((doc) => { 
          const { title, body, date, coordinates, imageUri } = doc.data()
          newNotes.push({
            id: doc.id,
            title: title,
            body: body,
            date: date,
            coordinates: coordinates,
            imageUri: imageUri
          })
        })
        newNotes.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date.seconds*1000) - new Date(a.date.seconds*1000);
        });
        setNoteCol(newNotes)
      })
  }, [])

  const handleSignOut = () => {
    setOnline(false)
    auth
      .signOut()
      .then(async () => {
        await storeData(KEEPLOGGEDIN, false)
        navigation.replace("LoginScreen")
      })
      .catch(error => alert(error.message))
  }
  
  const handleMapMode = (isOne) => { 
    setToggleMode(isOne)
  }

  return (
    <View style={styles.container}>

      <Header title={'My Notes'} />
      <DisplayMode toggleMode={toggleMode} handleMapMode={handleMapMode} />

      {toggleMode ?
        <MapDisplay data={noteCol} coordinates={coordinates} />
        :
        <FlatList
        data={noteCol.length > 0 ? noteCol : [{id:0,text:""}]}
        renderItem={({ item }) => {
          if (noteCol.length > 0) {
            return (
              <View style={styles.noteView}>
                <Pressable
                  onPress={() => navigation.navigate('NoteScreen', item)}>
                  <NoteCard item={{title:item.title, descripcion:item.body}} />
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
        />}
      
      <View style={styles.btns}>
        <TouchableOpacity
          style={{alignItems:'flex-end', padding:'3%'}}
          onPress={handleSignOut} >
          <Octicons name="sign-in" size={45} color='#6c63ff' />
          {/*<Entypo name='back' size={45} color='#6c63ff'/>*/}
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems:'flex-end', padding:'3%'}}
          onPress={() => navigation.navigate('AddNoteScreen')} >
          <Entypo name='add-to-list' size={45} color='#6c63ff'/>
        </TouchableOpacity>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
  },
  title: {
    marginTop: 0,
    paddingVertical: '5%',
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
  empty: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#F3E8FF',
    textAlign:'center'
  },
  btns: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },

})

export default HomeScreen