import { writable } from 'svelte/store';
import { getHistory } from './firestore'

const historyStoreTemplate = {
  generations: [],
  loaded: false,
}

const historyStore = writable(historyStoreTemplate);

export const resetHistoryStore = () => {
  historyStore.update( () => {
    return historyStoreTemplate
  })
}

export default historyStore;

/** Load the history from firestore and store it to the store */
export async function loadHistoryToStore(){
  const generations = await getHistory()
  historyStore.update( s => {
    const loadedHistory = {
        generations: generations,
        loaded: true,
      }
    return loadedHistory
  })
}

/** Push a file to end of the history */
export function addToHistory(id, inputUrl, outpuUrl, description = ''){
  historyStore.update( history => {
    history.generations = [
      {
        id: id,
        input: inputUrl,
        output: outpuUrl,
        description: description,
      },
      ...history.generations,
    ]
    return history
  })
}