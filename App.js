import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen'
import AddNoteScreen from './src/screens/AddNoteScreen'
import NoteScreen from './src/screens/NoteScreen';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{ cardStyle: { backgroundColor: '#FFF3E2' } }}>
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="AddNoteScreen" options={{headerShown: false}} component={AddNoteScreen} />
        <Stack.Screen name="NoteScreen" options={{headerShown: false}} component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}