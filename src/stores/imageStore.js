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

export function saveInputUrl(url) {
  imageStore.update( store => {
    store.inputUrl = url
    return store
  })
}

export function saveOutputUrl(url) {
  imageStore.update( store => {
    store.outputUrl = url
    return store
  })
}