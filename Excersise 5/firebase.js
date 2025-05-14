import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZyZeefxRKzXxfYg5pJqZyE7lQxOjVgpw",
  authDomain: "todosapp-6119b.firebaseapp.com",
  projectId: "todosapp-6119b",
  storageBucket: "todosapp-6119b.appspot.com",  // ❗ sửa đúng domain storageBucket (bạn bị sai ở đây)
  messagingSenderId: "245558360058",
  appId: "1:245558360058:web:5e49ac580943b4734e5643",
  measurementId: "G-4ZDV5N07H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Optional: Initialize Analytics (chỉ dùng cho web)
const analytics = getAnalytics(app);

export { db };
