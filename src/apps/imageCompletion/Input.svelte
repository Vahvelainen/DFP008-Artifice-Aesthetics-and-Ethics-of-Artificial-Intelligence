<script>
  /**
   * Element for iput with an option of upload or webcam
   * 
  */
  import { onMount } from "svelte"
  import IconButton from "@lib/IconButton.svelte"
  import Frame from "@lib/Frame.svelte";

  export let canvas 
  let onVideo
  let video
  let ctx

  onMount(()=>{
    video = document.createElement("video")
    canvas = document.getElementById('input_canvas')
    ctx = canvas.getContext('2d');

    //Resolution that will be sent to stable diffusion

    //stable-diffusion-xl-1024-v1-0
    //1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536, 768x1344, 832x1216, or 896x1152

    //stable-diffusion-512-v2-1
    //Needs to be multibles of 64
    //512x512
    //512x640
    canvas.width = 640;
    canvas.height = 512;

    drawFrame()
    video.addEventListener('loadeddata', () => {
      // uncomment to mirror the camera
      // Will mirrors every time video is opened whichs is accetable bc its gives choice
      // ctx.translate(canvas.width, 0);
      // ctx.scale(-1, 1);
      video.play();
    });

    startVideo()

  })

  const setImage = (e) => {
    if (onVideo) { stopVideo() }

    const file = e.target.files[0];
    const img = new Image();

    img.onload = () => fitToCanvas(img, img.width, img.height)

    img.src = URL.createObjectURL(file);
  }

  function startVideo() {
    // Access the user's webcam stream
    const constrains = {
      video: {
        facingMode: 'environment',
      }
    }
    navigator.mediaDevices.getUserMedia(constrains)
      .then(function(stream) {
        // Create a video element to display the webcam stream
        video.srcObject = stream;
        video.autoplay = true;
      })
      .catch(function(err) {
        console.error('Error accessing webcam:', err);
      }); 
    onVideo = true
  }

  function stopVideo() {
    onVideo = false
    video.pause()
    video.srcObject.getTracks()[0].stop()
    video.srcObject = null;
  }

  function drawFrame() {
    requestAnimationFrame(drawFrame);
    if ( onVideo ){
      fitToCanvas(video, video.videoWidth, video.videoHeight )
    }
  }

  function fitToCanvas(source, sourceWidth, sourceHeight) {
    //Empty canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //Fit image to canvas
    //Something not right with this function but needs to be solved wehn causing problems
    const aspectRatio = sourceWidth / sourceHeight;
    const canvasAspectRatio = canvas.width / canvas.height;

    // Set the initial position and size of the image
    let posX = 0;
    let posY = 0;
    let width = canvas.width;
    let height = canvas.height;

    // Calculate the new position and size of the image to fit in the canvas
    if (aspectRatio > canvasAspectRatio) {
      height = canvas.height;
      width = height * aspectRatio;
      posX = (canvas.width - width) / 2;
    } else {
      width = canvas.width;
      height = width / aspectRatio;
      posY = (canvas.height - height) / 2;
    }
    ctx.drawImage(source, posX, posY, width, height);
  }

</script>
<Frame>
  {#if import.meta.env.DEV } 
    <!-- Image upload only available in dev -->
    <div class="button-floater">
      <IconButton on:click={ () => startVideo() }>photo_camera</IconButton>
      <IconButton file secondary on:change={ setImage }>file_upload</IconButton>
    </div>
  {/if}
  <canvas id="input_canvas"></canvas>
</Frame>

<style>
  .button-floater{
    position: absolute;
    top: 1em;
    left: 1em;
    display: flex;
  }
  canvas{
    width: 100%;
  }
</style>