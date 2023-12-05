import { onMount } from "svelte"
import { db } from '@src/firebase'
import { doc, getDoc } from "firebase/firestore"

export default async function loadBuild() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const documentID = urlParams.get('id')
  console.log(documentID)
  if (!documentID) { return }
  const docRef = doc(db, "generations_v2", documentID)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    let docData = docSnap.data()
    docData = {
      ...docData,
      selections: JSON.parse(docData.selections)
    }
    console.log("Document data:", docData)
    return docData
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!")
  }
}
