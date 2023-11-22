<script>
  import Input from "./Input.svelte"
  import Output from './Output.svelte'
  import WideButton from "@lib/WideButton.svelte"

  import imageStore from './scripts/imageStore' 

  //we use this to toggle between showing result etc

  //Image generation is propably 

  let inputting = true
  let canvas
</script>

<div class="parent">
  {#if inputting}
    <Input bind:canvas/>
    <WideButton on:click={ () => inputting = false } >Check The Outcome</WideButton>
  {:else if $imageStore.loading}
    <div class="loading-spinner"></div>
  {:else}
    <Output/>
    <div class="two-buttons">
      <WideButton on:click={ () => inputting = true } >Retry</WideButton>
      <WideButton>I am happy</WideButton>
    </div>
  {/if}
</div>

<style>
  div.parent {
    width: 50vw;
    padding: 6em 4em;
    text-align: center;
  }
  .two-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }
  .loading-spinner {
    height: 6em;
    width: 6em;
    animation: rotateAnimation 2s infinite linear;

    border-width: 0.5em;
    border-style: solid;
    border-color: white white transparent white;
    border-radius: 50%;
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