/**
 * The main file to do all the steps in image generation including
 * - Uploading the pictures
 * - Sending them to API
 * - Saving generation to Firebase
 * - Setting up the store where urls are
 */

import { setLoading, saveOutputUrl  } from './imageStore'
import { img2img } from "./img2img" 
import { addToHistory } from './historyStore'

/**
 * Handle various tasks for image generation
 * @param {Blob} canvas 
 * @param {String} topic 
 * @param {JSON[]} selections 
 * @param {Boolean} inputting 
 */
export default async function generateImage(inputBlob, topic, selections, inputting) {
  let promt = createPromt(topic, selections)
  let negative_promt = 'people'

  setLoading(true)

  if (inputting) {
    //Temporalily set the input image as output
    saveOutputUrl(URL.createObjectURL(inputBlob));
  }

  
  // send image to stability AI API
  let outputImg 
  await img2img(promt, negative_promt, inputBlob)
  .then( async response => {
    console.log(response)
    outputImg = b64toBlob(response.artifacts[0].base64)
    saveOutputUrl(URL.createObjectURL(outputImg))
  })
  .catch(error => console.log('error', error));
  setLoading(false)

  addToHistory(inputBlob, outputImg, topic, selections)

  return outputImg
}

export function createPromt(topic, selections) {
  let promt = 'Finished rendering of a ' + topic
  for( const selection of selections ) {
    if(selection) {
      promt = promt + ', ' + selection.promt
    }
  }
  return promt
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