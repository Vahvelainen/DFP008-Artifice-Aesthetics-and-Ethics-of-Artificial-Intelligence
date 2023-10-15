import { writable } from 'svelte/store';

const imageStoreTemplate = {
  inputUrl: null,
  outputUrl: null,
}

const imageStore = writable(imageStoreTemplate);

export const resetimageStore = () => {
  imageStore.update( () => {
    return imageStoreTemplate
  })
}

export default imageStore;