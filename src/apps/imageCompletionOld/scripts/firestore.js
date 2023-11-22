
import { db } from "@src/firebase"
import { collection, addDoc, getDocs, Timestamp, query, orderBy, limit } from "firebase/firestore"; 

export async function saveGeneration(inputUrl, outputUrl, promt, negative_promt, description = '') {

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "generations"), {
    created: Timestamp.fromDate( new Date() ),
    description: description,
    input: inputUrl,
    output: outputUrl,
    promt: promt,
    negative_promt: negative_promt,
    // request: JSON.stringify(request),
    // response: JSON.stringify(response),
  });

  const id = docRef.id
  console.log("Generation data saved with ID: ", id);
  return id
}

export async function getHistory() {
  const ref = collection(db, "generations")
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
