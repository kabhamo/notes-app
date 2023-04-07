import { View, KeyboardAvoidingView,Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { auth } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { storeData, getData } from '../services/asyncStorage';
import Button from '../components/Button'
import Input from '../components/Input'
const KEEPLOGGEDIN = '@keepLoggedIn';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
          behavior="padding">
          
          <Image
            source={require('../../assets/loginImage.png')}
            style={{
                height: "40%",
                marginTop: "3%",
                resizeMode: "contain",
            }}/>
          <View style={styles.inputContainer}>

            <Input
                placeholderTextColor={'#A5D7E8'}
                placeholder='Email'
                value={email}
                onChangeText={(text) => setEmail(text)} />
            
            <Input
                placeholder='Password'
                secure={true}
                type={'password'}
                value={password}
                onChangeText={(text) => setPassword(text)} />
              
          </View>

          <View style={styles.btnContainer}>
            <Button styleButton={styles.LoginBtn} title={'Login'} onPress={handleLogin} />
            <Button styleButton={styles.registerBtn} styleText={{color:'#6c63ff'}} title={'Register'} onPress={handleSignUp} />
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
    btnContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    registerBtn: {
        backgroundColor: '#FFF3E2',
        borderWidth: 2,
        borderColor: "#6c63ff",
        width: '100%',
    },
    LoginBtn: {
        width: '100%',
    },
});

export default LoginScreen