
import { db } from "@src/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"; 

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

  console.log("Generation data saved with ID: ", docRef.id);

  }
