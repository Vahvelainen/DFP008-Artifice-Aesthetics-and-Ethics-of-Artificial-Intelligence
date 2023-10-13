/**
 * Functions for uploading an image to cloud storage and receiving its hosting address
 * 
 */

import { storage } from "@src/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { makeID } from '@lib/utils'
import { sendToAPI } from "./stableDiffusion";
import imageStore from '@stores/imageStore'

// Capture a frame from the video stream
export function captureFrame(videoElement) {
  console.log('Sending image to cloud')
  //Creates a cnavas to be turned into blob
  const canvas = document.createElement("canvas");
  const context = canvas.getContext('2d');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
  // Convert the captured frame to base64 format
  canvas.toBlob(blob => {
      // Use the blob as needed (e.g. upload it to a server)
      console.log(blob);
      uploadFile(blob)
    }, 'image/jpeg');
};

// upload function
export function uploadFile(imgFile) {
  // Create a reference to random ID
  const imageId = makeID() 
  const fileName = imageId + '.jpeg';
  const imgRef = ref(storage, 'uploads' + fileName);
  const metadata = {
    'contentType': 'image/jpeg',
  };
  uploadBytes(imgRef, imgFile, metadata)
    .then( (snapshot) => {
      console.log(snapshot)
      saveImageUrl(snapshot.ref)
    })
    .catch((error) => {
      console.log(error)
    });
};

async function saveImageUrl(imgRef) {
  const url = await getDownloadURL(imgRef)
  imageStore.update( store => {
    store.inputUrl = url
    return store
  })
  sendToAPI(
    'Turn into a sleek product design and remove the background',
    'people, clutter, backgroung',
    url)
}