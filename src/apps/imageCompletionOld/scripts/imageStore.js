import { writable } from 'svelte/store';

const imageStoreTemplate = {
  id: null,
  inputUrl: null,
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

export function saveID(id) {
  imageStore.update( store => {
    store.id = id
    return store
  })
}
