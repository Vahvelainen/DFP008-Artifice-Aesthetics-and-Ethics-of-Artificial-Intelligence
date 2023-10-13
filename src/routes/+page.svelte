<svelte:head>
    <title>Image completion prototype</title>
</svelte:head>

<script>
  import { onMount } from "svelte"
  import Video from "./Video.svelte"
  import Image from "./Image.svelte";
  import { captureFrame } from "@lib/imageUpload"


  onMount(()=>{
    // Event listener to spacebar
    document.addEventListener("keydown", event => {
      if (event.code === 'Space') {
        // Video module adds video elemet with id webCamStream
        const videoElement = document.querySelector("#webCamStream")
        captureFrame(videoElement)
      }
    });
  })
</script>

<Video/>
<Image/>