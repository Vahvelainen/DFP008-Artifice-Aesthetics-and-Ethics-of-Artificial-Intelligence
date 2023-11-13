/**
 * Functions for uploading an image to cloud storage and receiving its hosting address
 * 
 */

import { storage } from "@src/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Upload image to firebase storage
 * Returns promise of image url
 * @param {Blob} imgFile 
 * @param {Function} callBack 
 * @returns {Promise<string>}
 */
export default async function imageUpload(imgFile) {
  // Create a reference to random ID
  const imageId = makeID() 
  const fileName = imageId + '.jpeg';
  const imgRef = ref(storage, 'uploads' + fileName);
  const metadata = {
    'contentType': 'image/jpeg',
  };

  try {
    const snapshot = await uploadBytes(imgRef, imgFile, metadata)
    const imgUrl = await getDownloadURL(snapshot.ref)
    return imgUrl
  } catch (error) {
    console.log(error)
  }
};

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function makeID(length=16) {
  //around 7e+27 possibilities with 16 characters
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  return result;
}