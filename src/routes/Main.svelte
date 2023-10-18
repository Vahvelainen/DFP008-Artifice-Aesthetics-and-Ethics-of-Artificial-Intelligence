<script>
  /**
   * TODO:
   * Error handling
  */

  //import { captureFrame } from "@lib/stablediffusionapi"
  import { captureFrame } from "@lib/stabilityai"

  import Output from "./Output.svelte";
  import Input from './Input.svelte'
  import WideButton from "@components/WideButton.svelte"

  let inputCanvas //Binded to the export from input
</script>

<section class="image-generation">

  <div class="input">
    <Input bind:canvas={inputCanvas} />
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