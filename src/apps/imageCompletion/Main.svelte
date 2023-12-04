<script>
  /**
   * TODO:
   * Error handling
  */
 
  import ImageSide from "./ImageSide.svelte";
  import PromtMenu from "./PromtMenu.svelte";
 
  import generateImage, {createPromt} from "./scripts/imageGeneration"

  let topic = 'Household Appliance'
  let selections = []
  let promt 
  
  $: {
    promt = createPromt(topic, selections)
    handlePromtUpdate(promt)
  }
  
  //Image geneartion
  let canvas //binded to image side for input
  let inputting = true //also binded to imageSide
  let inputBlob

  function handlePromtUpdate(promt) {
    console.log('Current promt: ', promt)
    if ( !inputting ) {
      startGenerate()
    }
  } 

  async function startGenerate() {
    console.log('Start image generation')
    if (inputting) {
      inputBlob = await captureFrame(canvas)
    }
    generateImage( inputBlob, topic, selections, inputting )
    inputting = false
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