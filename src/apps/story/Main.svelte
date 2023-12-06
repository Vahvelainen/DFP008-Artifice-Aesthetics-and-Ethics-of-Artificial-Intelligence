<script>
  import Intro from './Intro.svelte'
  import Build from './Build.svelte'
  import Result from './Result.svelte'

  import loadBuild from './loadBuild'
  import { onMount } from 'svelte'

  let data

  onMount( async () => {
    data = await loadBuild()
  }) 

  // http://localhost:5173/story?id=diRH3ygtWmCHRuE7ICph
</script>

<div class="story">
  <Intro data={data}/>
  <Build data={data}/>
  <Result data={data}/>
</div>

<style>
  .story {
    background-color: #E4E0ED;
    color: #391484;
    width: 100%;
    min-height: 100vh;
    padding: 0 2em;
  }
</style>

