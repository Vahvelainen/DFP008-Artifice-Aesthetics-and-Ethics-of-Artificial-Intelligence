<script>
  import imageStore from "./scripts/imageStore"
  import QrCode from "svelte-qrcode" 

  let url = ''
  let loaded = false

  //Dynamic function for link and status
  $: {
    if (window && $imageStore.id) {
      loaded = true
      const baseUrl = window.location.href.split('?')[0] //current url without parameters
      url = baseUrl + 'souvenir?id=' + $imageStore.id
    }
  }
</script>

<div>
  {#if loaded }
    <a href={url}>
      <!-- https://www.npmjs.com/package/svelte-qrcode -->
      <QrCode value={url }/>
    </a>
  {/if}
</div>

<style>
  div {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>
