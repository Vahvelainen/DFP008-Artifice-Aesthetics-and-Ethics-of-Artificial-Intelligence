<script>
  import designersImg from './assets/designers.jpg'
  import squiggle from './assets/squiggle.svg'
  import you from './assets/you.jpg'

  export let data
</script>

<section class="intro">
  <div class="designers">
    <img class="designers" src={designersImg} alt="Collection of the most influencial designers">
    <p>So many celebrities in our history who create wonderful things... </p>
  </div>
  <img class="squiggle" src={squiggle} alt="squigly line">
  <div class="you">
    <img class="you" src={you} alt="you">
    <h3>You</h3>
    <p>Today, we have you, make a great prototype{data ? ' of a ' + data.topic : ''}</p>
  </div>
  <h1>Let’s see your parallel universe!</h1>
</section>

<style>
  section.intro {
    padding-top: 6em;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    max-width: 800px;
    margin: auto;
    margin-bottom: 8em;
  }
  div.designers {
    width: 40%
  }
  img.designers {
    width: 100%;
    border-radius: 99999px;
  }
  .squiggle {
    width: 40%;
    padding-bottom: 5em;
  }
  div.you{
    padding-top: 5em;
    width: 20%
  }
  img.you{
    width: 100%;
    border-radius: 99999px;
  }
  p {
    max-width: 300px;
    margin: auto;
  }
  h1 {
    margin-top: 4em;
    width: 100%;
  }
</style>
