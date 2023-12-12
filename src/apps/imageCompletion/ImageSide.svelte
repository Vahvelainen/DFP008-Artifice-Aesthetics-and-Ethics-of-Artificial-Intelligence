<script>
  import Input from "./Input.svelte"
  import Frame from '@lib/Frame.svelte'
  import WideButton from "@lib/WideButton.svelte"
  import historyStore from './scripts/historyStore'

  let dispatch = createEventDispatcher()

  import imageStore from './scripts/imageStore' 
  import { createEventDispatcher } from "svelte";

  export let inputting //true wehn inputting new image
  export let canvas

  let saving = false

  function handleCompleteClick() {
    dispatch('complete')
    saving = true
  }

</script>

<div class="parent">
  {#if inputting}
    <Input bind:canvas/>
    <WideButton on:click={ () => dispatch('generate') } >Ready to see works in parallel universe!</WideButton>
    <p>Remember to keep your hands away from the camera vision</p>
  {:else}
    <!-- History button -->
    {#if $historyStore.generations.length > 1 }
      <div class="historyBtnFloater">
        <button class="historyBtn" on:click={ () => dispatch('history') } >
          <h3>History</h3>
        </button>
      </div>
    {/if}
    <!-- Image output -->
    <Frame>
      <img src={$imageStore.outputUrl} alt="Stable diffusion">
    </Frame>
    {#if $imageStore.loading}
      <div class="loading-spinner"></div>
    {:else}
      <div class="two-buttons">
        <WideButton on:click={ () => inputting = true } >Retry</WideButton>
        <WideButton on:click={ handleCompleteClick } loading={saving} >I am happy</WideButton>
      </div>
    {/if}
  {/if}
</div>

<style>
  div.parent {
    width: 50vw;
    padding: 6em 4em;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  img{
    width: 100%;
    object-fit: contain;
  }
  .historyBtnFloater{
    display: flex;
    width: 100%;
  }
  .historyBtn{
    z-index: 1;
    position: fixed;
    transform: translate(-50%, -50%);
    height: 7em;
    width: 7em;
    border-radius: 50%;
    border: 4px solid #391484;
    background-color: orange;
  }
  .two-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }
  .loading-spinner {
    height: 4em;
    width: 4em;
    animation: rotateAnimation 2s infinite linear;

    border-width: 0.35em;
    border-style: solid;
    border-color: white white transparent white;
    border-radius: 50%;

    margin: auto;
  }
  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>