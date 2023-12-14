<script>
  //To be used with promt meny to show the bubbles
  export let name  //ie. Style
  export let selection // with properties of name and img url (and promts but not used here)
  export let angle //This is goign to be a fun one

  //How far away should the bubble be
  const radiusPercentage = .70
  
  //Calculate positions of the bubble
  const centerX = 50; // Center X coordinate of the clock face as percentage
  const centerY = 50; // Center Y coordinate of the clock face as percentage
  const radius = radiusPercentage * 50; // Radius of the arm as percentage of clock face size
  
  const radian = angle * (Math.PI / 180); // Convert angle to radian
  const top = centerY - (Math.sin(radian) * radius);
  const left = centerX + (Math.cos(radian) * radius);
  
  $: backGroundImage = selection ? selection.img : '' 
  $: dynamicStylStr = `top:${top}%;left:${left}%;background-image:url('${backGroundImage}')`

</script>

<button class="bubble" on:click style={dynamicStylStr}>
  <div class="overlay"></div>
  <h3>{name}</h3>
  {#if selection}
    <span>{selection.name}</span>
  {/if}
</button>

<style>
  .bubble {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 10em;
    width: 10em;
    border-radius: 9999px;
    border: none;
    background-color: white;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
  }

  div.overlay {
    position: absolute;
    background-color: white;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    z-index: -50;
  }
</style>