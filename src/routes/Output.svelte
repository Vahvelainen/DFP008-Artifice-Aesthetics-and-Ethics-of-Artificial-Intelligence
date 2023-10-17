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
    <div class="input"></div>
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
    /* Same as output, could be made to a svelte class */
    position: relative;
    max-width: 640px;
    width: 100%;
    aspect-ratio: 640/512;
    border-radius: 10px;
    border: 2px solid #00DEC6;
    overflow: hidden;
    margin-bottom: 1em;
  }
  div.input{
    aspect-ratio: 640/512;
  }
  .generated{
    width: 100%;
    object-fit: contain;
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