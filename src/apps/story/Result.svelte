

<script>
  export let data
</script>


{#if data}
  <section class="result">
    <h2>Your design concept</h2>
    <div class="story">
      <p>In the parallel universe, at the same moment, another you as a designer, design a product like this.</p>
      <p>This product has received rave reviews and far exceeds the average products on the market today. You have become one of the most famous designers in the world.</p>
    </div>
    <img class="output" src={data?.output} alt="Your building">
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 6em;
  }
  h2 {
    width: 100%;
    text-align: left;
  }
  div.story {
    width: 60%;
    padding: 2em;
  }
  img.output {
    width: 40%;
    border-radius: 10px;
  }
  p {
    max-width: 300px;
  }
</style>