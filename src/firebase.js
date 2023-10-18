// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqIwk--TPI0pUk2JD1dMAZHkCdEbjeQAs",
  authDomain: "aicocreate.firebaseapp.com",
  projectId: "aicocreate",
  storageBucket: "aicocreate.appspot.com",
  messagingSenderId: "201830829829",
  appId: "1:201830829829:web:efbd3f03d1fc1079b7316c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);