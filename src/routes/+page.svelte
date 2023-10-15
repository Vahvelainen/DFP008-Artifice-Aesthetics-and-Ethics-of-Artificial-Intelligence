<svelte:head>
    <title>Image completion prototype</title>
</svelte:head>

<script>
  import { onMount } from "svelte"
  import Image from "./Image.svelte";
  import { captureFrame } from "@lib/imageUpload"
  import Input from '@components/Input.svelte'

  let inputCanvas //Binded to the export from input

  onMount(()=>{
    // Event listener to spacebar
    document.addEventListener("keydown", event => {
      if (event.code === 'Space') {
        captureFrame(inputCanvas)
      }
    });
  })
</script>

<Input bind:canvas={inputCanvas} />
<Image/>