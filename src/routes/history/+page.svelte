

<script>

import { db } from "@src/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"; 
    import { onMount } from "svelte";

let generations = []

async function getHistory() {
  const ref = collection(db, "generations_v2")
  const q = query(ref, orderBy("created", "desc"), limit(50));

  let generations = []

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    generations.push({
      id: doc.id,
      ...doc.data()
    })
  });

  return generations
}

onMount( async () => {
  generations = await getHistory()
  console.log(generations)
}) 

</script>

<section>
  {#each generations as generation}
    <img src="{generation.output}" alt="previous cretion of somethng">
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
  }
  img {
    max-width: 25%;
  }
</style>