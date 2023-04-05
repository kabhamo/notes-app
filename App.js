import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Home from './src/Home'
import NoteAdd from './src/NoteAdd'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{cardStyle: { backgroundColor: '#454545' }}}>
        {/* Home Screen is the starting point to navigate */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NoteAdd" component={NoteAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}