<script>
  import Frame from '@lib/Frame.svelte';
  import imageStore from './scripts/imageStore'

  //Would be cool to add click for input to set it as input for next generation

  //Input
  //https://firebasestorage.googleapis.com/v0/b/collabgen.appspot.com/o/uploadsEFWV4yCSLxxHSvYp.jpeg?alt=media&token=e94b8442-f827-4133-b518-37f867e2f936
  //Output
  //https://cdn2.stablediffusionapi.com/generations/862125a5-3124-4a66-a17d-2a669b522e73-0.png
  
</script>

<Frame>
  <Frame small subframe>
    {#if $imageStore.inputUrl} 
      <img src={$imageStore.inputUrl} alt="Last upload">
    {/if}
  </Frame>
  
  {#if $imageStore.outputUrl} 
    <img src={$imageStore.outputUrl} alt="Stable diffusion">
  {:else}
    <!-- Placeholder -->
    <p>Generate something</p>
  {/if}
</Frame>

<style>
  img{
    width: 100%;
    object-fit: contain;
  }
</style>