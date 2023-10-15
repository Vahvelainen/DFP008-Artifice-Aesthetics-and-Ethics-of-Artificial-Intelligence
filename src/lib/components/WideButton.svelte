
<button class="child" on:click>
  <slot/>
</button>

<style>

  button {
    background-color: #3D00BB;
    color: white;
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
</style>