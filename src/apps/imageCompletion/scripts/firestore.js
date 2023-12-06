
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
