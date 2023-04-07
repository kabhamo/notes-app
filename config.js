import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB3jrP7LHERwJB8_vbAdQe_ZOc4uZYOo1s",
    authDomain: "moveo-123.firebaseapp.com",
    projectId: "moveo-123",
    storageBucket: "moveo-123.appspot.com",
    messagingSenderId: "674252260212",
    appId: "1:674252260212:web:9af316f06af417125f6221",
    measurementId: "G-N8NPXWRT39",
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { firebase, auth };