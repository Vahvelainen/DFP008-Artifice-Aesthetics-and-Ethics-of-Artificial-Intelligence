<script>

  export let file = false;


</script>

{#if file}
  <input type="file" id="imageInput" accept="image/*" on:change >
  <label for='imageInput'>
    <slot/>
  </label>
{:else}
  <button on:click>
    <slot/>
  </button>
{/if}


<style>
  input {
    display: none;
  }
  button {
    background-color: #3D00BB;
    color: white;
  }
  label {
    background-color: #C483FF;
    color: black;
  }
  button, label {
    font-size: 14px;
    height: 4em;
    width: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: none;
    border-radius: 7px;
    margin-right: 1em;
  }
</style>