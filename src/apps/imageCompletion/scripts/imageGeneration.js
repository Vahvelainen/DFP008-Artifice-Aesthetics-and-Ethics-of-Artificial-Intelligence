/**
 * The main file to do all the steps in image generation including
 * - Uploading the pictures
 * - Sending them to API
 * - Saving generation to Firebase
 * - Setting up the store where urls are
 */

import { setLoading, saveInputUrl, saveOutputUrl, saveID } from './imageStore'
import { img2img } from "./img2img" 


export default async function generateImage(promt, negative_promt, inputImg) {

  setLoading(true)

  //Output
  let outputImg 

  // send image to stability AI API
  await img2img(promt, negative_promt, inputImg)
  .then( async response => {
    console.log(response)
    outputImg = b64toBlob(response.artifacts[0].base64)
    saveOutputUrl(URL.createObjectURL(outputImg))
  })
  .catch(error => console.log('error', error));
  setLoading(false)

  return outputImg
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