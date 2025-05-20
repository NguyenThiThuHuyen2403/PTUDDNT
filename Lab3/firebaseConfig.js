// lab3/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZyZeefxRKzXxfYg5pJqZyE7lQxOjVgpw",
  authDomain: "todosapp-6119b.firebaseapp.com",
  projectId: "todosapp-6119b",
  storageBucket: "todosapp-6119b.appspot.com",  
  messagingSenderId: "245558360058",
  appId: "1:245558360058:web:5e49ac580943b4734e5643",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
