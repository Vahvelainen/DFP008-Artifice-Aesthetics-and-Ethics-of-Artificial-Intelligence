<script>
  export let value
  export let name = ''
  export let id = ''
</script>

<textarea name={name} id={id} bind:value={value} rows="6"></textarea>

<style>
  textarea {
    /* This is again very same to frame, could be a style or sub component */
    color: white;
    width: 8em;
    border-radius: 6px;
    border: 1px solid #00DEC6;
    background-color: #000000;
    width: 100%;
    max-width: 100%;
    padding: 1em;
    margin-bottom: 1em;
  }
</style>