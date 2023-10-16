<svelte:head>
    <title>Image completion prototype</title>
</svelte:head>

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
  <div class="images">
    <Input bind:canvas={inputCanvas} />
    <Output/>
  </div>
  <WideButton on:click={ () => captureFrame(inputCanvas) }>Generate Image</WideButton>
</section>

<style>
  .image-generation {
    max-width: 1300px;
    margin: auto;
  }
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 2em;
  }
</style>