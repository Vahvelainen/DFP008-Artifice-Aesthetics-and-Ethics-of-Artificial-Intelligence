<script>
  import { onMount } from "svelte"
  import { db } from '@src/firebase'
  import { doc, getDoc } from "firebase/firestore"
  import Frame from '@lib/Frame.svelte'
  
  let loaded = false
  let creationImageUrl = ""
  let description = ""
  let selections = []

  onMount( () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const documentID = urlParams.get('id')
    console.log(documentID)
    if (documentID) {
      setImage(documentID)
    }
  })

  async function setImage(documentID) {
    const docRef = doc(db, "generations_v2", documentID)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const docData = docSnap.data()
      console.log("Document data:", docData)
      creationImageUrl = docData.output
      description = docData.topic
      selections = JSON.parse(docData.selections)
      console.log(selections)
      loaded = true
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }
</script>

<section>
  <h1>
    Remember what you created?
  </h1>
  
  <div>
    {#if loaded}
      <Frame>
        <img src={creationImageUrl} alt={description}>
      </Frame>
      
      <h2>{description}</h2>
      {#each selections as selection}
        {#if selection}
          <span>{ selection.id + ': ' + selection.name }</span>
        {/if}
      {/each}
    {/if}
  </div>
</section>

<style>
  section {
    width: 100%;
    height: 100vh;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E4E0ED;
    color: #391484;
  }
  div {
    max-width: 400px;
  }
  img {
    width: 100%;
  }
  span {
    margin-right: 1em;
  }
</style>