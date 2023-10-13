import { writable } from 'svelte/store';

const imageStoreTemplate = {
  inputUrl: '/',
  outputUrl: '/',
}

const imageStore = writable(imageStoreTemplate);

export const resetimageStore = () => {
  imageStore.update( () => {
    return imageStoreTemplate
  })
}

export default imageStore;