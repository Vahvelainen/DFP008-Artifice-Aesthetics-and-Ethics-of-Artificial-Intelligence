<script>
  import { onMount } from "svelte"

  onMount( () => {
    const videoElement = document.querySelector("#webCamStream");
    startVideo(videoElement)
  })

  function startVideo(videoElement) {
    // Access the user's webcam stream
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        // Create a video element to display the webcam stream
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
      })
      .catch(function(err) {
        console.error('Error accessing webcam:', err);
      });
  }

</script>

<video id="webCamStream" autoplay></video>

<style>
  video {
  transform: scaleX(-1);
  }
</style>