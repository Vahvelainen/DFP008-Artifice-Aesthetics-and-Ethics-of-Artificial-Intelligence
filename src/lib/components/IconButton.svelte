<script>

  export let file = false;
  export let secondary = false;

</script>

{#if file}
  <input type="file" id="imageInput" accept="image/*" on:change >
  <label class={secondary ? 'secondary' : 'primary' } for='imageInput'>
    <slot/>
  </label>
{:else}
  <button class={secondary ? 'secondary' : 'primary' } on:click>
    <slot/>
  </button>
{/if}


<style>
  input {
    display: none;
  }
  .primary {
    background-color: #3D00BB;
    color: white;
  }
  .secondary {
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