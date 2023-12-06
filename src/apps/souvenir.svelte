<script>
  import { onMount } from "svelte"
  import { db } from '@src/firebase'
  import { doc, getDoc } from "firebase/firestore"
  import Frame from '@lib/Frame.svelte'
  
  let creationImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg'
  let description = 'This is a placeholder'

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
  
  <Frame>
    <img src={creationImageUrl} alt={description}>
  </Frame>
  
  <h2>{description}</h2>
</section>

<style>
  section {
    max-width: 600px;
    margin: auto;
  }
  img {
    width: 100%;
  }
</style>