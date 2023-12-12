
<script>
  export let loading = false;
</script>

{#if !loading}
  <button on:click>
    <slot/>
  </button>
{:else}
  <button>
    <span class="material-icon">refresh</span>
  </button>
{/if}

<style>
  button {
    background-color: #FFDDA9;
    color: black !important;
    font-size: 14px;
    height: 4em;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: none;
    border-radius: 7px;
  }

  span {
    display: inline-block;
    animation: rotateAnimation 2s infinite linear;
    transform-origin: center center;
  }

  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>