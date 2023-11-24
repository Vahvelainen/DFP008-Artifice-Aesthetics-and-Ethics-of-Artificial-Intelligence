<script>

  import generateImage from "./scripts/imageGeneration"

  import Input from "./Input.svelte"
  import Output from './Output.svelte'
  import WideButton from "@lib/WideButton.svelte"

  import imageStore, {saveOutputUrl} from './scripts/imageStore' 

  let inputting = true //true wehn inputting new image
  let canvas
  let inputBlob

  export let promt

  //Dynamic function that changes when promt changes
  $: {
    handlePromtUpdate(promt)
  }

  function handlePromtUpdate(promt) {
    console.log('Current promt: ', promt)
    if ( !inputting ) {
      startGenerate()
    }
  } 

  async function startGenerate() {
    console.log('Start image generation');

    if (inputting) {
      inputBlob = await captureFrame(canvas)
      //Temporalily set the input image as output
      saveOutputUrl(URL.createObjectURL(inputBlob));
    }    
    inputting = false

    //Upload input to firebase and set it to a store
    console.log('Input blob:', inputBlob)
    generateImage(
      //Promt
      promt,
      //Negative promt
      'people, clutter, background (drawing) (painting)',
      inputBlob, 'NEW IXD TEST') //Input description is saved separately to database
  }

  /** @param {HTMLCanvasElement} canvas */
  function captureFrame(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          // Resolve the promise with the blob so it can be used outside this function
          resolve(blob);
        } else {
          // Reject the promise if no blob was created
          reject(new Error('Could not retrieve blob from canvas'));
        }
      }, 'image/jpeg');
    });
  }

</script>

<div class="parent">
  {#if inputting}
    <Input bind:canvas/>
    <WideButton on:click={startGenerate} >Check The Outcome</WideButton>
  {:else}
    <Output/>
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