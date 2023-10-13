// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHcXf0zPZacC3Z_YduSxih45H_x0auoGI",
  authDomain: "collabgen.firebaseapp.com",
  projectId: "collabgen",
  storageBucket: "collabgen.appspot.com",
  messagingSenderId: "737455051668",
  appId: "1:737455051668:web:639bf7905a1e34a83ff581"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);