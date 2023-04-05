import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen'
import AddNoteScreen from './src/screens/AddNoteScreen'
import NoteScreen from './src/screens/NoteScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{cardStyle: { backgroundColor: '#454545' }}}>
        {/* Home Screen is the starting point to navigate */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}