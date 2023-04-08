import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export async function pickImageAsync() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
  // create a blob to upload
  const blob = await uploadImageAsync(result.assets[0].uri);
  //upload the image as blob
  await uploadImageAsBlob(blob);
  //download as url so can be shared
  const url = await downloadImage(blob._data.name);
  const imageData = { url: "", path: `NotesImages/` }
  imageData.url = url;
  imageData.path = `NotesImages/${blob._data.name}`;
  return imageData;
};


//source code: 
//https://dev.to/adii9/uploading-images-to-firebase-storage-in-react-native-with-expo-workflow-24kj
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (ex) {
      console.log("xhr.onerror:", ex);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob"; // use BlobModule's UriHandler
    xhr.open("GET", uri, true); // fetch the blob from uri in async mode
    xhr.send(null);
  });
  return blob;
}


const uploadImageAsBlob = async (blob) => { 
  const storageRef = ref(storage, `NotesImages/${blob._data.name}`);
  const snapshot = await uploadBytes(storageRef, blob);
  return snapshot
}

const downloadImage = async (blobName) => { 
  const url = await getDownloadURL(ref(storage, `NotesImages/${blobName}`));
  console.log("downloadImage: ",url)
  return url;
}