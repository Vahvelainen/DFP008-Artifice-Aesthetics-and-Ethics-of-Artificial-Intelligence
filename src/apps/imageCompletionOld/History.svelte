<script>
  import historyStore, { loadHistoryToStore } from './scripts/historyStore'
  import { saveInputUrl, saveOutputUrl, saveID } from './scripts/imageStore'
  import { onMount } from 'svelte'
  import IconButton from "@lib/IconButton.svelte"

  /**
   * Suffling between old generations
   * need to figure a way to add future generations to the list
   * Might have to do a store out oh the history for that
   */

  export let inputDescription //will be used to bind so the value can be setted back

  let history = []
  let count = 0
  let currentIndex = -1

  onMount( async ()=>{
    await loadHistoryToStore()
    history = $historyStore.generations
    count = history.length
    console.log('History ready')
  })

  function setImage(index) {
    //Update history from the store
    if ($historyStore.loaded) {
      history = $historyStore.generations
    }

    //Handle if pictures are added
    if (history.length != count) {
      count = history.length
      if ( index == currentIndex + 1) { //Pressed to see previous
        index = 1 //Show second to lates
      } else {
        index = 0 //Show latest
      }
    }

    if ( index >= count|| index < 0) {
      return
    }
    const generation = history[index]

    saveInputUrl(generation.input)
    saveOutputUrl(generation.output)
    saveID(generation.id)
    inputDescription = generation.description

    currentIndex = index;
  }
</script>

<div>
  <IconButton secondary on:click={ () => setImage(currentIndex + 1) }>fast_rewind</IconButton>
  <IconButton secondary on:click={ () => setImage(currentIndex - 1) }>fast_forward</IconButton>
  <IconButton secondary on:click={ () => setImage(0) }>skip_next</IconButton>
</div>

<style>
  div {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>