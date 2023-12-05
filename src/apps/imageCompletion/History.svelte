<script>
  import { saveOutputUrl  } from './scripts/imageStore'
  import historyStore from './scripts/historyStore'
  import {createPromt} from "./scripts/imageGeneration"
  import promtchoises from "./promtchoises";


  import WideButton from "@lib/WideButton.svelte"
  import Frame from '@lib/Frame.svelte'


  export let inputting
  export let selections
  export let inputBlob
  export let outputBlob

  export let show
  let selectedItem

  function selectItem(item) {
    selectedItem = item
    console.log(selectedItem)
  }

  function confirmSelection() {

    inputting = true //prevent generation starting from promt changes

    saveOutputUrl(URL.createObjectURL(selectedItem.output));
    inputBlob = selectedItem.input
    outputBlob = selectedItem.output
    
    selections = matchSelections(selectedItem.selections)

    setTimeout( ()=> inputting = false )
    show = false
  }

  function matchSelections(selections) {
    let new_selections = []
    for (let promtChoise of promtchoises) {
      const slctn = selections.find( slctn => slctn?.id === promtChoise.name )
      new_selections.push( slctn )
    }
    return new_selections
  }
</script>

{#if show}
  <div class="modal">
    <div class="history">
      <h2>History selection</h2>
      <div class="carousel">
        {#each $historyStore.generations as item, id }
          <button class="card { selectedItem == item ? 'selected' : ''}" on:click={ () => selectItem(item) } >
            <Frame unbound >
              <img
                src={URL.createObjectURL(item.output)}
                alt={createPromt(item.topic, item.selections)}>
            </Frame>
          </button>
        {/each}
      </div>
      <WideButton on:click={confirmSelection} >Select</WideButton>
    </div>
  </div>
{/if}

<style>
  .modal {
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: #391484; /* Fallback color */

      display: flex;
      justify-content: center;
      align-items: center;
  }
  .history{
    max-width: 800px;
  }
  .carousel{
    position: relative;
    display: flex;
    overflow: auto;
    margin-bottom: 2em;
  }
  
  .card {
    display: block;
    background: none;
    border: 4px solid transparent;
    border-radius: 10px;
    padding: 0;
  }

  .selected {
    border: 4px solid orange;
  }
</style>