
import { db } from "@src/firebase"
import { collection, addDoc, getDocs, Timestamp, query, orderBy, limit } from "firebase/firestore"; 
import imageUpload from "./imageUpload";

export async function saveGeneration(inputBlob, outputBlob, topic, selections ) {

  const [inputUrl, outputUrl] = await Promise.all([
    imageUpload(inputBlob),
    imageUpload(outputBlob)
  ]);  

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "generations_v2"), {
    created: Timestamp.fromDate( new Date() ),
    input: inputUrl,
    output: outputUrl,
    topic: topic,
    selections: JSON.stringify(selections),
    username: 'user',
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
