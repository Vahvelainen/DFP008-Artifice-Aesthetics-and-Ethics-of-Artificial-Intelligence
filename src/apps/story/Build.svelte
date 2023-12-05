
<script>
  export let data
</script>

{#if data}
  <section class="build">
    <h2>Your design concept</h2>
    <div class="selections">
      {#each data.selections as selection, id}
        {#if selection }
          <div class="selection">
            <div class="choice">
              <p>{selection.name}</p>
              <p>{selection.id}</p>
            </div>
            <img src={selection.img} alt={selection.id} class="selection">
          </div>
        {/if}
      {/each}
    </div>
    <img class="input" src={data?.input} alt="Your building">
    <div class="description">
      <p>Being as creative as you are, you built a sophisticated model, with minimalism and plastic material as your theme.</p>
    </div>
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8em;
  }
  h2 {
    width: 100%;
    text-align: left;
  }
  div.selections {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  div.selection {
    display: flex;
  }
  div.choice {
    text-align: right;
    margin-right: 1em;
  }
  img.selection {
    width: 6em;
    aspect-ratio: 1/1;
    border-radius: 9999px;
  }
  img.input{
    width: 40%;
    border-radius: 10px;
  }
  div.description {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1em;
    text-align: center;
  }
</style>