<script>
  import QrCode from "svelte-qrcode" 
  import planets from './assets/planets.svg'

  export let data

  function parseUrl() {
    const baseUrl = window.location.href.split('story')[0] //current url without parameters
    return baseUrl + 'souvenir?id=' + data?.id
  }
</script>

<section>
  {#if data }
    <h2>Scan Me</h2>
  
    <a href={parseUrl()}>
      <!-- https://www.npmjs.com/package/svelte-qrcode -->
      <QrCode value={parseUrl()} size={140} />
    </a>

    <p>Keep this universe with you</p>
    <p>Always be brave to create in your life</p>
    <img src={planets} alt="Logo of planets on a milkyway">
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-bottom: 8em;
  }
  h2 {
    margin-bottom: 2em;
  }
  a {
    border-radius: 10px;
    overflow: hidden;
    line-height: 0;
    margin-bottom: 2em;
  }
  p {
    margin: 0;
  }
  img {
    margin-top: 2em;
  }
</style>
