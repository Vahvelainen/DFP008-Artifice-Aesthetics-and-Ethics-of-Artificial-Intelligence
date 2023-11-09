/**
 * 1. Send request the same time as uploading the picture with base64 = canvas.toDataURL("image/jpeg")
 *    - File upload will only update upload url
 * 2. Receive base64 in response, convert to blob and upload file
 */

const fetch = require('make-fetch-happen');
const FormData = require('form-data');
const { Readable } = require('stream');

//Move to env / config file
const apiKey = 'sk-tqHNeMMLcKMTBRl9dh2gCHw4neuyZRs0kqyghJvqRdHTL9FI'

exports.img2imgAPI = img2imgAPI

/**
 * Send a request to stabilityAI img2img API
 * @param {String} promt 
 * @param {String} negative_promt 
 * @param {Blob} image 
 * @returns {Promise[ JSON ]} Promise with the image binary somewhere in json
 */
async function img2imgAPI( promt, negative_promt, image ) {
  const engineId = 'stable-diffusion-512-v2-1' //This engine is faster but guidance scale ssems to differ
  const apiHost = 'https://api.stability.ai'
  
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }

  const prompts = [
    {text: promt, weight: 1 },
    {text: negative_promt, weight: -1 },
  ]

  const body = {
    image_strength: 0.5,
    init_image_mode: "IMAGE_STRENGTH",
    // init_image: image, //set separetly
    //text_prompts: prompts, //set separetely
    cfg_scale: 20,
    clip_guidance_preset: "FAST_BLUE",
    sampler: "K_DPM_2_ANCESTRAL",
    samples: 1,
    steps: 20,
  }

  //SabilityAI wants data as formdata
  const formData = new FormData();
  //Generation parameters
  for (let key in body) {
    formData.append(key, body[key]);
  }
  //Promts
  for (let i = 0; i < prompts.length; i++) {
    const promt = prompts[i];
    formData.append(`text_prompts[${i}][text]`, promt.text )
    formData.append(`text_prompts[${i}][weight]`, promt.weight )
  }
  //Image to readable bc cloudfunctions dont know what Blob is (I don't know what readable is)
  const imageReadable = base64ToReadable(image)
  formData.append('init_image', imageReadable);

  const response = await fetch(`${apiHost}/v1/generation/${engineId}/image-to-image`, {
    method: 'POST',
    headers: headers,
    body: formData,
  })
  const response_text = await response.text()
  const result = JSON.parse(response_text)

  return result
}

function base64ToReadable(base64String) {
  const base64Data = base64String.replace(/^data:\w+\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
}
