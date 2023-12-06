import { writable } from 'svelte/store';

/**
 * In new version, history consist of all the blob data of the generations
 * Result will only be saved once the result is accepted
 * 
 * A separate app should be created to display the creations on a second screen (also should be saved on a different collection)
 */

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

/**
 * Push a generation to end of the history
 * @param {Blob} input 
 * @param {Blob} output 
 * @param {Array[JSON]} selections 
 */
export function addToHistory(input, output, topic, selections){
  historyStore.update( history => {
    history.generations.push({
        input: input,
        output: output,
        topic: topic,
        selections: [...selections],
      })
    console.log('History updated: ', history)
    return history
  })
}