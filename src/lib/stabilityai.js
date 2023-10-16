/**
 * 1. Send request the same time as uploading the picture with base64 = canvas.toDataURL("image/jpeg")
 *    - File upload will only update upload url
 * 2. Receive base64 in response, convert to blob and upload file
 * 
 * 
 */
import imageStore from '@stores/imageStore'
import imageUpload from '@lib/imageUpload'

//Move to env / config file
const apiKey = 'sk-tqHNeMMLcKMTBRl9dh2gCHw4neuyZRs0kqyghJvqRdHTL9FI'

/**
 * Send canvas content to stabitily.ai API
 * Upload images to firebase storqage and save urls
 * @param {HTMLCanvasElement} canvas 
 */
export function captureFrame(canvas) {
  canvas.toBlob(blob => {
    console.log(blob);
    imageUpload(blob, saveInputUrl)
    sendToAPI(
      'Turn into a sleek product design and remove the background',
      'people, clutter, backgroung',
      blob)
  }, 'image/jpeg');
}

function sendToAPI(promt, negative_promt, image) {
  const engineId = 'stable-diffusion-xl-1024-v1-0'
  const apiHost = 'https://api.stability.ai'

  const prompts = [
    {text: promt, weight: 1 },
    {text: negative_promt, weight: -1 },
  ]

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
  const body = {
    image_strength: 0.35,
    init_image_mode: "IMAGE_STRENGTH",
    init_image: image,
    //text_prompts: prompts, //set separetely
    cfg_scale: 7,
    clip_guidance_preset: "FAST_BLUE",
    sampler: "K_DPM_2_ANCESTRAL",
    samples: 1,
    steps: 20,
  }

  //SabilityAI wants data as formdata
  const formData = new FormData();
  for (let key in body) {
    formData.append(key, body[key]);
  }
  for (let i = 0; i < prompts.length; i++) {
    const promt = prompts[i];
    formData.append(`text_prompts[${i}][text]`, promt.text )
    formData.append(`text_prompts[${i}][weight]`, promt.weight )
  }
  
  fetch(`${apiHost}/v1/generation/${engineId}/image-to-image`, {
    method: 'POST',
    headers: headers,
    body: formData,
  })
  .then(response => response.text())
  .then(response => {
    response = JSON.parse(response)
    console.log(response)
    const image = b64toBlob(response.artifacts[0].base64)
    imageUpload(image, saveOutputUrl)
  })
  .catch(error => console.log('error', error));
}

function saveInputUrl(url) {
  imageStore.update( store => {
    store.inputUrl = url
    return store
  })
}

function saveOutputUrl(url) {
  imageStore.update( store => {
    store.outputUrl = url
    return store
  })
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