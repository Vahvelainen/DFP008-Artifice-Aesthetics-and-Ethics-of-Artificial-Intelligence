<script>
  import { createEventDispatcher } from "svelte";

  export let name
  export let options

  const dispatch = createEventDispatcher()

</script>

<div class="choose">
  <h2>{name}</h2>
  
  {#each options as option}
    <button class="option" on:click={ () => dispatch('select', option) }>
      <img src={option.img} alt="Select {option.name}">
      <h3>{option.name}</h3>
    </button>
  {/each}
</div>

<style>
  .choose {
    width: 100%;
    margin: 6em 4em;
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    width: 100%;
  }
  .option {
    width: 30%;
    text-align: center;
    border: none;
    background: none;
  }
  img{
    width: 100%;
    aspect-ratio: 5/6;
    border-radius: 10px;
    object-fit: cover;
  }
</style>