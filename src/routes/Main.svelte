<script>
  /**
   * TODO:
   * Error handling
  */

  import imageUpload from '@lib/imageUpload'
  import { sendToAPI, saveInputUrl } from "@lib/stabilityai"

  import Output from "./Output.svelte";
  import Input from './Input.svelte'
  import WideButton from "@components/WideButton.svelte"
  import Textarea from "@components/Textarea.svelte";

  let inputCanvas //Binded to the export from input
  let inputDescription = 'Mixer that is fun to use'

  /** @param {HTMLCanvasElement} canvas */
  export function captureFrame(canvas) {
    canvas.toBlob(blob => {
      console.log(blob);
      imageUpload(blob, saveInputUrl)
      sendToAPI(
        //Promt
        'Turn the object in the picture into a sleek product design' +
        inputDescription +
        ', in the style of Stefano Marzano, philips design' +
        ', realism, rendering, futurism, --q2',
        //Negative promt
        'people, clutter, background (drawing) (painting)',
        blob)
    }, 'image/jpeg');
  }

</script>

<section class="image-generation">

  <div class="input">
    <Input bind:canvas={inputCanvas} />
    <Textarea bind:value={inputDescription} />
    <WideButton on:click={ () => captureFrame(inputCanvas) }>Generate Image</WideButton>
  </div>

  <div class="output">
    <Output/>
    <!-- Image history in the future -->
  </div>

</section>

<style>
  .image-generation {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    margin: auto;
  }

  .input, .output {
    max-width: 640px;
    width: 100%;
  }

</style>