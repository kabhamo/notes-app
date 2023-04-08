import * as ImagePicker from 'expo-image-picker';

export async function pickImageAsync() {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,   
    });
    if (result.canceled) {
        alert('You did not select any image.');
        return
    }
    return result
  };