<script>
  import historyStore, { loadHistoryToStore } from '@stores/historyStore'
  import { saveInputUrl, saveOutputUrl } from '@stores/imageStore'
  import { onMount } from 'svelte';
  import IconButton from "@components/IconButton.svelte"

  /**
   * Suffling between old generations
   * need to figure a way to add future generations to the list
   * Might have to do a store out oh the history for that
   */

  export let inputDescription //will be used to bind so the value can be setted back

  let history = []
  let currentIndex = 0

  onMount( async ()=>{
    await loadHistoryToStore()
    history = $historyStore.generations
    currentIndex = history.length
    console.log('History ready')
  })

  function setImage(index) {
    //Update history from the store
    if ($historyStore.loaded) {
      history = $historyStore.generations
    }

    if ( index >= history.length || index < 0) {
      return
    }
    const generation = history[index]

    saveInputUrl(generation.input)
    saveOutputUrl(generation.output)
    inputDescription = generation.description

    currentIndex = index;
  }
</script>

<div>
  <IconButton secondary on:click={ () => setImage(currentIndex - 1) }>Back</IconButton>
  <IconButton secondary on:click={ () => setImage(currentIndex + 1) }>Forward</IconButton>
  <IconButton secondary on:click={ () => setImage(history.length - 1) }>Latest</IconButton>
</div>

<style>
  div {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>