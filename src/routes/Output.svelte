<script>
  import imageStore from '@stores/imageStore'

  //Would be cool to add click for input to set it as input for next generation

  //Input
  //https://firebasestorage.googleapis.com/v0/b/collabgen.appspot.com/o/uploadsEFWV4yCSLxxHSvYp.jpeg?alt=media&token=e94b8442-f827-4133-b518-37f867e2f936
  //Output
  //https://cdn2.stablediffusionapi.com/generations/862125a5-3124-4a66-a17d-2a669b522e73-0.png
  
</script>

<div class="output">
  {#if $imageStore.inputUrl} 
    <img class="input" src={$imageStore.inputUrl} alt="Last upload">
  {:else}
    <!-- Placeholder -->
    <div class="input" style="aspect-ratio: 640 / 480 ;"></div>
  {/if}

  {#if $imageStore.outputUrl} 
    <img class="generated" src={$imageStore.outputUrl} alt="Stable diffusion">
  {:else}
    <!-- Placeholder -->
    <div class="generated">
      <p>Generate something</p>
    </div>
  {/if}

</div>

<style>
  .output {
    position: relative;
  }
  .generated{
    width: 640px;
    height: 480px;
    object-fit: contain;
    border-radius: 10px;
    border: 2px solid #00DEC6;
  }
  .input{
    position: absolute;
    left: 1em;
    bottom: 1em;
    width: 8em;
    border-radius: 6px;
    border: 1px solid #00DEC6;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>