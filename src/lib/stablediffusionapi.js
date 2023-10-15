import imageStore from '@stores/imageStore'
import imageUpload from "@lib/imageUpload"

/**
 * Saves content of canvas element to firebase storage
 * and send following url as reguest for stablediffusionapi.com img2img endpoint
 * Also sets urls from both firebase and API response to imagestore
 * @param {HTMLCanvasElement} canvas 
 */
export function captureFrame(canvas) {
  canvas.toBlob(blob => {
    console.log(blob);
    imageUpload(blob, saveInputUrlAndSendToAPI)
  }, 'image/jpeg');
}

function saveInputUrlAndSendToAPI(url) {
  imageStore.update( store => {
    store.inputUrl = url
    return store
  })
  sendToAPI(
    'Turn into a sleek product design and remove the background',
    'people, clutter, backgroung',
    url)
}

// Send request to the stable diffusion img2img API
// https://stablediffusionapi.com/docs/stable-diffusion-api/img2img
function sendToAPI(promt, negative_promt, imageUrl) {
  fetch('https://stablediffusionapi.com/api/v3/img2img', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
    },
    body: JSON.stringify({
      key: '9L5GH4FwUwQk5LsJiK5eryscXT1wydcp443VU5cy9sawiO5D4Spv12hxn9uL',	//Your API Key used for request authorization
      prompt: promt, //Text prompt with description of the things you want in the image to be generated
      negative_prompt: negative_promt, //Items you don't want in the image
      init_image: imageUrl,	//Link to the Initial Image
      width: 512,	//Max Height: Width: 1024x1024
      height:	512, //Max Height: Width: 1024x1024
      samples: 1,	//Number of images to be returned in response. The maximum value is 4.
      num_inference_steps: '31',	//Number of denoising steps. Available values: 21, 31, 41, 51.
      safety_checker: 'no',	//A checker for NSFW images. If such an image is detected, it will be replaced by a blank image.
      enhance_prompt: 'no',	//Enhance prompts for better results; default: yes, options: yes/no
      guidance_scale: 7.5,	//Scale for classifier-free guidance (minimum: 1; maximum: 20)
      strength: 0.5,	//Prompt strength when using init image. 1.0 corresponds to full destruction of information in the init image.
      seed: null,	//Seed is used to reproduce results, same seed will give you same image in return again. Pass null for a random number.
      webhook: null,	//Set an URL to get a POST API call once the image generation is complete.
      track_id: null,	//This ID is returned in the response to the webhook API call. This will be used to identify the webhook request.
    })
  })
  .then(response => response.text())
  .then(result => {
    result = JSON.parse(result)
    console.log(result)
    const url = result.output[0]
    //Set url
    imageStore.update( store => {
      store.outputUrl = url
      return store
    })
  })
  .catch(error => console.log('error', error));
}