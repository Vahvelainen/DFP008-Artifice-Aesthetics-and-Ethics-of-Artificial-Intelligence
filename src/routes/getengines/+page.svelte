<script>
  //Ugly duckling for seeing engines from stabilityAI

  import { functions } from '@src/firebase'
  import { httpsCallable } from "firebase/functions"
  import { onMount } from 'svelte'

  let engines = []

  const getEnginesCallable = httpsCallable(functions, 'getEngines');

  async function getEngines() {
    const response = await getEnginesCallable();
    const data = response.data
    console.log(data)
    engines = data
    return response.data
  }

  onMount( () => {
    getEngines()
  })

</script>


<h1>StabilityAI available engines:</h1>

<ul>
  {#each engines as engine }
    <li>
      <h2>{engine.name}</h2>
      <p>{engine.description}</p>
      <p>{engine.id}</p>
      <p>{engine.type}</p>
    </li>    
  {/each}
</ul>