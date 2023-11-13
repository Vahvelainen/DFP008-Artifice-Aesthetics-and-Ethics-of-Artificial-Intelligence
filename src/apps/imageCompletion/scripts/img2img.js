import { functions } from '@src/firebase'
import { httpsCallable } from "firebase/functions";

const img2imgCallable = httpsCallable(functions, 'img2img');

/**
 * Partly a cloud function, 
 * actual function defined in functions/stabilityai.js
 * Send a request to stabilityAI img2img API
 * @param {String} promt 
 * @param {String} negative_promt 
 * @param {Blob} image 
 * @returns {JSON} Promise with the image binary somewhere in json
 */
export async function img2img( promt, negative_promt, image) {
  const data = {
    promt: promt,
    negative_promt: negative_promt,
    image: await blobToBase64(image) //cloudfunctions doesn't undesrtand blobs
  }
  console.log(data)
  const response = await img2imgCallable(data);
  return response.data
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}