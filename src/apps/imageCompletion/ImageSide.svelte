<script>
  import Input from "./Input.svelte"
  import Frame from '@lib/Frame.svelte'
  import WideButton from "@lib/WideButton.svelte"

  let dispatch = createEventDispatcher()

  import imageStore from './scripts/imageStore' 
  import { createEventDispatcher } from "svelte";

  export let inputting //true wehn inputting new image
  export let canvas

</script>

<div class="parent">
  {#if inputting}
    <Input bind:canvas/>
    <WideButton on:click={ () => dispatch('generate') } >Check The Outcome</WideButton>
  {:else}
    <!-- Image output -->
    <Frame>
      <img src={$imageStore.outputUrl} alt="Stable diffusion">
    </Frame>
    {#if $imageStore.loading}
      <div class="loading-spinner"></div>
    {:else}
      <div class="two-buttons">
        <WideButton on:click={ () => inputting = true } >Retry</WideButton>
        <WideButton>I am happy</WideButton>
      </div>
    {/if}
  {/if}
</div>

<style>
  div.parent {
    width: 50vw;
    padding: 6em 4em;
    text-align: center;
  }
  img{
    width: 100%;
    object-fit: contain;
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