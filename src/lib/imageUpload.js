/**
 * Functions for uploading an image to cloud storage and receiving its hosting address
 * 
 */

import { storage } from "@src/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { makeID } from '@lib/utils'

/**
 * Upload image to firebase storage
 * Takes optional Callback function with url of saved file as a parameter
 * @param {Blob} imgFile 
 * @param {Function} callBack 
 */
export default function imageUpload(imgFile, callBack = ()=>{}) {
  // Create a reference to random ID
  const imageId = makeID() 
  const fileName = imageId + '.jpeg';
  const imgRef = ref(storage, 'uploads' + fileName);
  const metadata = {
    'contentType': 'image/jpeg',
  };
  uploadBytes(imgRef, imgFile, metadata)
    .then( (snapshot) => getDownloadURL(snapshot.ref) )
    .then( url => callBack(url) )
    .catch((error) => {
      console.log(error)
    });
};
