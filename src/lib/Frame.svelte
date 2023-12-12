<script>
  export let subframe = false
  export let small = false
  export let unbound = false
</script>

<div class="frame{ subframe ? ' subframe' : '' }{ small ? ' small' : '' }{ unbound ? ' unbound' : '' }">
  <slot></slot>
</div>

<style>
  .frame {
    position: relative;
    
    display: flex;
    justify-content: center;
    align-items: center;

    /* max-width: 640px; */
    background-color: #000000;
    width: 100%;
    aspect-ratio: 640/512;
    border-radius: 10px;
    /* border: 2px solid #00DEC6; */
    overflow: hidden;
    margin-bottom: 1em;
  }
  .subframe{
    position: absolute;
    left: 1em;
    bottom: 1em;
    margin: 0;
  }
  .small{
    width: 8em;
    border-radius: 6px;
    border: 1px solid #00DEC6;
  }
  .unbound{
    border: none;
    border-radius: 0;
    margin: 0;
  }
</style>