import { View, KeyboardAvoidingView,Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { auth } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { storeData, getData } from '../services/asyncStorage';
const KEEPLOGGEDIN = '@keepLoggedIn';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [loading, setloading] = useState(true)
    const navigation = useNavigation();
    
    const handleSignUp = () => { 
        auth.createUserWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                await storeData(KEEPLOGGEDIN, true);
                navigation.navigate('HomeScreen');
            })
            .catch(ex => alert(`Authintication failed! ${ex.message}`))
    }

    const handleLogin = async () => {
        auth.signInWithEmailAndPassword(email,password)
            .then(async (userCredentials) => { 
                await storeData(KEEPLOGGEDIN, true);
                navigation.navigate('HomeScreen');
            })
            .catch(ex => alert(`Authintication failed! ${ex.message}`))
    }

    useEffect(() => { 
        const checkLoggedIn = async () => { 
            try {
                const isLoggedIn = await getData(KEEPLOGGEDIN); //Boolean
                if (isLoggedIn) {
                    console.log("Already Logged In")
                    navigation.navigate('HomeScreen');
                } 
            } catch (ex) { 
                alert(`Authintication failed! please login again ${ex.message}`)
            }
        }
        checkLoggedIn();
    }, [])

  return (
      <KeyboardAvoidingView
          style={ styles.container }
          behavior="padding"
      >
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholderTextColor={'#A5D7E8'}
                placeholder='Email'
                value={email}
                  onChangeText={(text) => setEmail(text)} />
              <TextInput
                style={styles.input}
                placeholderTextColor={'#A5D7E8'}
                placeholder='Password'
                secureTextEntry
                value={password}
                  onChangeText={(text) => setPassword(text)}
              />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.btn}
            >
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.btn, styles.btnOutline]}
            >
                <Text style={styles.btnOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    btnContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    btn: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    btnOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default LoginScreen