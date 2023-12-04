<script>
  /**
   * TODO:
   * Error handling
  */

  import ImageSide from "./ImageSide.svelte";
  import PromtMenu from "./PromtMenu.svelte";
  
  let promt //bonded to promt menu, passed to image side

</script>

<section class="image-generation">
  <!-- These might be should be stylised here for the widths to make them work -->
  <PromtMenu bind:promt />
  <ImageSide promt={promt}/>
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