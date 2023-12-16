

<script>

import { db } from "@src/firebase"
import { collection, getDocs, query, orderBy, limit, onSnapshot } from "firebase/firestore"; 
import { onDestroy, onMount } from "svelte";

let generations = []
let unsubscribe = ()=>{}

async function getHistory() {
  const ref = collection(db, "generations_v2")
  const q = query(ref, orderBy("created", "desc"), limit(50));
  
  let generations_temp = []
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      generations_temp.push({
        id: doc.id,
        ...doc.data()
      })
    });
    console.log(generations_temp)
    generations = generations_temp
});
}

onMount(getHistory) 
onDestroy(unsubscribe)

</script>

<section>
  {#each generations as generation (generation.id) }
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