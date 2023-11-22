<script>
    import { scale } from "svelte/transition";
  import ChoosePromtOption from "./ChoosePromtOption.svelte";
  import PromtBubble from "./PromtBubble.svelte";
  import promtchoises from "./promtchoises";

  // Though of naming this to BubbleMenu if is going to be more general element but lest start from the intented use
  // Name will be from the earlier selections somehow, possibly url param.
  export let name = 'Design Your Household Appliances'

  export let promt

  $: {
    promt = 'Finished rendering of a Household Appliance'
    for( const selection of selections ) {
      if(selection) {
        promt = promt + ', ' + selection.promt
      }
    }
    console.log('Current promt: ', promt)
  }

  let selecting = undefined
  let selections = Array(promtchoises.length).fill(undefined)

  function makeSelection(e) {
    selections[ promtchoises.findIndex( e => e === selecting) ] = e.detail
    selecting = undefined
  }

</script>

<div class="parent">
  {#if selecting}
    <div in:scale>
      <ChoosePromtOption
        name={selecting.name}
        options={selecting.options}
        on:select={ makeSelection }
      />
    </div>
  {:else}
    <div class="relative" in:scale>
      <div class="center">
        <h2>{name}</h2>
      </div>
      {#each promtchoises as choice, i }
        <PromtBubble
          name={choice.name}
          selection = {selections[i]}
          angle = { 30 * i + 45 }
          on:click={ () => selecting = choice }
        />      
      {/each}
    </div>
  {/if}
</div>

<style>
  div.parent {
    display: flex;
    align-items: center;
    background-color: #CDC4E0;
    height: 100vh;
    width: 50vw;
    color: black;
  }
  div.relative {
    position: relative;
    width: 50vw;
    height: 50vw;
  }
  div.center {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20em;
    width: 20em;
    border-radius: 9999px;
    background-color: #B09ED8;
  }

</style>