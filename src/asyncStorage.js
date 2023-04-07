import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (ex) {
      console.log(`Error saving userCredentials, ${ex}`)
    }
}


export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(`Error while getting userCredentials, ${ex}`)
    }
}

export const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
        console.log(`Error deleting userCredentials, ${ex}`)
    }
    console.log('Done.')
}