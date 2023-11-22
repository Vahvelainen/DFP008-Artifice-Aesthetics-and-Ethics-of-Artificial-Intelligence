<script>
  /**
   * TODO:
   * Error handling
  */

  import generateImage from "./scripts/imageGeneration"

  import ImageSide from "./ImageSide.svelte";
  import PromtMenu from "./PromtMenu.svelte";
  
  let inputCanvas //Binded to the export from input
  let inputDescription = 'Mixer that is fun to use'

  /** @param {HTMLCanvasElement} canvas */
  function captureFrame(canvas) {
    canvas.toBlob(blob => {
      console.log(blob);
      //Upload input to firebase and set it to a store
      generateImage(
        //Promt
        'Turn the object in the picture into a sleek product design of ' +
        inputDescription +
        ', in the style of Stefano Marzano, philips design' +
        ', realism, rendering, futurism, --q2',
        //Negative promt
        'people, clutter, background (drawing) (painting)',
        blob, inputDescription) //Input description is saved separately to database
    }, 'image/jpeg');
  }

</script>

<section class="image-generation">
  <!-- These might be should be stylised here for the widths to make them work -->
  <PromtMenu/>
  <ImageSide/>
</section>

<style>
  .image-generation {
    display: flex;
    justify-content: space-between;
  }
</style>