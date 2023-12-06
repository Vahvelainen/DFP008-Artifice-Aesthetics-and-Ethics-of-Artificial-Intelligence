<script>
  /**
   * TODO:
   * Error handling
  */
 
  import ImageSide from "./ImageSide.svelte";
  import PromtMenu from "./PromtMenu.svelte";
  import History from "./History.svelte";
 
  import { goto } from '$app/navigation';
  import generateImage, {createPromt} from "./scripts/imageGeneration"
  import {saveGeneration} from "./scripts/firestore"

  let showHistory = false
  let topic = 'Household Appliance'
  let selections = []
  let promt 
  
  $: {
    promt = createPromt(topic, selections)
    console.log(selections)
    handlePromtUpdate(promt)
  }
  
  //Image geneartion
  let canvas //binded to image side for input
  let inputting = true //also binded to imageSide
  let inputBlob
  let outputBlob

  function handlePromtUpdate(promt) {
    console.log('Current promt: ', promt)
    if ( !inputting ) {
      startGenerate()
    }
  } 

  async function saveAndProceed() {
    console.log('asd')
    const id = await saveGeneration(inputBlob, outputBlob, topic, selections)
    goto('/story?id=' + id)
  }

  async function startGenerate() {
    console.log('Start image generation')
    if (inputting) {
      inputBlob = await captureFrame(canvas)
    }
    const imagePromise = generateImage( inputBlob, topic, selections, inputting )
    inputting = false
    outputBlob = await imagePromise
  }

  /** Cancas to blob 
   * @param {HTMLCanvasElement} canvas */
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

<section class="image-generation">
  <!-- These might be should be stylised here for the widths to make them work -->
  <PromtMenu topic={topic} bind:selections />
  <ImageSide
    bind:canvas
    bind:inputting
    on:generate={startGenerate} 
    on:history={ () => showHistory = true }
    on:complete={ saveAndProceed }
  />
  <History 
    bind:show={showHistory}
    bind:inputting
    bind:selections
    bind:inputBlob
    bind:outputBlob
  />
</section>

<style>
  .image-generation {
    display: flex;
    justify-content: space-between;
    background:
      linear-gradient(0deg, rgba(57, 20, 132, 0.5), rgba(57, 20, 132, 0.5)),
      url('background.jpeg');
  }
</style>