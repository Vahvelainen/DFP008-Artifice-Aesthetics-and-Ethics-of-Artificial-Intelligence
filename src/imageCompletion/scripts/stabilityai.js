/**
 * 1. Send request the same time as uploading the picture with base64 = canvas.toDataURL("image/jpeg")
 *    - File upload will only update upload url
 * 2. Receive base64 in response, convert to blob and upload file
 * 
 * 
 */

//Move to env / config file
const apiKey = 'sk-tqHNeMMLcKMTBRl9dh2gCHw4neuyZRs0kqyghJvqRdHTL9FI'

export function sendToAPI(promt, negative_promt, image) {
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
    init_image: image,
    //text_prompts: prompts, //set separetely
    cfg_scale: 20,
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
  
  const promise = fetch(`${apiHost}/v1/generation/${engineId}/image-to-image`, {
    method: 'POST',
    headers: headers,
    body: formData,
  })

  return promise
}

