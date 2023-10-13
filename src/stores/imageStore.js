import { writable } from 'svelte/store';

const imageStoreTemplate = {
  url: '/',
}

const imageStore = writable(imageStoreTemplate);

export const resetimageStore = () => {
  imageStore.update( () => {
    return imageStoreTemplate
  })
}

export default imageStore;