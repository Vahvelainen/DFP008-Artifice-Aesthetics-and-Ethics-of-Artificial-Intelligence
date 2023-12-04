import { writable } from 'svelte/store';

const imageStoreTemplate = {
  outputUrl: null,
  loading: false,
}

const imageStore = writable(imageStoreTemplate);

export const resetimageStore = () => {
  imageStore.update( () => {
    return imageStoreTemplate
  })
}

export default imageStore;

export function setLoading(bool) {
  imageStore.update( store => {
    store.loading = bool
    return store
  })
}

export function saveOutputUrl(url) {
  imageStore.update( store => {
    store.outputUrl = url
    return store
  })
}
