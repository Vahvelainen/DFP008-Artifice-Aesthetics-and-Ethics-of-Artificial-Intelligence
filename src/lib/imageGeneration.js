/**
 * The main file to do all the steps in image generation including
 * - Uploading the pictures
 * - Sending them to API
 * - Saving generation to Firebase
 * - Setting up the store where urls are
 */

import { setLoading, saveInputUrl, saveOutputUrl } from '@stores/imageStore'
import { addToHistory } from '@stores/historyStore'

import imageUpload from './imageUpload'
import { saveGeneration } from './firestore'
import { sendToAPI } from "@lib/stabilityai"


export default async function generateImage(promt, negative_promt, file, description = '') {
  setLoading(true)

  let inputUrl
  let outputUrl

  // save image to firebase
  let uploadPromise = imageUpload(file)
  .then( url => {
    //Save url to store (will happen before generation, no worries)
    inputUrl = url 
    saveInputUrl(url)
  })

  // send image to stability AI API
  let apiPromise = sendToAPI(promt, negative_promt, file)
  .then(response => response.text())
  .then( async response => {
    response = JSON.parse(response)
    console.log(response)
    const image = b64toBlob(response.artifacts[0].base64)
    outputUrl = await imageUpload(image)
    saveOutputUrl(outputUrl)
  })
  .catch(error => console.log('error', error));

  await Promise.all([uploadPromise, apiPromise])

  saveGeneration(inputUrl, outputUrl, promt, negative_promt, description)
  addToHistory(inputUrl, outputUrl, description)

  setLoading(false)
}

//Will be needed
function b64toBlob(b64Data, contentType='', sliceSize=512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}