<script>
  export let unbound = false
</script>

<div class="frame{ unbound ? ' unbound' : '' }">
  <slot></slot>
</div>

<style>
  .frame {
    position: relative;
    
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #000000;
    width: 100%;
    aspect-ratio: 640/512;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1em;
  }
  .unbound{
    border: none;
    border-radius: 0;
    margin: 0;
  }
</style>